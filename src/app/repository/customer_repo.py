from __future__ import annotations

from dataclasses import dataclass

import oracledb


@dataclass(frozen=True)
class BillingTransaction:
    transaction_id: int
    account_id: int
    amount: float
    currency: str
    status: str


class BillingTransactionRepository:
    def __init__(self, connection: oracledb.Connection) -> None:
        self._connection = connection

    def get_by_id(self, transaction_id: int) -> BillingTransaction | None:
        sql = """
            SELECT transaction_id, account_id, amount, currency, status
            FROM billing_transactions
            WHERE transaction_id = :transaction_id
        """
        with self._connection.cursor() as cursor:
            cursor.execute(sql, transaction_id=transaction_id)
            row = cursor.fetchone()
            if not row:
                return None
            return BillingTransaction(
                transaction_id=row[0],
                account_id=row[1],
                amount=float(row[2]),
                currency=row[3],
                status=row[4],
            )
