/*jshinSt esversion: 6 */
// Requirements
// require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// Variables for liri
var spotify = new Spotify(keys.spotify);

var fs = require("fs");



// Liri Spotify Commands


