//PRACTICE CLASS
const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQD4GwgivpsGFlgNI_iYwgWwkpB5v1_QwhLinAUF09hVqKQOAHXT1CK2HmRn8nBE0ExakxXvE0nmGZV8SikITRlHftZKGFVmhDryOKELhjHA-WNrD7jaHHZuaKW7f2RJqk3uZHB98HvI-lKCrQOqpA2Ys0MJH4CH81VWhSBErmPxMsUYpwHhU_gcWKvXbMozPQrHVqPxCmlAvRfgoCILqPECfj1hWbkY2KqDmfWqLFkGmswGqcG5flZ2JFEnT6msa6WZPXR4Aiajm5Bl0BCRhWFTkBnScRGHY9Bf2mgGBtf3lNXsWLN4Y01Bu-0_VGINO6VzcLmKWvGooQJXTYQ3zXSR5w";
const axios = require('axios');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    //console.log(me.body); //show user data to terminal
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    //console.log(playlist.name + " " + playlist.id) //calls playlists
    //console.log(playlist);
    //break;
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    break;
    //console.log(tracks);
/*
    //const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);*/
  }
}

//GET SONGS FROM PLAYLIST

async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  //console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  //console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.href);
    //
    try {
      const response = await axios.get('track.href');
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    break;
    //console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("+---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();
//getPlaylistTracks(playlistId, playlistName)