import mongoose from "mongoose"

export const MongoDB = {
  connection: null as typeof mongoose,
  async init() {
    const { MONGO_URL } = process.env
    this.connection = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },
}
