const express = require("express")
const router = express.Router();
const CanIdeal = require("../schema/candiIdeal")
const Candidates = require("../schema/candidatesInfo")

//tmr: just change database, so implement later
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

router.get("/allCandiIdeality", async (req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const amountData = (page-1)*limit;

        const getData = await Candidates.find().select('metadata.title metadata.vote_date metadata.agenda metadata.resolution metadata.vote_summary')
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
            '_id': 0,
            'id': 1,
            'Vote date': 1
        })
        if(getNewStuffs.length==0)
            return res.status(500).json({error: "No dates found"})
        res.json(getNewStuffs)
    }catch(err){
        res.status(500).json({error: "cant connect to server"}),
        console.log(err)
    }
})

// router.get("/historiesVotes", async (req, res)=>{
//     try{
//         const newDates = req.query.dates;
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const amountData = (page-1)*limit;

//         const getNewStuffs = await Candidates.find({"metadata.vote_date": `${newDates}`}).select('metadata.title metadata.vote_date metadata.agenda metadata.resolution metadata.vote_summary')
//         if(getNewStuffs.length==0)
//             res.json({error: "No dates found"})
//         res.json(getNewStuffs.slice(amountData, amountData+limit))
//     }catch(err){
//         res.status(500).json({error: "cant connect to server"})
//     }
// })

module.exports = router