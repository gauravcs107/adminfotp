
//classes
var Team = require('./public/src/Team.js');
var Geolocation = require('./public/src/GeoLocation.js');
var notification = require('./notification.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var contants = require('./public/src/contants/Contants');
var fs = require('fs');
const teamLogosFolderAssets = './public/assets/teamsLogos';
var requestURL = "http://localhost:5000/";
//var requestURL = "https://damp-river-98604.herokuapp.com/"
var teamIconsURL = "assets/teamsLogos/";
var team1;
var team2;
var teamsLogosFiles  = [];
var teamNames = [];
var geolocation;// = new Geolocation(0,0); 

fs.readdir(teamLogosFolderAssets, (err, files) => {
    files.forEach(file => {
    //   console.log(file);
      teamsLogosFiles.push(file.toString());
      var team_name = (file.toString()).split(".")[0];
    //   console.log(team_name);
      teamNames.push(team_name);
    });
});

// app.use(bodyParser.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 5000;
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  contants.GameTypes.forEach(element => {
    //  console.log(element);
  });
//   C:\Users\rohanbhatia\Documents\FOTP_server\public\assets\teamsLogos\arizona-cardinals.png
  var url = teamIconsURL + "arizona-cardinals.png";
  team1 = new Team("arizona cardinals",url);
  team2 = new Team("arizona cardinals",url);
  geolocation = new Geolocation(0,0); 

});
app.get('/gametypes', (req, res) => {
    
    var gametypes_arr = contants.GameTypes;
    var response  = {
        gametypes : gametypes_arr
    };
    res.send(response);
});

app.get('/teams', (req, res) => {

    var teams  = {
        team_1 : team1,
        team_2 : team2
    };
    res.send(teams);
});

app.get('/teamNames', (req, res) => {
    res.send(teamNames);
});

app.get('/teamNames', (req, res) => {
  res.send(teamNames);
});

app.get('/geolocation', (req, res) => {
  console.log("GET geoloction : "  + JSON.stringify(geolocation) );
  res.send(JSON.stringify(geolocation));
});

app.post('/geolocation', (req, res) => {
  console.log(req.body);
  var geolocation_ = req.body;
  geolocation.setLatLong(geolocation_.latitude,geolocation_.longitude);
  console.log(geolocation);
  res.send(JSON.stringify(geolocation));
});
app.post('/push_notifications', (req, res) => {
  notification.sendThrowFlagNotification();
  //var geolocation_ = req.body;
  //geolocation.setLatLong(geolocation_.latitude,geolocation_.longitude);
  //console.log(geolocation);
  //res.send(JSON.stringify(geolocation));
});

app.post('/team1', (req, res) => {
    console.log(req.body);
    var team = req.body;
    team1 = new Team(team.name,team.imageURL);
    console.log(team1);
    res.send(JSON.stringify(team1));
});

app.post('/team2', (req, res) => {
    console.log(req.body);
    var team = req.body;
    team2 = new Team(team.name,team.imageURL);
    res.send(JSON.stringify(team2));
});
app.post('/assets', (req, res) => {
    console.log(req.body.data);
    switch(req.body.data){
        case "Sphere":
            break;
        case "Cube":
            break;    
    }
    res.send("asset db");
});





// Listen to the App Engine-specified port, or 8080 otherwise




