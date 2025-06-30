from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from query_parser import extract_visa_info
import uvicorn

app = FastAPI()

class QueryInput(BaseModel):
    query: str

@app.post("/parse-query")
def parse_query(data: QueryInput):
    try:
        result = extract_visa_info(data.query)
        return {"parsed_data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run locally: python main.py
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
