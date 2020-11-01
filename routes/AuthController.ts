import { NextFunction, Router, Request, Response } from "express"
import bcrypt from "bcrypt"
import { User } from "../model/User"
import { loginValidation, registerValidation } from "../validation/Auth"
import { Token } from "../utils/Token"

const router = Router()

export class AuthError {
  constructor(
    public outputObject: any = "Unknow Error",
    public statusCode = 500
  ) {}
}

interface IAuthLoginType {
  email: string
  pass: string
}

interface IAuthRegisterType {
  email: string
  name: string
  pass: string
}

router.post("/register", async (req, res, next) => {
  try {
    const { email, name, pass } = req.body as IAuthRegisterType

    const { error } = registerValidation(req)
    if (error) throw new AuthError(error.details[0].message)

    const user = await User.findOne({ email: email })
    if (user) throw new AuthError("This user already exists")

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(pass, salt)

    const savedUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      registerDate: new Date(),
    })
    await savedUser.save()

    const token = new Token(savedUser._id, process.env.TOKEN_SECRET)
    return token.saveTokenToCookie(res).send({ id: savedUser._id })
  } catch (e) {
    next(e)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { email, pass } = req.body as IAuthLoginType

    const { error } = loginValidation(req)
    if (error) throw new AuthError(error.details[0].message)

    const user = await User.findOne({ email: email })
    if (!user) throw new AuthError("Email is not found")

    const validPassword = await bcrypt.compare(pass, user["password"])
    if (!validPassword) throw new AuthError("Invalid password")

    const token = new Token(user._id, process.env.TOKEN_SECRET)

    return token.saveTokenToCookie(res).send({ user: user, token: token.token })
  } catch (e) {
    next(e)
  }
})

router.use(
  async (error: AuthError, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof AuthError)) return next()

    res.statusCode = error.statusCode
    res.send({ error: error.outputObject })
  }
)

export { router }
