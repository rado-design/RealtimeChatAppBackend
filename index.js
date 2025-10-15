const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)



server.listen(8000,(req,res)=>{
    console.log('Server is runnig');
})