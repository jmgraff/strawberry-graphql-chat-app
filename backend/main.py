import os
import uvicorn
import strawberry
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from gql import Query, Mutation

app = FastAPI()

app.add_middleware(
            CORSMiddleware,
            allow_origins=[f"http://{os.getenv('HOSTNAME')}:3000"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"]
        )

schema = strawberry.Schema(query=Query, mutation=Mutation)
app.include_router(GraphQLRouter(schema), prefix="/graphql")

if __name__ == "__main__":
    prod = os.getenv("PROD") == "1"
    uvicorn.run("main:app", host="0.0.0.0", reload=not prod)
