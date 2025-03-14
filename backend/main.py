from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to match your frontend URL/port (e.g., Vite default)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request validation
class RoomSearchRequest(BaseModel):
    checkInDate: str
    checkOutDate: str
    bedOption: str
    petFriendly: str
    smokingFriendly: str

# Stubbed room search endpoint
@app.post("/search")
async def search_rooms(request: RoomSearchRequest):
    # Dummy logic to simulate room availability
    dummy_rooms = [
        f"Room 101 - Standard" if request.bedOption == "1 Bed" and request.petFriendly == "No" and request.smokingFriendly == "No" else None,
        f"Room 102 - Deluxe" if request.bedOption == "2 Beds" and request.petFriendly == "Yes" and request.smokingFriendly == "Yes" else None
    ]

    # Filter out None values and return
    available_rooms = [room for room in dummy_rooms if room is not None]
    if not available_rooms:
        return JSONResponse(content={"rooms": ["No rooms available"]})

    return JSONResponse(content={"rooms": available_rooms})

# Root endpoint (optional)
@app.get("/")
def root():
    return {"Hello": "World"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)