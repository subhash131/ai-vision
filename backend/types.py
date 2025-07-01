from typing import Literal, TypedDict, Dict, List
from google.genai.types import PartDict, Content, ContentDict

# Role can be 'model' or 'user'
Role = Literal["model", "user"]


# Message structure
class Message(TypedDict):
    role: Role
    parts: List[PartDict]


# All chats stored by chatId
Chats = Dict[str, list[Content | ContentDict]]
