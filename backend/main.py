from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI()

@app.get("/{path:path}", response_class=HTMLResponse)
# async def catch_all(request: Request, path: str):
#     return HTMLResponse(content=html_content)
async def catch_all(request: Request, path: str):
    with open("../frontend/search_room/search_room.html", "r", encoding="utf-8") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)