from uuid import uuid4
import typing
import asyncio

import strawberry

@strawberry.type
class User:
    uuid: strawberry.Private[str]
    name: str

@strawberry.type
class Message:
    sender: User
    text: str

@strawberry.type
class Room:
    updated: strawberry.Private[typing.Optional[asyncio.Event]] = None
    name: str = "Example Chat"
    users: typing.List[User]
    messages: typing.List[Message]

    def get_user_by_uuid(self, uuid):
        return next(user for user in self.users if user.uuid == uuid)

    def add_user(self, name):
        uuid = str(uuid4())
        room.users.append(User(name=name, uuid=uuid))
        return uuid

    def add_message(self, uuid, text):
        self.messages.append(Message(
            sender=self.get_user_by_uuid(uuid),
            text=text
        ))
        self.updated.set()
        self.updated.clear()
        return self

    async def wait_for_update(self):
        if self.updated is None:
            self.updated = asyncio.Event()
        await self.updated.wait()

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
        while True:
            yield await Query.get_room()
            await room.wait_for_update()

@strawberry.type
class Mutation:
    @strawberry.field
    async def join(name: str) -> str:
        return room.add_user(name)

    @strawberry.field
    async def send_message(uuid: str, text: str) -> Room:
        return room.add_message(uuid, text)
