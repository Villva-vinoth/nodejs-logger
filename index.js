const express = require('express');
const app = express();
const serveIndex = require('serve-index');
const {logger ,ProductionLogger} = require('./utils/logger')
const { winstonLogger} = require('./utils/winston')
const { responseLog }  = require('./middleware/responseLog.middleware')
const baseRouter = require('./router/base.router');
app.use(express.json());

let log = ProductionLogger 
const production = "local"
if(production !== "production"){
    log = logger
}

app.use(responseLog(log,winstonLogger))

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Home Page",
        server:1
    })
})

app.use('/api',baseRouter)

app.use('/logs',express.static('./logs'),serveIndex('./logs',{"icons":true}))
app.use('/',express.static('./public/uploads'))


app.listen(4000,()=>{
    console.log(`servers is running on the port : ${4000} ${process.pid}`);
})
