import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.user import user_route
from routes.transactional import transactional_route
from routes.model import model_route

app = FastAPI()
app.include_router(user_route, prefix='/user')
app.include_router(transactional_route, prefix='/transactional')
app.include_router(model_route, prefix='/model')
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"status": "OK"}


if __name__ == "__main__":
    uvicorn.run('main:app', host="0.0.0.0", port=8080, reload=True)
