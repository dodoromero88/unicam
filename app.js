console.log("Start the server");


const express = require('express');
var bodyParser = require('body-parser');
//const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Ejs uses by default the views in the 'views' folder
 
app.get('/',function(req,res){
    res.render('index',{user:"Great User",title:"homepage"});
});
*/

//HANDLERS  
app.get('/',function(req,res){
    res.render('login',{});
});

app.post('/login', function (req,res) {
    //console.log(req);
    console.log(req.body);
    user = req.body.email;
    password = req.body.password;
    session = req.session;
    console.log(user,password);
    return null;
    
});

// Initialize the server
app.listen(3000,function(){
    console.log("Live at Port 3000");
});