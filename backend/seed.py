from app.clients import Client
from app.database import get_db, Session
from app.auths import User, RefreshToken
from app.projects import Project, WorkEntry
from sqlalchemy import delete


def seed(db: Session):
    user = User(email="user@example.com", name="user", password="password")
    db.add(user)
    for i in range(1, 6):
        client = Client(name=f"Client {i}")
        user.clients.append(client)

    project = Project(name="Project 1", description="Description 1", owner=user)
    db.add(project)

    db.add(
        WorkEntry(
            project=project,
            user=user,
            start_time="2024-01-01 00:00:00",
            end_time="2024-01-01 01:00:00",
            description="Description 1",
        )
    )
    db.add(
        WorkEntry(
            project=project,
            user=user,
            start_time="2024-01-01 01:00:00",
            end_time="2024-01-01 02:00:00",
            description="Description 2",
        )
    )


def truncate_clients(db: Session):
    db.execute(delete(RefreshToken))
    db.execute(delete(WorkEntry))
    db.execute(delete(Project))
    db.execute(delete(Client))
    db.execute(delete(User))


if __name__ == "__main__":
    db_gen = get_db()
    db = next(db_gen)
    truncate_clients(db)
    seed(db)
    db.commit()
