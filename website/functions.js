/*
Example of user creation:
        INSERT INTO SeniorProject.User ( Type, CreationDate, Username, Password)
        VALUES ('admin', curdate(), 'testAdmin', '1234')

*/

var bcrypt = require('bcrypt')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: "senior-project.cvmprfnml7ye.us-east-2.rds.amazonaws.com",
    user: "standard-user",
    password: "KennesawState!!",
    database: "SeniorProject"

})
module.exports = {
    login : async (username, password, myCallback) => {
        
        var queryResults = null
        // Catch NULL values
        if( username == "" || password == ""){
            myCallback( {Message: "ERROR | Entered information is null." , Status: -1})
            return;
        }

        //TO DO: Protection against sql injection attacks

        // Attempt to hash password and store in user table
        try{
            var query = "SELECT Username, Password FROM SeniorProject.User WHERE Username=\"" + username + "\";"
    
            // Attempt to execute a query to the database
            connection.query( query, async (err, res, fields) => {
                if( err ){
                    myCallback( {Message: err , Status: -1})
                    return;
                }
                // If not results, then the username was not found
                if( res[0] == null){
                    myCallback( {Message: "ERROR | User: " + username + " does not exist." , Status: -1})
                    return;

                }
                // Else, if the username was found, authenticate password
                else{
                    console.log("INFO | Username found...")
                    try{
                        // Use bcyrpt to compare input password against DB password for corresponding username.
                        if( await bcrypt.compare(password, res[0].Password) ){
                            myCallback( {Message: "INFO | User " + username + " was authenticaed." , Status: 1})
                        }
                        else{
                            myCallback( {Message: "INFO | User " + username + " was not authenticated, due to wrong password." , Status: 0})
                        }
                 
                    } catch(e){
                        myCallback( {Message: e , Status: -1})
                    }
                }

            })

        } catch(e){
            myCallback( {Message: e , Status: -1})
            return;
        }

    },
    register : async (username, password, myCallback) => {

        // Catch NULL values
        if( username == "" || password == ""){
            myCallback( {Message: "ERROR | Entered information is null." , Status: -1})
            return;
        }

        //TO DO: Protection against sql injection attacks

        // Attempt to hash password and store in user table
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)
            var query = 'INSERT INTO SeniorProject.User ( Type, CreationDate, Username, Password ) VALUES ( "Standard", curdate(), \'' + username + '\', \'' + hashedPassword+ '\' );'
    
            // Attempt to execute a query to the database
            connection.query( query, function(err, res, fields){
                if( err ){
                    myCallback( {Message: err , Status: -1})
                    return;
                }
                else{
                    myCallback( {Message: "INFO | User: " + username + " successfully created." , Status: 1})
                    return;
                }

            })
        } catch(e){
            myCallback( {Message: e , Status: -1})
            return;
        }

        
    }
}