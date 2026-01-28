from __future__ import annotations

import json
from dataclasses import dataclass

import boto3


@dataclass(frozen=True)
class DbSecret:
    username: str
    password: str
    dsn: str


class SecretsProvider:
    def get_db_secret(self) -> DbSecret:
        raise NotImplementedError


class EnvOrAwsSecretsProvider(SecretsProvider):
    def __init__(self, *, use_aws: bool, region: str, secret_name: str, env_user: str, env_password: str, env_dsn: str) -> None:
        self._use_aws = use_aws
        self._region = region
        self._secret_name = secret_name
        self._env_user = env_user
        self._env_password = env_password
        self._env_dsn = env_dsn

    def get_db_secret(self) -> DbSecret:
        if not self._use_aws:
            return DbSecret(username=self._env_user, password=self._env_password, dsn=self._env_dsn)

        if not self._secret_name:
            raise ValueError("AWS_SECRET_NAME is required when USE_AWS_SECRETS=true")

        client = boto3.client("secretsmanager", region_name=self._region)
        response = client.get_secret_value(SecretId=self._secret_name)
        payload = json.loads(response["SecretString"])
        return DbSecret(
            username=payload["username"],
            password=payload["password"],
            dsn=payload["dsn"],
        )
