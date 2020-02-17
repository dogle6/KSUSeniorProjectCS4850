// This is an example of how to encrpt user passwords and how to compare passwords against encrypted verions to ensure they have the right password
var bcrypt = require('bcrypt')


var pass = "1234";
var user = "test";

var test =  async () =>{
    const pass = "1234"
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt)

    try{
        console.log( await bcrypt.compare(pass, hashedPassword))
        console.log(salt)
        console.log(pass)

    } catch(e){
        console.log( "ERROR | " + e )
    }

}

test() 