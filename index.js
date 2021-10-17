const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

//Code related to mongodb
const db = 'mongodb://localhost/url-shortner';

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
    if (key.startsWith("http://")) {
        return "http://slicedurl.herokuapp.com/" + value;
    } else if(key.startsWith("https://")) {
        return "https://slicedurl.herokuapp.com/" + value;
    } else if(key.startsWith("ftp://")){
        return "ftp://slicedurl.herokuapp.com/" + value;
    } else {
        console.log("Oops ! Some error occured.");
    }
}

//It will render for the very first time
app.get('/', (req, res)=>{
    res.render("index.pug")
});

app.get('/addNew', (req, res)=>{
    URL.find(function(err, urls) {
        if(err) {
           console.log(err);
        } else {
            res.render("addNew.pug", {urls: urls});
        }
    })
});

//redirecting to LONG URL when short url is entered
app.get("/:value", (req, res) => {
    value = req.url.slice(1);
    URL.findOne({uniqueCode: value}, function(err, docs) {
        if(err) {
            console.log(err); 
        } else {
            key = docs.urlLong;
            res.status(301).redirect(key);
        }
    });
});

app.post('/', (req, res)=>{
    const url = req.body.url;
    let key = checkURL(url);
    let value;

    //some shit
    URL.findOne({urlLong: key}, function(err, docs) {
        if(err) {
            console.log(err); 
        } else if(docs) {
            value = docs.uniqueCode;
            let finalURL = getFinalURL(key, value);
            res.status(200).render('index.pug', {finalURL});
        } else {
            // mongoose
            value = getRandom();
            let finalURL = getFinalURL(key, value);
            res.status(200).render('index.pug', {finalURL});
            const mong = new URL ({
                urlLong: key,
                uniqueCode: value
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