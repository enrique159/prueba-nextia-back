/**
 * MySQL Error Codes.
 * @see {@link https://dev.mysql.com/doc/mysql-errors/8.0/en/}
 */

enum MySQLErrorCodes {
  ER_DUP_ENTRY = 1062,
  ER_BAD_FIELD_ERROR = 1054,
  ER_NON_UNIQ_ERROR = 1052,
  ER_DUP_KEYNAME = 1061,
  ER_DUP_FIELDNAME = 1060,
  ER_BAD_NULL_ERROR = 1048,
  ER_BAD_DB_ERROR = 1049,
  ER_TABLE_EXISTS_ERROR = 1050,
  ER_BAD_TABLE_ERROR = 1051,
}

export default MySQLErrorCodes