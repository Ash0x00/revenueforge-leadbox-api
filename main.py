from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

# Allow Squarespace origins (add your live domain later)
ALLOWED_ORIGINS = [
    "https://bassoon-oval-yhmp.squarespace.com",
    "https://revenue-forge.com",
    "https://www.revenue-forge.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Serve static JS to Squarespace
app.mount("/static", StaticFiles(directory="static"), name="static")

class IcpReq(BaseModel):
    prompt: str

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/icp")
def icp(req: IcpReq):
    # Dummy ICP for now (we replace later with real LLM -> ICP)
    return {
        "prompt": req.prompt,
        "icp": {
            "titles": ["CEO", "Managing Director"],
            "seniority": ["c_suite"],
            "geo": {"include": ["Egypt"]},
            "company_size": {"min": 11, "max": 200},
            "keywords": ["real estate", "investment"]
        }
    }
