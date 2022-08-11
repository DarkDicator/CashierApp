import express from "express"
import cors from "cors"
import business from "./api/business.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/business", business)
app.use("*", (req, res) => res.status(404).json({error: "404 not found"}))

export default app