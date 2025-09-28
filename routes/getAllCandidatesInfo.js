const express = require("express")
const router = express.Router();
const CanIdeal = require("../schema/candiIdeal")
// const Candidates = require("../schema/candidatesInfo")
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
        if(getData.length==0)
            return res.status(400).json({error: "Something is wrong, found nothing"})
        res.json(getData.slice(amountData, amountData+limit))
    }catch(err){
        res.status(500).json({error: "cant connect to server"})
    }
})

router.get("/historiesVotes", async (req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const amountData = (page-1)*limit;
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
        if(getData.length==0)
            return res.status(400).json({error: "Something is wrong, found nothing"})
        res.json(getData.slice(amountData, amountData+limit))
    }catch(err){
        res.status(500).json({error: "cant connect to server"})
    }
})

router.get("/allTimeLine", async (req, res)=>{
    try{
        // const getNewStuffs = await Candidates.find().select('metadata.vote_date')
        const getNewStuffs = await CanIdeal.find().select({
            '_id': 1,
            'id': 1,
            'Vote date': 1
        })
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
        const getData = await CanIdeal.find({
            $or: fromUser.map(u=>({"Title": u.Title, "id": u.id}))
        }).select('Title id')
        .catch(err=>{return res.status(500).json({error: err})})
        console.log(getData)
        
        if(getData.length!=0){
            for(i = 0; i<fromUser.length; i++){
                let currentSet = fromUser[i]
                getData.map(value=>{
                    if((value['Title'] == currentSet["Title"]) && (value['id'] == currentSet["id"])){
                        return res.status(400).json({error: `Problem at value ${i}, duplicate data`})
                        
                    }
                })
            }
        }
        //add new stuffs in dtb
        const sendAdd = await CanIdeal.insertMany(fromUser)
        if(sendAdd.length==0){
            return res.status(400).json({error: "something's missing, please fill everything"})
        }
        res.status(200).json({success: "added to database"})
    }catch(err){
        res.status(500).json({error: "something is wrong"})
    }
})

module.exports = router