import Joi from "@hapi/joi"

const registerValidation = (req: any) => {
  const scheme = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    pass: Joi.string().min(4).required(),
  })
  return scheme.validate(req.body)
}

const loginValidation = (req: any) => {
  const scheme = Joi.object({
    email: Joi.string().min(6).required().email(),
    pass: Joi.string().min(4).required(),
  })
  return scheme.validate(req.body)
}

export { registerValidation, loginValidation }
