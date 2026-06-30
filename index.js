import dotenv from "dotenv"
import express from "express"
import connectDB from "./Config/ConnectDb.js"
import authRouter from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config({ path: "./.env" })
import cors from "cors"
import userRouter from "./Routes/user.route.js"
import { assistantRouter } from "./Routes/assistant.route.js"

const app = express()

const privateCors = cors({
  origin: ["https://kimraai.vercel.app"],
  credentials: true
});

const publicCors = cors({
  origin: "*",
});

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.json("Hello from the server ")
})

app.use("/api/auth", privateCors, authRouter)
app.use("/api/user", privateCors, userRouter)
app.use("/api/assistant", publicCors, assistantRouter)

connectDB()

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
  })
}

export default app
