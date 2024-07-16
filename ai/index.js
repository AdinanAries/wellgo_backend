import express from "express";
const app = express();

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import OpenAIModel from "./openAI.js";

const testDrive = async () => {
    const res = await OpenAIModel.getResponse();
    console.log(res);
}
testDrive();

// Port
const PORT = process.env.PORT || 4110;

// Use Cors
app.use(cors({
    origin: '*'
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Default Route
app.use("/", (req, res, next)=>{res.send("AI Server Works")});

// Run Server
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));