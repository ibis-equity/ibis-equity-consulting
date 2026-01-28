# oracle.py Line-by-Line Explanation

Source file: [app/db/oracle.py](../app/db/oracle.py)

- [Line 1](../app/db/oracle.py#L1): Enables postponed evaluation of type annotations (PEP 563/649 compatibility).
- [Line 3](../app/db/oracle.py#L3): Imports `time` for sleep between retries.
- [Line 4](../app/db/oracle.py#L4): Imports `dataclass` for simple config models.
- [Line 5](../app/db/oracle.py#L5): Imports `Iterable` for type hints.
- [Line 7](../app/db/oracle.py#L7): Imports the Oracle DB driver `oracledb`.

- [Line 10](../app/db/oracle.py#L10): Declares an immutable config class for single connections.
- [Line 11](../app/db/oracle.py#L11): Oracle username field.
- [Line 12](../app/db/oracle.py#L12): Oracle password field.
- [Line 13](../app/db/oracle.py#L13): Oracle DSN field.

- [Line 16](../app/db/oracle.py#L16): Declares an immutable config class for connection pools.
- [Line 17](../app/db/oracle.py#L17): Oracle username field.
- [Line 18](../app/db/oracle.py#L18): Oracle password field.
- [Line 19](../app/db/oracle.py#L19): Oracle DSN field.
- [Line 20](../app/db/oracle.py#L20): Pool minimum size (default 1).
- [Line 21](../app/db/oracle.py#L21): Pool maximum size (default 5).
- [Line 22](../app/db/oracle.py#L22): Pool increment size (default 1).

- [Line 25](../app/db/oracle.py#L25): Defines `connect_with_retry()` to create a single connection with retries.
- [Line 26](../app/db/oracle.py#L26): Tracks the last exception for error chaining.
- [Line 27](../app/db/oracle.py#L27): Loops up to the retry limit.
- [Line 28](../app/db/oracle.py#L28): Attempts to open a connection with UTF-8 encoding.
- [Line 29](../app/db/oracle.py#L29): Catches any exception during connection.
- [Line 30](../app/db/oracle.py#L30): Stores the error for later.
- [Line 31](../app/db/oracle.py#L31): Sleeps between retries.
- [Line 32](../app/db/oracle.py#L32): Raises a `RuntimeError` after all retries, chaining the last error.

- [Line 35](../app/db/oracle.py#L35): Defines `create_pool_with_retry()` to create a connection pool with retries.
- [Line 36](../app/db/oracle.py#L36): Tracks the last exception for error chaining.
- [Line 37](../app/db/oracle.py#L37): Loops up to the retry limit.
- [Line 38](../app/db/oracle.py#L38): Attempts to create a pool with provided sizes and UTF-8 encoding.
- [Line 47](../app/db/oracle.py#L47): Catches any exception during pool creation.
- [Line 48](../app/db/oracle.py#L48): Stores the error for later.
- [Line 49](../app/db/oracle.py#L49): Sleeps between retries.
- [Line 50](../app/db/oracle.py#L50): Raises a `RuntimeError` after all retries, chaining the last error.

- [Line 53](../app/db/oracle.py#L53): Defines `execute_many()` to run bulk SQL DML.
- [Line 54](../app/db/oracle.py#L54): Opens a cursor in a context manager.
- [Line 55](../app/db/oracle.py#L55): Executes `executemany()` with the provided rows.
- [Line 56](../app/db/oracle.py#L56): Commits the transaction.
