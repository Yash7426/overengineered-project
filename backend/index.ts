
import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import userRoute from "./routes/userRoute"
import mongoose from "mongoose";
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const PORT =  5000;
app.get("/", (req:Request,res:Response)=>{
  return res.send("Hi there")
})

app.use("/api/users", userRoute);

app.use(errorHandler)

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})
