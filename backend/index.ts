import {PrismaClient} from "@prisma/client"
import express, { Request, Response } from "express";
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))




const createUser =async (req:Request)=>{
  const prisma = new PrismaClient()
  try {
    const body = req.body;
    await prisma.user.create({
      data: body
    })
    // console.log(body);
  } catch (error) {
    console.log(error);
  }
  finally{
    await prisma.$disconnect()
  }
}


const PORT = process.env.PORT || 5000;
app.get("/", (req:Request,res:Response)=>{
  createUser(req);
  return res.send("Hi there")
})



mongoose.connect(process.env.DATABASE_URL).then(() => {
  app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
  })
}).catch((err:any) => {
  console.log(err)
})
