//Setup 
const express = require('express');
require('dotenv').config();
const playlists = require('./Routes/Playlists/playlists') ;
const tracks = require('./Routes/Tracks/tracks');
const tags = require('./Routes/Tags/tags');

//Setting up the Server
const Server = express();
Server.use(express.json());
Server.use('/api/v1/playlists', playlists);
Server.use('/api/v1/tracks', tracks);
Server.use('/api/v1/tags',tags);

Server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});