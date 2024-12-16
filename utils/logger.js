const pino = require('pino')

const streams = [
    { stream: process.stdout,level :"trace" }, 
    { 
        stream: pino.destination('./logs/trace.log'), 
        level: 'trace'  
    }
];


const logger = pino({
    level:"trace",
   formatters:{
    level:(label,number)=>{
        return {label:label.toUpperCase()}
    },
    bindings:(data)=>{
        console.log(data)
        return {}
    },
},
timestamp :() =>`,"time" : "${new Date().toISOString()}"`
},pino.multistream(streams))


const ProductionLogger = pino({
    level:"info",
   formatters:{
    level:(label,number)=>{
        return {label:label.toUpperCase()}
    },
    bindings:()=>{
        return {}
    },
},
timestamp :() =>`,"time" : "${new Date().toISOString()}"`
},pino.destination('./logs/app.logs'))

module.exports = { logger ,ProductionLogger }
