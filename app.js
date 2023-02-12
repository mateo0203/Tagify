//Setup 
const express = require('express');
require('dotenv').config();
const playlists = require('./Routes/Playlists/playlists') ;
const tracks = require('./Routes/Tracks/tracks');
const tags = require('./Routes/Tags/tags');
const spotify = require('./Routes/Spotify/generateSpotifyToken')
const cors = require("cors");



//Setting up the Server
const Server = express();
Server.use(cors());
Server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

Server.use(express.json());
Server.use('/api/v1/playlists', playlists);
Server.use('/api/v1/tracks', tracks);
Server.use('/api/v1/tags',tags);
Server.use('/api/v1/spotify', spotify);


Server.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});