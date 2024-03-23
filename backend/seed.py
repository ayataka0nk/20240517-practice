from app.clients import Client
from app.database import get_db, Session


def seed_clients(db: Session):
    for i in range(1, 6):
        client = Client(name=f"Client {i}")
        db.add(client)
    db.commit()


def truncate_clients(db: Session):
    db.query(Client).delete()
    db.commit()


if __name__ == "__main__":
    db_gen = get_db()
    db = next(db_gen)
    truncate_clients(db)
    seed_clients(db)
