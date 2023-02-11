const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = getToken();
const axios = require('axios');
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getLikedSongs() {
    (async () => {
      const me = await spotifyApi.getMe();
      //console.log(me.body); //show user data to terminal
      getUserPlaylistsHelper(me.body.id);
    })().catch(e => {
      console.error(e);
    });
  }

//GET MY LIKED SONGS
async function getLikedSongsHelper() {
    const data = await spotifyApi. getMySavedTracks();
    console.log(data.body.href);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

    //const jsonResponse = await axios.get(data.body.href, config);
    //const jsonData = jsonResponse.data;
    //console.log(jsonData);

    //const jsonResponse = await axios.get('https://api.deezer.com/artist/27');
    //const jsonData = jsonResponse.data;
    //console.log(jsonData);
  
    //return lista;
  }

  getLikedSongsHelper()