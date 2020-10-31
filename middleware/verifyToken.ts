import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AuthError } from "../routes/AuthController"

function verifyTokenCookie(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies
  if (!token) throw new AuthError("Access Denied")
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (e) {
    throw new AuthError("Invalid Token")
  }
}

export { verifyTokenCookie }
