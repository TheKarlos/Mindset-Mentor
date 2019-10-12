module.exports = function(req, res, next){
    if(!global.config.securedURLs.includes(req.path)){ // if URL does not need a valid session
        next(); // go to the next step in routing (skip session validation)
        return;
    }

    // check the sessions table
    var session = global.serverDB.prepare("SELECT * FROM `Sessions` WHERE SID=?").get(req.session.id);
    if(session === undefined || !session){
        console.log(session);
        res.redirect("/login");
        return;
    }

    next();
}