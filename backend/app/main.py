from fastapi import FastAPI, Request
from config import get_settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from .errors import ValidationException
from fastapi.encoders import jsonable_encoder
from . import auths, profiles, clients, projects

app = FastAPI()

config = get_settings()
origins = [
    config.front_url,
]
print("cors_allow_origins", origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = {}
    for err in exc.errors():
        keys = err["loc"]
        if keys[0] == "body":
            keys = keys[1:]
        message = err["msg"]
        error_key = ".".join(str(key) for key in keys)
        if error_key not in errors:
            errors[error_key] = []
        errors[error_key].append(message)
    response = ValidationException(content=errors)

    return JSONResponse(
        status_code=response.status_code,
        content=jsonable_encoder(response.content),
    )


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(auths.router)
app.include_router(profiles.router)
app.include_router(clients.router)
app.include_router(projects.router)
