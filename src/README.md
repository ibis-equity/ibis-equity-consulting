# AWS + Oracle + Python Example Application (Senior-Level Pattern)

This project demonstrates a production-style Python service that reads database credentials from AWS Secrets Manager (or env for local/dev) and connects to Oracle using `python-oracledb` (thin mode). The domain is a **billing transactions OLTP** example with Docker-based integration tests running against a real Oracle container.

## Architecture highlights
- **Config-first**: All runtime configuration is centralized in `app/config.py`.
- **Secrets provider**: `app/aws_secrets.py` supports AWS Secrets Manager with a safe env fallback.
- **Repository pattern**: `app/repository/customer_repo.py` isolates SQL from domain logic (billing transactions).
- **Service layer**: `app/service/customer_service.py` holds business rules.
- **Integration tests in Docker**: `docker-compose.yml` runs Oracle and `pytest` in a container.
- **Connection pooling**: Oracle connections are managed via a pool for OLTP-style workloads.

## Quick start (Docker tests)
1. From this folder, run docker compose to build and execute tests:
   - `docker compose -f docker/docker-compose.yml up --build --exit-code-from test`

2. To clean up:
   - `docker compose -f docker/docker-compose.yml down -v`

## Local run (optional)
Create a `.env` from the example and update values as needed.

## Key files
- [docker/docker-compose.yml](docker/docker-compose.yml)
- [docker/Dockerfile](docker/Dockerfile)
- [app/config.py](app/config.py)
- [app/aws_secrets.py](app/aws_secrets.py)
- [app/db/oracle.py](app/db/oracle.py)
- [tests/test_customer_service.py](tests/test_customer_service.py)
