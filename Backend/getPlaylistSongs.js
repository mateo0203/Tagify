const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQC_-mgrhCiwu0RzshP5GZxPiF-0MIyNEXEFOXEY-OZNnkEj-5Cq2g-IDtVo9_L8s4besIiuLVV1uGpagDDps_boGho3IH3IOWRCWAVHwCNDpN9XFlrMjP1O-XjYWXpUra9J-mqIZGzXXmzrySxABWEf0Ee_XObuVgCCxLSRsr5aiarzZ3oiRQj75UCGlfg9OHJhHZKRX17PcoZxXjxl0yXyWcljRCnDQfDKJOUVX_hMZKJpHvspNwFnSGFWr8VKZuyTWj3l911pWV2omfWo3ksruh_YsJy-VKwMQFXtK4ZFAwTpHMp0lR-ORVYI3niMMNaQGHC2QVluVVr-yJ_AtH65UQ";
const axios = require('axios');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

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
    var lista = [];
  
    for (let track_obj of data.body.items) {
      const track = track_obj.track
      tracks.push(track);
      lista.push([track.name, track.artists[0].name]);
      //console.log(track.name + " : " + track.artists[0].name)
    }
    console.log(lista);
    return lista;
  }
  

  //getPlaylistTracks('357Q0F7H8iK0nB23o5MZKY');

  getPlaylistTracks('3dGo9ymIJJeJK46mrQXAcw');
  
