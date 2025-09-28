const express = require("express")
const router = express.Router();
const CanIdeal = require("../schema/candiIdeal")

router.get("/testOne", async (req, res)=>{
    try{

        const getData = await CanIdeal.find().select({
            'Vote summary': 1,
            'Vote date': 1
        })
        //get all yes, no and abstain for the graph
        let newRes = {"vote_distribution": {"Yes": 0, "No": 0, "Abstain": 0, "Non-Voting": 0}, "unique_countries": 0, "date_range": {"earliest": "", "latest": ""}}
        function getDataSet(){
            newRes["unique_countries"] = getData[0]["Vote summary"].trim().slice(getData[0]["Vote summary"].length-4)
            for(i=0; i<getData.length; i++){
                let analyze = getData[i]["Vote summary"].split(" | ")
                for(k=0; k<analyze.length-1; k++){
                    let currentData = analyze[k].split(" ")
                    // console.log(+currentData[currentData.length-1])
                    let amountNew = +currentData[currentData.length-1]
                    // console.log(amountNew)
                    if(isNaN(amountNew)){
                        continue;
                    }
                    switch(k){
                        case 0:
                            newRes["vote_distribution"]["Yes"] += amountNew
                            break;
                        case 1:
                            newRes["vote_distribution"]["No"] += amountNew
                            break;
                        case 2:
                            newRes["vote_distribution"]["Abstain"] += amountNew
                            break;
                        case 3:
                            newRes["vote_distribution"]["Non-Voting"] += amountNew
                            break;
                    }
                }
            }
            newRes["date_range"]["latest"] = getData[0]["Vote date"]
            newRes["date_range"]["earliest"] = getData[getData.length-1]["Vote date"]
        }
        getDataSet()
        // getData["Vote"].split(", ")
        res.json(newRes)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "cant connect to server"})
    }
})

module.exports = router;