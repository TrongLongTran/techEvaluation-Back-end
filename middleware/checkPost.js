function verifyUsernameAndPass(req, res, next){
    try{
        const fetchIn = req.body;
        fetchIn.map(dataIn=>{
            if(+dataIn["id"]>2000000 || +dataIn["id"] < 0){
                return res.status(400).json({error: "resolution id is not suppose to be higher than 2000000"})
                
            }
        }
        )
        next()
    }catch (err){
        res.status(500).json({error: "something is wrong, cannot connect"})
    }
}

function verifyFields(req, res, next){
    try{
        const fetchIn = req.body;
        fetchIn.map(dataIn=>{
            if(dataIn["id"]=="" || dataIn["Title"]=="" || dataIn["Agenda"]=="" || dataIn["Resolution"]=="" || dataIn["Meeting Record"]=="" || dataIn["Draft resolution"]=="" || dataIn["Note"]=="" || dataIn["Vote summary"]=="" || dataIn["Vote date"]=="" || dataIn["Collections"]==""){
                return res.status(400).json({error: "Please fill everything"})
            }
        }
        )
        next()
    }catch (err){
        res.status(500).json({error: "something is wrong, cannot connect"})
    }
}

function checkYear(req, res, next){
    try{
        const fetchIn = req.body;
        fetchIn.map(dataIn=>{
            let ref = dataIn["Vote date"].split("-")
            if(ref.length<3)
                return res.status(400).json({error: "Please enter vote date in this format yyyy-mm-dd"})
            else{
                if(ref[0].length!=4)
                    return res.status(400).json({error: "Please enter vote date in this format yyyy-mm-dd"})
                if(ref[1].length != 2 || ref[2].length != 2)
                    return res.status(400).json({error: "Please enter vote date in this format yyyy-mm-dd"})
            }
            next()
        }
        )
        next()
    }catch (err){
        res.status(500).json({error: "something is wrong, cannot connect"})
    }
}

module.exports = {verifyUsernameAndPass, checkYear, verifyFields};