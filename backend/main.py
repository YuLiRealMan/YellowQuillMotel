from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from data_service import DataService
import sqlalchemy as sq  # Add this line
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to match your frontend URL/port (e.g., Vite default)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# # Stubbed room search endpoint
# @app.post("/search")
# async def search_rooms(request: RoomSearchRequest):
#     # Dummy logic to simulate room availability
#     dummy_rooms = [
#         f"Room 101 - Standard" if request.bedOption == "1 Bed" and request.petFriendly == "No" and request.smokingFriendly == "No" else None,
#         f"Room 102 - Deluxe" if request.bedOption == "2 Beds" and request.petFriendly == "Yes" and request.smokingFriendly == "Yes" else None
#     ]

#     # Filter out None values and return
#     available_rooms = [room for room in dummy_rooms if room is not None]
#     if not available_rooms:
#         return JSONResponse(content={"rooms": ["No rooms available"]})

#     return JSONResponse(content={"rooms": available_rooms})
# Updated request model with check-in and check-out dates
class RoomSearchRequest(BaseModel):
    checkInDate: str  # e.g., "2025-03-15"
    checkOutDate: str  # e.g., "2025-03-17"
    bedOption: str    # e.g., "1 Bed" or "2 Beds"
    petFriendly: str  # e.g., "Yes" or "No"
    smokingFriendly: str  # e.g., "Yes" or "No"
@app.post("/search")
async def search_rooms(request: RoomSearchRequest):
    # Initialize database connection
    db = DataService()
    
    try:
        # Construct SQL query to find available rooms
        # Modified pet-friendly logic: 
        # - If petFriendly="Yes", only show is_pet_friendly=TRUE
        # - If petFriendly="No", show all rooms (TRUE or FALSE)
        query = sq.text("""
            SELECT r.room_number, r.room_type
            FROM room r
            WHERE 
                r.bed_count = :bed_count
                AND (r.is_pet_friendly = :is_pet_friendly OR :is_pet_friendly = FALSE)  -- Key logic here
                AND r.is_smoking_friendly = :is_smoking_friendly
                AND r.is_available = TRUE
                AND r.room_id NOT IN (
                    SELECT b.room_id
                    FROM booking b
                    WHERE
                        b.check_in_date < :check_out_date
                        AND b.check_out_date > :check_in_date
                )
        """)
        
        # Convert request values to match database expected format
        params = {
            "bed_count": int(request.bedOption.split()[0]),  # Extracts number (1 or 2)
            "is_pet_friendly": True if request.petFriendly == "Yes" else False,
            "is_smoking_friendly": True if request.smokingFriendly == "Yes" else False,
            "check_in_date": request.checkInDate,  # Passed as string (e.g., "2025-03-15")
            "check_out_date": request.checkOutDate  # Passed as string (e.g., "2025-03-17")
        }
        
        # Execute query
        result = db.execute(query.bindparams(**params))
        
        # Fetch and format available rooms
        available_rooms = [
            f"Room {row['room_number']} - {row['room_type']}"
            for row in result.mappings()
        ]
        
        # Clean up database connection
        db.cleanup()
        
        # Return response
        if not available_rooms:
            return JSONResponse(content={"rooms": ["No rooms available"]})
        
        return JSONResponse(content={"rooms": available_rooms})
        
    except Exception as e:
        # Ensure cleanup even if there's an error
        db.cleanup()
        return JSONResponse(
            status_code=500,
            content={"error": f"Database error: {str(e)}"}
        )
        
# Root endpoint (optional)
@app.get("/")
def root():
    return {"Hello": "World"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)