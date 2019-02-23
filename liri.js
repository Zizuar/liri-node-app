/*jshinSt esversion: 6 */
// Requirements
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');

// Variables for liri
var spotify = new Spotify(keys.spotify);
var argument = process.argv[2];
var stringArgv = process.argv;
var userConcert = "";
var userSong = "";
var userMovie = "";
// var noUser = dowhatitsays()

// capture argv from terminal line and transfer following arguments into empty variables based on position 3[2]. Eventually see if you can expand it into only setting for a specific key. Otherwise simply ignore the unused variable it will create as it will voerwrite later.
for (var i = 3; i < stringArgv.length; i++) {
    if (i > 3 && i < stringArgv.length) {
        userConcert = userConcert + " " + stringArgv[i];
        userSong = userSong + " " + stringArgv[i];
        userMovie = userMovie + "+" + stringArgv[i];
    } else {
        userConcert += stringArgv[i];
        userSong += stringArgv[i];
        userMovie += stringArgv[i];
    }
}
console.log(userConcert, userMovie, userSong);
// console.log(argument)
// Liri Commands utilizing switchcase to determine function intended to run.
switch (argument) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        dowhatitsays();
        break;
    default: console.log(argument); break;
}

// functions activated via the above switch/case
function concertThis() {
    if (userConcert === "") {
        userConcert="MercyMe";
    }       
    var getBiT = "https://rest.bandsintown.com/artists/" + userConcert + "/events?app_id=codingbootcamp";
    axios.get(getBiT).then(
        function (response, err) {
            if (response) {
                var infoBiT = response.data[0]
                var venueName = "Venue Name: " + infoBiT.venue.name;
                var venueLocation = "Venue Location: " + infoBiT.venue.city;
                var playTime = infoBiT.datetime;
                var removeTime = playTime.split('T');
                var venueDate = "Venue Date: " + moment(removeTime[0]).format("MM/DD/YYYY");
                // log all user song requests to log.txt. Should not override the log each time.
                var venueRecord = venueName + "," + venueLocation + "," + venueDate;
                console.log(venueName);
                console.log(venueLocation);
                console.log(venueDate);
                fs.appendFile('log.txt', venueRecord, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else console.log("updated txt file")
                })
            }else{                
                console.log(err);
            }
        }); 
}

function spotifyThisSong() {
    if (userSong === "") {
        spotify.search({
            type: 'track',
            query: 'The Sign Ace of Base',
            limit: 20
        }), function (err, data) {
            var artist = "Artist(s): " + data.tracks.items[0].artists[0].name;
            var songName = "Song Title: " + data.tracks.items[0].name;
            var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;
            var albumName = "Album Name: " + data.tracks.items[0].album.name;
            console.log(artist);
            console.log(songName);
            console.log(previewLink);
            console.log(albumName);
            if (error) {
                console.log("Unable to comply: " + userSong + " : " + err);
            }

            // log all user song requests to log.txt. Should not override the log each time.
            var songRecord = artistName + songName + previewLink + albumName;
            fs.appendFile('log.txt', spotifyRecord, function (err) {
                if (error) {
                    console.log(err);
                }
            });
        };
    }
}

function movieThis() {
    if (userMovie === "") {
    userMovie="Batman";}
    var queryUrl = "http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(function (response, err) {
        console.log(response)
        // console.log(err ? 'Errors occurred: ' + err : "");
        // if (response) {
        //     var infoBiT = response
        //     console.log(infoBiT)
        //     console.log(this.data)
            console.log("Title: " + response.Title);
            console.log("Release Year: " + JSON.parse(data).Year);
            console.log("Rated: " + JSON.parse(this).Rated);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).rottenTomatoesRating);  //need to fix
            console.log("Country/Countries Filmed: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
        // }else{                
            console.log(err);
        }
    );
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", (error, data)); {
        if (error) {
			return console.log("Unable to comply." + error);
		}else{
		var dataArr = data.split(",");
		action = dataArr[0];
        songTitle = dataArr[1];
        var userSong = action + "" + songTitle
		spotifyThisSong();
        }
    }
}