from __future__ import annotations

import pytest

from app.aws_secrets import EnvOrAwsSecretsProvider
from app.config import load_config
from app.db.oracle import OraclePoolConfig, create_pool_with_retry


@pytest.fixture(scope="session")
def oracle_pool():
    config = load_config()
    secrets = EnvOrAwsSecretsProvider(
        use_aws=config.use_aws_secrets,
        region=config.aws_region,
        secret_name=config.aws_secret_name,
        env_user=config.db_user,
        env_password=config.db_password,
        env_dsn=config.db_dsn,
    ).get_db_secret()

    pool = create_pool_with_retry(
        OraclePoolConfig(
            user=secrets.username,
            password=secrets.password,
            dsn=secrets.dsn,
            min_size=1,
            max_size=4,
            increment=1,
        ),
        attempts=60,
        delay_seconds=2.0,
    )
    yield pool
    pool.close()


@pytest.fixture()
def oracle_connection(oracle_pool):
    with oracle_pool.acquire() as connection:
        yield connection
