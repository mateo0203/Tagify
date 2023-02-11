/**
 * Gets songs given a playlist ID input
 * 
 */

const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = getToken();
const axios = require('axios');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

  async function getPlaylistTracks(playlistId, playlistName) {

    const data = await spotifyApi.getPlaylistTracks(playlistId, {
      offset: 1,
      limit: 100,
      fields: 'items'
    })

    let tracks = [];
    var lista = [];
  
    for (let track_obj of data.body.items) {
      const track = track_obj.track
      tracks.push(track);
      lista.push([track.name, track.artists[0].name]);
    }
    //console.log(lista);
    return lista;
  }
  

  //getPlaylistTracks('357Q0F7H8iK0nB23o5MZKY');

  //getPlaylistTracks('3dGo9ymIJJeJK46mrQXAcw');
  
