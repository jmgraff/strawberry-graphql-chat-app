import strawberry

@strawberry.type
class Message:
    text: str

message = Message(text="Hello World")

@strawberry.type
class Query:
    @strawberry.field
    async def message() -> Message:
        return message

@strawberry.type
class Mutation:
    @strawberry.field
    async def set_message(text: str) -> Message:
        message.text = text
        return message
