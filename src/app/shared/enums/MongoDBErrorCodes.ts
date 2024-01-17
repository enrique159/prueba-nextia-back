/**
 * MongoDB Error Codes.
 * @see {@link https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.yml}
 */

enum MongoDBErrorCodes {
  DUPLICATE_KEY = 11000,
  DUPLICATE_KEY_UPDATE = 11001,
  DUPLICATE_KEY_CAPPED = 12582,
  DUPLICATE_KEY_INDEX = 16460,
}

export default MongoDBErrorCodes
