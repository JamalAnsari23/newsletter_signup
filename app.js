const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function(req, res){
    const firstName = req.body.f_name;
    const lastName = req.body.l_name;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/aa7bf34ad8";
    const options = {
        method: "POST",
//         auth: "Jamal1:7bb59d3a0c5bb41691301016dd8e1f7c-us21"
        auth: "Jamal1:3b33928fb345ccc0fa7387aaccf65018-us21"
    }
    const request=https.request(url,options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    // console.log("Name = " + firstName + lastName + " & email = " + email);
});

    app.post("/failure", function(req, res){
        res.redirect("/");
    })

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})
// This is mailchimp apikey
// 7bb59d3a0c5bb41691301016dd8e1f7c-us21
// audience id 
// aa7bf34ad8
