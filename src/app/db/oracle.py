from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Iterable

import oracledb


@dataclass(frozen=True)
class OracleConfig:
    user: str
    password: str
    dsn: str


@dataclass(frozen=True)
class OraclePoolConfig:
    user: str
    password: str
    dsn: str
    min_size: int = 1
    max_size: int = 5
    increment: int = 1


def connect_with_retry(config: OracleConfig, *, attempts: int = 30, delay_seconds: float = 1.5) -> oracledb.Connection:
    last_error: Exception | None = None
    for _ in range(attempts):
        try:
            return oracledb.connect(user=config.user, password=config.password, dsn=config.dsn, encoding="UTF-8")
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(delay_seconds)
    raise RuntimeError("Unable to connect to Oracle after retries") from last_error


def create_pool_with_retry(config: OraclePoolConfig, *, attempts: int = 30, delay_seconds: float = 1.5) -> oracledb.ConnectionPool:
    last_error: Exception | None = None
    for _ in range(attempts):
        try:
            return oracledb.create_pool(
                user=config.user,
                password=config.password,
                dsn=config.dsn,
                min=config.min_size,
                max=config.max_size,
                increment=config.increment,
                encoding="UTF-8",
            )
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(delay_seconds)
    raise RuntimeError("Unable to create Oracle pool after retries") from last_error


def execute_many(connection: oracledb.Connection, sql: str, rows: Iterable[tuple]) -> None:
    with connection.cursor() as cursor:
        cursor.executemany(sql, list(rows))
        connection.commit()
