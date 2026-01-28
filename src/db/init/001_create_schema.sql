ALTER SESSION SET CURRENT_SCHEMA=app_user;

CREATE TABLE accounts (
    account_id   NUMBER(10) PRIMARY KEY,
    account_name VARCHAR2(100) NOT NULL,
    status       VARCHAR2(20) NOT NULL,
    created_at   TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE billing_transactions (
    transaction_id NUMBER(12) PRIMARY KEY,
    account_id     NUMBER(10) NOT NULL,
    amount         NUMBER(12, 2) NOT NULL,
    currency       VARCHAR2(3) NOT NULL,
    status         VARCHAR2(20) NOT NULL,
    created_at     TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    CONSTRAINT fk_billing_transactions_account
        FOREIGN KEY (account_id)
        REFERENCES accounts (account_id)
);

CREATE INDEX idx_billing_txn_account
    ON billing_transactions (account_id, created_at);

INSERT INTO accounts (account_id, account_name, status)
VALUES (2001, 'Acme Cloud Services', 'ACTIVE');

INSERT INTO accounts (account_id, account_name, status)
VALUES (2002, 'Northwind Billing', 'ACTIVE');

INSERT INTO billing_transactions (transaction_id, account_id, amount, currency, status)
VALUES (9000001, 2001, 125.50, 'USD', 'CAPTURED');

INSERT INTO billing_transactions (transaction_id, account_id, amount, currency, status)
VALUES (9000002, 2001, 58.20, 'USD', 'PENDING');

INSERT INTO billing_transactions (transaction_id, account_id, amount, currency, status)
VALUES (9000003, 2002, 410.00, 'USD', 'CAPTURED');

COMMIT;
