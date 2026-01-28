from __future__ import annotations

from app.aws_secrets import EnvOrAwsSecretsProvider
from app.config import load_config
from app.db.oracle import OraclePoolConfig, create_pool_with_retry
from app.repository.customer_repo import BillingTransactionRepository
from app.service.customer_service import BillingService


def main() -> None:
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
        )
    )

    try:
        with pool.acquire() as connection:
            repository = BillingTransactionRepository(connection)
            service = BillingService(repository)

            summary = service.get_transaction_summary(9000001)
            print(summary)
    finally:
        pool.close()


if __name__ == "__main__":
    main()
