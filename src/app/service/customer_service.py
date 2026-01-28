from __future__ import annotations

from dataclasses import dataclass

from app.repository.customer_repo import BillingTransaction, BillingTransactionRepository


@dataclass(frozen=True)
class BillingTransactionSummary:
    transaction_id: int
    account_id: int
    amount: float
    currency: str
    status: str


class BillingService:
    def __init__(self, repository: BillingTransactionRepository) -> None:
        self._repository = repository

    def get_transaction_summary(self, transaction_id: int) -> BillingTransactionSummary | None:
        transaction = self._repository.get_by_id(transaction_id)
        if not transaction:
            return None
        return BillingTransactionSummary(
            transaction_id=transaction.transaction_id,
            account_id=transaction.account_id,
            amount=transaction.amount,
            currency=transaction.currency,
            status=transaction.status,
        )
