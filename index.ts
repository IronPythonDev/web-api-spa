import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { Server } from "http"
import { router } from "./routes/AuthController"
import { MongoDB } from "./database/DataBaseConnection"

const main = async () => {
  dotenv.config()
  const { PORT } = process.env

  await MongoDB.init()

  const app = express()
  const server = new Server(app)

  app.use(express.json())
  app.use(cookieParser())
  app.use("/api/auth", router)

  server.listen(+PORT, () => {
    console.log("Server Up and running")
  })
}

main().catch(console.error)
