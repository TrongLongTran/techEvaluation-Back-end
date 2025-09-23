const express = require("express")
const app = express();

app.get("/api", (req, res)=>{
    res.json({fruits: ["new", "app"]})
})

app.listen(8000, ()=>{
    console.log("Server start at http://localhost:8000")
});