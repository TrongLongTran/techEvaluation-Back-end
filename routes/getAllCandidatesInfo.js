const express = require("express")
const router = express.Router();
const CanIdeal = require("../schema/candiIdeal")
// const Sumarizing = require("../schema/summary")
const {verifyUsernameAndPass, checkYear, verifyFields} = require("../middleware/checkPost");

router.get("/isealDTB", async (req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const amountData = (page-1)*limit;

        const getData = await CanIdeal.find().select({
            '_id': 0,
            'id': 1,
            'Title': 1,
            'Agenda': 1,
            'Resolution': 1,
            'Meeting record': 1,
            'Draft resolution': 1,
            'Note': 1,
            'Vote summary': 1,
            'Vote date': 1,
            'Vote': 1,
            'Collections': 1,
            'Committee report': 1
        })
        .skip(amountData)
        .limit(limit)
        if(getData.length==0)
            return res.status(400).json({error: "Something is wrong, found nothing"})
        res.json(getData)
    }catch(err){
        res.status(500).json({error: "cant connect to server"})
    }
})

router.get("/historiesVotes", async (req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const amountData = (page-1)*limit;
        //only take dates
        let newDates = req.query.days
        const getData = await CanIdeal.find({"Vote date": newDates}).select({
            '_id': 0,
            'id': 1,
            'Title': 1,
            'Agenda': 1,
            'Resolution': 1,
            'Meeting record': 1,
            'Draft resolution': 1,
            'Note': 1,
            'Vote summary': 1,
            'Vote date': 1,
            'Vote': 1,
            'Collections': 1,
            'Committee report': 1
        })
        .skip(amountData)
        .limit(limit)
        if(getData.length==0)
            return res.status(400).json({error: "Something is wrong, found nothing"})
        let finInf = [];
        getData.map(sort=>{
            finInf.push({"_id": sort["_id"], "Title": sort["Title"], "Vote date": sort["Vote date"], "Agenda": sort["Agenda"], "Resolution": sort["Resolution"], "Vote summary": sort["Vote summary"]})
        })
        res.json(finInf)
    }catch(err){
        res.status(500).json({error: "cant connect to server"})
    }
})

router.get("/allTimeLine", async (req, res)=>{
    //insert 10 first result out of all the time line
    try{
        const getNewStuffs = await CanIdeal.find().select({
            '_id': 1,
            'id': 1,
            'Vote date': 1
        })
        .limit(10)
        if(getNewStuffs.length==0)
            return res.status(500).json({error: "No dates found"})
        res.json(getNewStuffs)
    }catch(err){
        res.status(500).json({error: "cant connect to server"})
    }
})

router.post("/resultCountry", checkYear, verifyFields, verifyUsernameAndPass, async (req, res)=>{
    try{
        const fromUser = req.body;
        //when match both Title and id, fetch any of them back
        const getData = await CanIdeal.find({
            $or: fromUser.map(u=>({"Title": u["Title"], "id": u["id"]}))
        }).select('Title id')
        .catch(err=>{return res.status(500).json({error: err})})

        //find the information that match what are sent back
        if(getData.length!=0){
            for(i = 0; i<fromUser.length; i++){
                let currentSet = fromUser[i]
                for(k=0; k<getData.length; k++){
                    if((getData[k]['Title'] == currentSet["Title"]) && (getData[k]['id'] == currentSet["id"]))
                        return res.status(400).json({error: `Problem at value ${i}, duplicate data`})
                }
            }
        }

        //add new stuffs in dtb 
        const sendAdd = await CanIdeal.insertMany(fromUser)
        if(!sendAdd || sendAdd.length === 0){
            return res.status(400).json({error: "something's missing, please fill everything"})
        }
        res.status(200).json({success: "added to database"})
    }catch(err){
        res.status(500).json({error: "something is wrong"})
    }
})

// router.post("/resultCountry/stressTestSake", checkYear, verifyFields, verifyUsernameAndPass, async (req, res)=>{
//     try{
//         const fromUser = req.body;
//         const getData = await Sumarizing.find({
//             $or: fromUser.map(u=>({"Title": u["Title"], "id": u["id"]}))
//         }).select('Title id')
//         .catch(err=>{return res.status(500).json({error: err})})

//         if(getData.length!=0){
//             for(i = 0; i<fromUser.length; i++){
//                 let currentSet = fromUser[i]
//                 for(k=0; k<getData.length; k++){
//                     if((getData[k]['Title'] == currentSet["Title"]) && (getData[k]['id'] == currentSet["id"]))
//                         return res.status(400).json({error: `Problem at value ${i}, duplicate data`})
//                 }
//             }
//         }

//         //add new stuffs in dtb 
//         //REMEMBER: SWITCH BACK BEFORE FOKIN SUBMIT
//         // const sendAdd = await CanIdeal.insertMany(fromUser)
//         const sendAdd = await Sumarizing.insertMany(fromUser)
//         if(!sendAdd || sendAdd.length === 0){
//             return res.status(400).json({error: "something's missing, please fill everything"})
//         }
//         res.status(200).json({success: "added to database"})
//     }catch(err){
//         res.status(500).json({error: "something is wrong"})
//     }
// })

module.exports = router