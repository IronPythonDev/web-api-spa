import { Response } from "express"
import jwt from "jsonwebtoken"

export class Token {
  public token: string
  constructor(private id: string, private token_secret: string) {
    this.token = jwt.sign({ _id: id }, token_secret)
  }
  saveTokenToCookie(res: Response): Response {
    return res.cookie("token", this.token)
  }
  saveTokenToHeader(res: Response): Response {
    return res.header("token", this.token)
  }
}
