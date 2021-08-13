module.exports = (req, res, next) => {
    if(!req.body.id){
        let id = Math.floor(Math.random() * 999999) + 1
        req.body.id = id;
        req.body._id = id;
    }
    if(req.method !== "GET")
        res.send("Done. (Mock Server This is not For real! =D)");
    else
        next();
}