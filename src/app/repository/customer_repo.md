# customer_repo.py Line-by-Line Explanation

Source file: [app/repository/customer_repo.py](../app/repository/customer_repo.py)

- [Line 1](../app/repository/customer_repo.py#L1): Enables postponed evaluation of type annotations.
- [Line 3](../app/repository/customer_repo.py#L3): Imports `dataclass` for the domain model.
- [Line 5](../app/repository/customer_repo.py#L5): Imports the Oracle DB driver `oracledb`.

- [Line 8](../app/repository/customer_repo.py#L8): Declares immutable `BillingTransaction` domain model.
- [Line 9](../app/repository/customer_repo.py#L9): Transaction ID field.
- [Line 10](../app/repository/customer_repo.py#L10): Account ID field.
- [Line 11](../app/repository/customer_repo.py#L11): Amount field.
- [Line 12](../app/repository/customer_repo.py#L12): Currency field.
- [Line 13](../app/repository/customer_repo.py#L13): Status field.

- [Line 16](../app/repository/customer_repo.py#L16): Defines repository class for billing transactions.
- [Line 17](../app/repository/customer_repo.py#L17): Constructor takes an `oracledb.Connection`.
- [Line 18](../app/repository/customer_repo.py#L18): Stores the connection for later queries.

- [Line 20](../app/repository/customer_repo.py#L20): Defines `get_by_id()` for a single transaction lookup.
- [Line 21](../app/repository/customer_repo.py#L21): SQL query template.
- [Line 22](../app/repository/customer_repo.py#L22): Selects transaction fields.
- [Line 23](../app/repository/customer_repo.py#L23): Table name `billing_transactions`.
- [Line 24](../app/repository/customer_repo.py#L24): Filters by `transaction_id`.
- [Line 26](../app/repository/customer_repo.py#L26): Opens a cursor in a context manager.
- [Line 27](../app/repository/customer_repo.py#L27): Executes the query with a bound parameter.
- [Line 28](../app/repository/customer_repo.py#L28): Fetches one row.
- [Line 29](../app/repository/customer_repo.py#L29): Returns `None` if no row is found.
- [Line 30](../app/repository/customer_repo.py#L30): Maps the row to `BillingTransaction`.
- [Line 31](../app/repository/customer_repo.py#L31): Maps `transaction_id`.
- [Line 32](../app/repository/customer_repo.py#L32): Maps `account_id`.
- [Line 33](../app/repository/customer_repo.py#L33): Converts `amount` to float.
- [Line 34](../app/repository/customer_repo.py#L34): Maps `currency`.
- [Line 35](../app/repository/customer_repo.py#L35): Maps `status`.
