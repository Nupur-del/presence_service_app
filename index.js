const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(3000, function(){
    console.log("Server is up and running")
})


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})  

app.post("/",function(req,res){
     const email = req.body.Email;
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;

     var data = {
        members : [
            {
            email_address: req.body.Email,
            status : "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
          }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us18.api.mailchimp.com/3.0/lists/c515bfbe07";
    const options = {
        method : "POST",
        auth : "nupurs:9af9a4255f4d29cb849481c3810528c6-us18"
    }
    
    const request1 = https.request(url,options,function(response){
        response.on("data",function(data){
            if(response.statusCode === 200){
               res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
            console.log(JSON.parse(data));
        })
    })
    
    request1.write(jsonData);
    request1.end();

});

app.post("/failure",function(req,res){
   res.redirect("/");

});

// 9af9a4255f4d29cb849481c3810528c6-us18

// LIST ID
// c515bfbe07
