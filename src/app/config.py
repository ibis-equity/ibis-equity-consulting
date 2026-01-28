from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass(frozen=True)
class AppConfig:
    use_aws_secrets: bool
    aws_region: str
    aws_secret_name: str
    db_user: str
    db_password: str
    db_dsn: str


def load_config() -> AppConfig:
    load_dotenv()

    return AppConfig(
        use_aws_secrets=os.getenv("USE_AWS_SECRETS", "false").lower() == "true",
        aws_region=os.getenv("AWS_REGION", "us-east-1"),
        aws_secret_name=os.getenv("AWS_SECRET_NAME", ""),
        db_user=os.getenv("DB_USER", ""),
        db_password=os.getenv("DB_PASSWORD", ""),
        db_dsn=os.getenv("DB_DSN", ""),
    )
