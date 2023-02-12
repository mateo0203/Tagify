const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const spotifyApi = new SpotifyWebApi();

//GET TOKEN
function getToken() {
    const token = "BQC6bygcEP57N87Ye_m2zfB87uW8en44oxjUSgAFicVghzXkWqozQbsPhCSWyY8hYdUwe9Dytk2yJDa3jiagVngwLymhbwgy3i0JXvA6cWrUFOCgIwC3Nh2xA0n67k5WB45Z08L2I2nln_q9ByEFKCgTDqEbIFs8EtbZqhwvHq10HvZHdOwoWFWT2LTD4JnQoRypyMPyVXjwff0MR9lTRamCtpgTK1cgrw-vMpVI1M0-0Fh5_ZgJFTmMx620mnFfkYvdDsS3rFoCaLXOqOWelKdfpz8UL2Ng-h5YwNm8pNN0MtZxgV2uuOnAPWldKka_7KlADZuKRXpr1i_lwaSBRqH2Vw";
return token;
}

const token = getToken();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
async function getMyData() {
      const me = await spotifyApi.getMe();
      return me.body.id;
      ;
  }

//GET MY LIKED TRACKS
async function getLikedTracks() {
  const data = await spotifyApi. getMySavedTracks();
  //console.log(data.body.href);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=30';
  const jsonResponse = await axios.get(url, config);
  const jsonData = jsonResponse.data;

  let trackInfo = [];
  for (let track_obj of jsonData.items) {
    trackInfo.push([track_obj.track.artists[0].name, track_obj.track.name, track_obj.track.id]);
  }
  console.log(trackInfo)
  return trackInfo;
}
  
// GET TRACK AUDIO FEAUTURES
async function getAudioFeatures(trackid) {
  const url = 'https://api.spotify.com/v1/audio-features/'+ trackid;
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  const jsonResponse = await axios.get(url, config);
  const a = jsonResponse.data;
  delete a.type;
  delete a.id;
  delete a.uri;
  delete a.track_href;
  delete a.analysis_url;
  //console.log(a);
  
  return a;
}

//GET PLAYLIST TRACKS
async function getPlaylistTracks(playlistId) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  let tracks = [];
  var lista = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push(track);
    lista.push([track.name, track.artists[0].name,track.album.name,track.id]);
    //console.log(lista);
    //break;
    //console.log(track.album.name);
  }
  //console.log("dmskmdksmkkkkkkkk")
  
  return lista;
}
  
//GET USER PLAYLISTS
//return playlist name, playlist id, and first image (not multiple)
async function getUserPlaylists() {
  const data = await spotifyApi.getUserPlaylists()
  let playlists = [];
  var lista = [];
  for (let playlist of data.body.items) {
      lista.push([playlist.name, playlist.id,playlist.images[0].url]);
      //console.log(playlist.images[0].url)
      //console.log(playlist.images)
  }
  //console.log(lista);
  return lista;
}


//FUNCTION CALLS
  //getUserPlaylists();
  //getPlaylistTracks('357Q0F7H8iK0nB23o5MZKY');

  //getLikedTracks()
  //getAudioFeautures('2lLG56qpLP3UbcLuzMvkWX')

  //getMyData();

  module.exports.getUserPlaylists = getUserPlaylists;
  module.exports.getPlaylistTracks = getPlaylistTracks;
  module.exports.getLikedTracks = getLikedTracks;
  module.exports.getMyData = getMyData;
  module.exports. getAudioFeatures= getAudioFeatures;