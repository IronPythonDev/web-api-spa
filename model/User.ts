import { model, Schema } from "mongoose"

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 25,
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
    registerDate: Date,
  },
  { versionKey: false }
)

const User = model("User", UserSchema)

export { User }
