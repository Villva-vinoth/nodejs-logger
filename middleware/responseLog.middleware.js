module.exports = {
    responseLog :(log,winston) =>((req,res,next)=>{
        const json = res.json
        res.json = function (body){
            console.log("body data",body)
            json.call(this,body)
            log.info(
                {
                    method : req.method,
                    url : req.url,
                    reponsebody: body
                }
            )
            winston.info(body)
        }
        next();
    })    
}
