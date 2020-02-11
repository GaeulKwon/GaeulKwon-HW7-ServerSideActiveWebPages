var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [];
app.visitorArray = [];
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});



// upLoadData page 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2&date=1941
app.get('/thingsToDo', function(req, res) {
    let toDo = req.param('toDo');
    let date = req.param('date');
    if(toDo != null){
        let toDoList = {
            toDo: toDo,
            date: date
        }
    app.dataArray.push(toDoList);
    }
    res.render('pages/thingsToDo', { 
        dataArray: app.dataArray
     });
  });

   
app.get('/visitorLog', function(req, res) {
    let name = req.param('name');
    let message = req.param('message');
    if(name != null){
        let aMessage = {
            name: name,
            message: message
        }
    app.visitorArray.push(aMessage);
    }
    res.render('pages/visitorLog', { 
        visitorArray: app.visitorArray
     });
  });


// doing this in www bin file to make Azure happy
//app.listen(443);  // not setting port number in www.bin, simple to do here
//console.log('443 is the magic port');

module.exports = app;
