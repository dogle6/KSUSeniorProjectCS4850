const fs = require('fs')
const url = require('url')
const express = require('express')
const path = require('path')
const app = express()
const router = express.Router();
const port = 3000

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/public/index.html"))

})
//app.use( express.static(__dirname+"/public"))
// app.get('/', function(req, res){
//     res.write( express.static(__dirname+"/public"));
// })
app.use(express.static(__dirname+"/public"))
app.use('/', router)
app.listen(port)
console.log("Listening on port: " + port)