

const fs = require('fs')
const url = require('url')
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const functions = require('./functions.js')


const app = express()
const router = express.Router();    
app.use(express.urlencoded());

const port = 3001


// Pages that are being hosted
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/public/index.html"))

})

router.get('/registration', function(req, res){
    res.sendFile(path.join(__dirname+"/public/registration.html"))

})

router.get('/reporting', function(req, res){
    res.sendFile(path.join(__dirname+"/public/reporting.html"))

})

// POST requests to server

// Used to login a user, authenticates username and password
router.post('/login', async (req, res) => {
    functions.login(req.body.username, req.body.password, function(result){
        console.log(result.Message)
        // If the password was authenticated, redirect to reporting
        if( result.Status == 1){
            console.log( "INFO | Redirect to reporting")
            res.redirect('/reporting')
        }
        // If the password was wrong, redirect to login
        else if ( result.Status == 0){
            res.redirect('/')
        }
        // If there was an error status, redirect to login
        else if ( result.Status == -1){
            res.redirect('/')
        }

    }) 

})

// Used to register a new user,  check if username is already in table, hashs password, and stores information in DB
router.post('/register', async (req, res) => {
    functions.register(req.body.username, req.body.password, function(result){
        console.log( result )
        console.log( result.Message + "\n" + result.Status )

    }) 
    res.redirect('/')

})


// router.post('', async(req, res) => {
    
//     res.sendFile(path.join(__dirname+"/public/index.html"))
//     const salt1 = await bcrypt.genSalt();
//     console.log(req.body.password)
//     const hashedPassword1 = await bcrypt.hash(req.body.password, salt1)

//     const salt2 = await bcrypt.genSalt();
//     const hashedPassword2 = await bcrypt.hash(req.body.password, salt2)
//     console.log( "Waiting")
//     console.log(hashedPassword1)
//     console.log(hashedPassword2)
//     try{
//         if( await bcrypt.compare(hashedPassword1, "1234") ){
//             console.log( "Correct Password")
//         }
//         else{
//             console.log( "Incorrect Password")

//         }
//     } 
//     catch{
//         console.log( "Incorrect Password")
//     }
//     console.log( "End")


// });


// router.post('/auth', function(req, res){
//     res.sendFile(path.join(__dirname+"/public/index.html"))
//     var date = new Date()
//     console.log("INFO | Login request: \n\tUsername: " + req.body.username + "\n\tDate: " +  date)
//     functions.login(req.body.username, req.body.password, function(status){
//         console.log("Status: " + status)
//         if( status == -1){
//             console.log( "You failed the login!")
//         }
//         if( status == 1) {
//             console.log( "Welcome!")
//         }
//     });

// })
//app.use( express.static(__dirname+"/public"))
// app.get('/', function(req, res){
//     res.write( express.static(__dirname+"/public"));
// })

app.use(express.static(__dirname+"/public"))
app.use('/', router)
app.listen(port)
console.log("Listening on port: " + port)