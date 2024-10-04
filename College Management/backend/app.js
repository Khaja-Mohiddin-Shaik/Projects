const express = require("express")
const app = express()
const mongoose = require("mongoose")
const commonRouter = require("./router/commonRouter");
const adminRouter =  require("./router/adminRouter")
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOptions))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const dbConnection = async ()=>{
   await mongoose.connect(process.env.dbURL)
   app.listen(process.env.PORT)
}
dbConnection()

app.use("/api", commonRouter);
app.use("/api/admin", adminRouter);