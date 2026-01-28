# Project Guide: AWS + Oracle + Python OLTP Billing Example

This document describes every file, component, module, and function in the project, plus how to run unit tests.

## Workspace layout
- [README.md](../README.md)
- [requirements.txt](../requirements.txt)
- [requirements-dev.txt](../requirements-dev.txt)
- [pytest.ini](../pytest.ini)
- [app/__init__.py](../app/__init__.py)
- [app/config.py](../app/config.py)
- [app/aws_secrets.py](../app/aws_secrets.py)
- [app/main.py](../app/main.py)
- [app/db/oracle.py](../app/db/oracle.py)
- [app/repository/__init__.py](../app/repository/__init__.py)
- [app/repository/customer_repo.py](../app/repository/customer_repo.py)
- [app/service/__init__.py](../app/service/__init__.py)
- [app/service/customer_service.py](../app/service/customer_service.py)
- [db/init/001_create_schema.sql](../db/init/001_create_schema.sql)
- [docker/Dockerfile](../docker/Dockerfile)
- [docker/docker-compose.yml](../docker/docker-compose.yml)
- [tests/conftest.py](../tests/conftest.py)
- [tests/test_customer_service.py](../tests/test_customer_service.py)
- [tests/test_billing_service_unit.py](../tests/test_billing_service_unit.py)
- [k8s/configmap.yaml](../k8s/configmap.yaml)
- [k8s/secret.yaml](../k8s/secret.yaml)
- [k8s/job.yaml](../k8s/job.yaml)
- [.github/workflows/ci.yml](../../.github/workflows/ci.yml)
- [.vscode/settings.json](../../.vscode/settings.json)
- [.env.example](../.env.example)

## Components and modules

### Configuration
- [app/config.py](../app/config.py)
  - `AppConfig`: Immutable configuration model describing runtime settings used throughout the app.
  - `load_config()`: Loads environment variables (including .env) and returns an `AppConfig` instance.

### AWS Secrets provider
- [app/aws_secrets.py](../app/aws_secrets.py)
  - `DbSecret`: Immutable model for database credentials and DSN.
  - `SecretsProvider`: Interface-like base class for secret retrieval.
  - `EnvOrAwsSecretsProvider`: Production-friendly provider that returns env credentials when `use_aws` is false and loads from AWS Secrets Manager when true.
  - `EnvOrAwsSecretsProvider.get_db_secret()`: Retrieves `DbSecret` from environment or AWS.

### Oracle connectivity
- [app/db/oracle.py](../app/db/oracle.py)
  - `OracleConfig`: Simple configuration for a single direct connection.
  - `OraclePoolConfig`: Configuration for a connection pool (min, max, increment).
  - `connect_with_retry()`: Tries direct connections with retry and backoff delays.
  - `create_pool_with_retry()`: Creates an Oracle pool with retries for readiness scenarios (e.g., container boot).
  - `execute_many()`: Helper for bulk DML with commit.

### Repository layer
- [app/repository/customer_repo.py](../app/repository/customer_repo.py)
  - `BillingTransaction`: Domain model for OLTP transactions.
  - `BillingTransactionRepository`: SQL access layer for billing transactions.
  - `BillingTransactionRepository.get_by_id()`: Fetches a single transaction by `transaction_id`.

### Service layer
- [app/service/customer_service.py](../app/service/customer_service.py)
  - `BillingTransactionSummary`: API-ready summary projection of a transaction.
  - `BillingService`: Business logic layer.
  - `BillingService.get_transaction_summary()`: Returns a mapped `BillingTransactionSummary` or `None` if not found.

### Application entry point
- [app/main.py](../app/main.py)
  - `main()`: Loads config, retrieves credentials, creates a pool, acquires a connection, and prints a transaction summary.

### Database schema and seed data
- [db/init/001_create_schema.sql](../db/init/001_create_schema.sql)
  - Creates OLTP-style tables: accounts and billing_transactions.
  - Seeds sample accounts and transactions for tests.

### Docker
- [docker/Dockerfile](../docker/Dockerfile)
  - Builds a Python image with dependencies and runs pytest by default.
- [docker/docker-compose.yml](../docker/docker-compose.yml)
  - Starts Oracle and runs tests in a container. Oracle initializes schema from db/init.

### Kubernetes (app container)
- [k8s/configmap.yaml](../k8s/configmap.yaml)
  - Non-secret environment configuration for the app.
- [k8s/secret.yaml](../k8s/secret.yaml)
  - Secret values (DB password) injected into the container.
- [k8s/job.yaml](../k8s/job.yaml)
  - Runs the application as a Kubernetes Job (suitable for one-off execution).

### Tests
- [tests/conftest.py](../tests/conftest.py)
  - `oracle_pool` fixture: Session-scoped pool for integration tests.
  - `oracle_connection` fixture: Per-test connection acquired from the pool.
- [tests/test_customer_service.py](../tests/test_customer_service.py)
  - Integration test that verifies end-to-end Oracle access.
- [tests/test_billing_service_unit.py](../tests/test_billing_service_unit.py)
  - Unit tests for the service layer using a fake repository (TDD style).

### Tooling
- [requirements.txt](../requirements.txt): Runtime dependencies.
- [requirements-dev.txt](../requirements-dev.txt): Development dependencies (pytest and coverage).
- [pytest.ini](../pytest.ini): Pytest discovery configuration.
- [README.md](../README.md): Quick usage and architecture summary.
- [./.github/workflows/ci.yml](../../.github/workflows/ci.yml): CI pipeline running Docker tests.
- [./.vscode/settings.json](../../.vscode/settings.json): Workspace spell checker configuration.
- [./.env.example](../.env.example): Example environment configuration for local runs.

## How unit testing works
Unit tests are isolated from Oracle by using a fake repository in [tests/test_billing_service_unit.py](../tests/test_billing_service_unit.py). This follows TDD by validating the behavior of `BillingService` without requiring any external system.

### Run unit tests locally
1. Ensure dev dependencies are installed: pytest and pytest-cov.
2. Run pytest with a keyword filter to avoid integration tests (optional):
   - pytest -k "billing_service_unit"

### Run with coverage
- pytest --cov=app --cov-report=term-missing

### Integration tests in Docker
Integration tests use the real Oracle container and are run by docker compose in [docker/docker-compose.yml](../docker/docker-compose.yml).
These tests require a working local Docker engine (Docker Desktop or equivalent).

## Execution flow (high level)
1. `main()` calls `load_config()` to read environment settings.
2. `EnvOrAwsSecretsProvider.get_db_secret()` provides database credentials.
3. `create_pool_with_retry()` establishes the pool.
4. `BillingTransactionRepository.get_by_id()` executes SQL to read a transaction.
5. `BillingService.get_transaction_summary()` maps the domain model to a summary.
6. The summary is printed.
