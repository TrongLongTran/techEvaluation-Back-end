function verifyUsernameAndPass(req, res, next){
    try{
        const fetchIn = req.body;
        for(i = 0; i<fetchIn.length; i++){
            let dataIn = fetchIn[i]
            if(+dataIn["id"]>10000000 || +dataIn["id"] < 0){
                return res.status(400).json({error: "resolution id is not suppose to be higher than 20000000"})
                
            }
        }
        // )
        next()
    }catch (err){
        res.status(500).json({error: "something is wrong, cannot connect"})
    }
}

function verifyFields(req, res, next){
    try{
        const fetchIn = req.body;

        for(i = 0; i<fetchIn.length; i++){
            if(fetchIn[i]["id"]=="" || fetchIn[i]["Title"]=="" || fetchIn[i]["Agenda"]=="" || fetchIn[i]["Resolution"]=="" || fetchIn[i]["Meeting Record"]=="" || fetchIn[i]["Draft resolution"]=="" || fetchIn[i]["Note"]=="" || fetchIn[i]["Vote summary"]=="" || fetchIn[i]["Vote date"]=="" || fetchIn[i]["Collections"]==""){
                return res.status(400).json({error: "Please fill everything"})
            }
        }
        next()
    }catch (err){
        res.status(500).json({error: "something is wrong, cannot connect"})
    }
}

function checkYear(req, res, next){
    try{
        const fetchIn = req.body;
        // fetchIn.map(dataIn=>{
        for (i = 0; i<fetchIn.length; i++){
            let dataIn = fetchIn[i]
            let ref = dataIn["Vote date"].split("-")
            if(ref.length<3)
                return res.status(400).json({error: "Please enter vote date in this format yyyy-mm-dd"})
            else{
                if(ref[0].length!=4)
                    return res.status(400).json({error: "Please enter vote date in this format yyyy-mm-dd"})
                if(ref[1].length != 2 || ref[2].length != 2)
                    return res.status(400).json({error: "Please enter vote date in this format yyyy-mm-dd"})
            }

            if(parseInt(ref[0])>2025 || parseInt(ref[0])<2001)
                return res.status(400).json({error: "year should be > 2001 and < 2025"})
            if(parseInt(ref[1])<0 || parseInt(ref[1])>12)
                return res.status(400).json({error: "month should be 1 to 12"})
            if(parseInt(ref[2])<0 || parseInt(ref[2])>30)
                return res.status(400).json({error: "day should be 1 to 30"})
        }
        // )
        next()
    }catch (err){
        res.status(500).json({error: "something is wrong, cannot connect"})
    }
}

module.exports = {verifyUsernameAndPass, checkYear, verifyFields};