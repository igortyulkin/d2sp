from models.enum.user_role import UserRole


class AuthUser:
    id: int
    email: str
    role: UserRole

    def __init__(self, id: int, email: str, role: str) -> None:
        self.id = id
        self.email = email
        self.role = role
