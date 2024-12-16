const express = require('express');
const app = express();
const {logger ,ProductionLogger} = require('./utils/logger')
const { responseLog }  = require('./middleware/responseLog.middleware')
const baseRouter = require('./router/base.router');
app.use(express.json());

let log = ProductionLogger 
const production = "local"
if(production !== "production"){
    log = logger
}

app.use(responseLog(log))

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Home Page",
        server:2
    })
})

app.use('/api',baseRouter)

app.use('/logs',express.static('./logs'))
app.use('/',express.static('./public/uploads'))


app.listen(5000,()=>{
    console.log(`servers is running on the port : ${5000} ${process.pid}`);
})
