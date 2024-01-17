import jwt from 'jsonwebtoken'

export type TokenOptions = {
  expiresIn?: string | number
}

export const generateToken = <T>(payload: T, expires: boolean) => {
  const secret = process.env.SECRET_KEY || 'secret'
  if (!expires) return jwt.sign(payload, secret)

  // With expiration time
  const options: TokenOptions = {
    expiresIn: process.env.EXPIRATION_TIME || '24h',
  }
  return jwt.sign(payload, secret, options)
}