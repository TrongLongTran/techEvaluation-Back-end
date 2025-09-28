const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const candiDateInfo = require("./routes/getAllCandidatesInfo")
const finalInfor = require("./routes/getTotalsFinals")
const cors = require("cors")

dotenv.config();

const client = mongoose.connect(process.env.MONGODB_KEY)
.then(()=>{console.log("Connected to mongodb")})
.catch((err)=>{console.log("Error, nuh uh, problem is: "), err})

app.use(cors())


app.use(express.json())
// /getCandidates/allCandiIdeality
app.use("/getCandidates", candiDateInfo);
app.use("/getTotalRes", finalInfor)

app.listen(8000, ()=>{
    console.log("Server start at http://localhost:8000")
});