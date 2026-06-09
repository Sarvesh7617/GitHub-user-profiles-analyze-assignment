import express from "express";

const app=express();

app.use(express.json());



import AnalyzerRouter from "./routers/profile.router.js";


app.use("/api/v1/github",AnalyzerRouter);


export {app};