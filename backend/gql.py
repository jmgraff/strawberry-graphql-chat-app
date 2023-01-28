import uuid
import typing
import asyncio
from datetime import datetime

import strawberry

@strawberry.type
class User:
    uuid: strawberry.Private[str]
    name: str


@strawberry.type
class Message:
    time: datetime
    sender: User
    text: str

@strawberry.type
class Room:
    changed: strawberry.Private[typing.Optional[asyncio.Event]] = None
    name: str = "Example Chat"
    users: typing.List[User]
    messages: typing.List[Message]

    def get_user_by_uuid(self, uuid):
        print(f"Searching for user {uuid}")
        print(f"Users: {self.users}")
        return next(user for user in self.users if user.uuid == uuid)

room = Room(users=[], messages=[])

@strawberry.type
class Query:
    @strawberry.field
    async def get_room() -> Room:
        return room

@strawberry.type
class Subscription:
    @strawberry.subscription
    async def room() -> typing.AsyncGenerator[Room, None]:
        if room.changed is None:
            room.changed = asyncio.Event()
        while True:
            yield await Query.get_room()
            await room.changed.wait()

@strawberry.type
class Mutation:
    @strawberry.field
    async def join(name: str) -> str:
        _uuid = str(uuid.uuid4())
        room.users.append(User(name=name, uuid=_uuid))
        return _uuid

    @strawberry.field
    async def send_message(uuid: str, text: str) -> Room:
        room.messages.append(Message(
            time=datetime.now(),
            sender=room.get_user_by_uuid(uuid),
            text=text
        ))
        room.changed.set()
        room.changed.clear()
        return room
