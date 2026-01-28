from __future__ import annotations

from app.repository.customer_repo import BillingTransactionRepository
from app.service.customer_service import BillingService


def test_billing_transaction_summary_from_oracle(oracle_connection):
    repository = BillingTransactionRepository(oracle_connection)
    service = BillingService(repository)

    summary = service.get_transaction_summary(9000001)

    assert summary is not None
    assert summary.transaction_id == 9000001
    assert summary.account_id == 2001
    assert summary.amount == 125.50
    assert summary.currency == "USD"
    assert summary.status == "CAPTURED"
