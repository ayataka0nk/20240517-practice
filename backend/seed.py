from app.clients import Client
from app.database import get_db, Session
from app.auths import User


def seed(db: Session):
    user = User(email="user@example.com", name="user", password="password")
    db.add(user)
    for i in range(1, 6):
        client = Client(name=f"Client {i}")
        user.clients.append(client)


def truncate_clients(db: Session):
    db.query(Client).delete()
    db.query(User).delete()


if __name__ == "__main__":
    db_gen = get_db()
    db = next(db_gen)
    truncate_clients(db)
    seed(db)
    db.commit()
