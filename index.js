const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

//Code related to mongodb
const db = 'mongodb+srv://admin-pranjal:Test123@cluster0.iew4o.mongodb.net/url-shortner';

mongoose.connect(db, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database is connected");
}).catch(err => console.log("Database connection failed!" + err));

const urlSchema = new mongoose.Schema({
    urlLong: String,
    uniqueCode: String
});

const URL = mongoose.model("Url", urlSchema);

//Utility functions
function checkURL(url){   
    let protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");     
    if(!protocol_ok) {         
        newurl = "http://"+url;         
        return newurl;     
    } else {
        return url;     
    }
}
function getRandom(){    
    var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);    
    return random_string;
}
function getFinalURL(key, value) {
    if (key.startsWith("http://")) { // remove https condition when deploying on heroku
        return "http://slicedurl.herokuapp.com/" + value;
    } else if(key.startsWith("https://")) { // uncomment out these statements as well
        return "https://slicedurl.herokuapp.com/" + value;
    } else if(key.startsWith("ftp://")){
        return "ftp://slicedurl.herokuapp.com/" + value;
    } else {
        console.log("Oops ! Some error occured.");
    }
}


// it will show the entries stored in the database
app.get('/showdb', (req, res)=>{
    URL.find(function(err, urls) {
        if(err) {
           console.log(err);
        } else {
            res.render("showdb.pug", {urls: urls});
        }
    })
});

//It will render for the very first time
app.get('/', (req, res)=>{
    res.render("index.pug")
});

//redirecting to LONG URL when short url is entered
app.get("/:value", (req, res) => {
    value = req.url.slice(1);
    if (value == 'favicon.ico') {
        res.render("index.pug")
    } else {
        console.log(value);
        URL.findOne({uniqueCode: value}, function(err, docs) {
            if(err) {
                console.log(err + "Enter a valid Short URL"); 
            } else {
                let key = docs.urlLong;
                console.log(key);
                res.status(301).redirect(key);
            }
        });
    }
});

app.post('/', (req, res)=>{
    const url = req.body.url;
    let key = checkURL(url);
    let value;

    
    URL.findOne({urlLong: key}, function(err, docs) {
        if(err) {
            console.log(err); 
        } else if(docs) {
            value = docs.uniqueCode;
            let finalURL = getFinalURL(key, value);
            res.status(200).render('index.pug', {finalURL});
        } else {
            
            value = getRandom();
            let finalURL = getFinalURL(key, value);
            res.status(200).render('index.pug', {finalURL});
            const mong = new URL ({
                urlLong: key,
                uniqueCode: finalURL
            });
            URL.insertMany([mong], function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("New URL successfully saved !");
                }
            });
        }
    });
});

const port = 80;

app.listen(process.env.PORT || port, () => {
    console.log("Server started on port" + port);
});