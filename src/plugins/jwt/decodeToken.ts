import jwt from 'jsonwebtoken'

export const decodeToken = (token: string) => {
  const replacedToken = token.replace('Bearer ', '')
  return jwt.decode(replacedToken)
}