from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    front_url: str = "FRONT_URL"
    db_connection: str = "DB_CONNECTION"
    db_host: str = "DB_HOST"
    db_port: str = "DB_PORT"
    db_database: str = "DB_DATABASE"
    db_username: str = "DB_USERNAME"
    db_password: str = "DB_PASSWORD"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    def get_db_url(self):
        return (
            f"{self.db_connection}://{self.db_username}:{self.db_password}"
            f"@{self.db_host}:{self.db_port}/{self.db_database}"
        )


@lru_cache()
def get_settings():
    return Settings()
