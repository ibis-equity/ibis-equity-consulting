from __future__ import annotations

from app.repository.customer_repo import BillingTransaction
from app.service.customer_service import BillingService


class FakeBillingRepository:
    def __init__(self, transaction: BillingTransaction | None) -> None:
        self._transaction = transaction

    def get_by_id(self, transaction_id: int) -> BillingTransaction | None:
        return self._transaction if self._transaction and self._transaction.transaction_id == transaction_id else None


def test_billing_service_returns_none_when_missing():
    service = BillingService(FakeBillingRepository(None))

    result = service.get_transaction_summary(1234)

    assert result is None


def test_billing_service_maps_summary_fields():
    transaction = BillingTransaction(
        transaction_id=9000001,
        account_id=2001,
        amount=125.50,
        currency="USD",
        status="CAPTURED",
    )
    service = BillingService(FakeBillingRepository(transaction))

    summary = service.get_transaction_summary(9000001)

    assert summary is not None
    assert summary.transaction_id == 9000001
    assert summary.account_id == 2001
    assert summary.amount == 125.50
    assert summary.currency == "USD"
    assert summary.status == "CAPTURED"
