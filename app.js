console.log("Start the server");


const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

const app = express();

//object  utente static to admin
const admin_user={
    user:"admin@admin.it",
    password:"admin"
}

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    name: 'session',
    keys: ['username']
}))
/**
 * Ejs uses by default the views in the 'views' folder
 
app.get('/',function(req,res){
    res.render('index',{user:"Great User",title:"homepage"});
});
*/

var checkAuthentication = function(req,res,next) {
    if(req.session && req.session.admin_user){
        next();
    }
    else{
        //user doesn't have access, return an http 401 response
        res.redirect("/");
    }
};



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
    console.log("session",session);
    if (user == admin_user.user && password == admin_user.password) {
        session.admin_user = admin_user;
        console.log("is authenticated");
        res.redirect('/students');
    } else {
        res.redirect('/');
    }

});

app.get('/students',checkAuthentication, function(req,res) {
    res.render('students',admin_user);
});

// Initialize the server
app.listen(3000,function(){
    console.log("Live at Port 3000");
});