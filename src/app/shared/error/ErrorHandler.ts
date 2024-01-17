import MongoDBErrorCodes from '../enums/MongoDBErrorCodes'
import MySQLErrorCodes from '../enums/MySqlDBErrorCodes'
import HttpStatusCode from '../enums/httpStatusCode'
import Exception from './Exception'
import Warning from './Warning'
import ErrorCode from './errorCode'

export class ErrorHandler {
  constructor( public readonly error ) { }
  private _dbType = process.env.DATABASE_TYPE

  public handle(): Error {
    if (this._dbType === 'MONGO') {
      return this._handleMongoDBError()
    } else if (this._dbType === 'MYSQL') {
      return this._handleMySQLError()
    }
  }

  private _handleMongoDBError(): Error {
    if (this.error.code === MongoDBErrorCodes.DUPLICATE_KEY)
      throw new Warning(HttpStatusCode.CONFLICT, ErrorCode.ERR0007)
    else if (this.error.errors?.name?.kind === 'required')
      throw new Warning(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0008)
    else
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
  }

  private _handleMySQLError(): Error {
    const code = this.error.original.errno
    if (code === MySQLErrorCodes.ER_DUP_KEYNAME || code === MySQLErrorCodes.ER_DUP_ENTRY)
      throw new Warning(HttpStatusCode.CONFLICT, ErrorCode.ERR0007)
    else if (code === MySQLErrorCodes.ER_BAD_NULL_ERROR)
      throw new Warning(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0008)
    else if (code === MySQLErrorCodes.ER_NON_UNIQ_ERROR)
      throw new Warning(HttpStatusCode.CONFLICT, ErrorCode.ERR0013)
    else
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
  }
}