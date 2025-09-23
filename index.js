const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

mongoose.connect(process.env.MONGODB_KEY)
.then(()=>{console.log("Connected to mongodb")})
.catch((err)=>{console.log("Error, nuh uh, problem is: "), err})

app.use(express.json())

app.get("/api", (req, res)=>{
    res.json({fruits: ["new", "app"]})
})

app.listen(8000, ()=>{
    console.log("Server start at http://localhost:8000")
});