const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQC_-mgrhCiwu0RzshP5GZxPiF-0MIyNEXEFOXEY-OZNnkEj-5Cq2g-IDtVo9_L8s4besIiuLVV1uGpagDDps_boGho3IH3IOWRCWAVHwCNDpN9XFlrMjP1O-XjYWXpUra9J-mqIZGzXXmzrySxABWEf0Ee_XObuVgCCxLSRsr5aiarzZ3oiRQj75UCGlfg9OHJhHZKRX17PcoZxXjxl0yXyWcljRCnDQfDKJOUVX_hMZKJpHvspNwFnSGFWr8VKZuyTWj3l911pWV2omfWo3ksruh_YsJy-VKwMQFXtK4ZFAwTpHMp0lR-ORVYI3niMMNaQGHC2QVluVVr-yJ_AtH65UQ";
const axios = require('axios');

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

/**
 * Gets user personal information
 * GET MY PROFILE DATA
 */
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    //console.log(me.body);
    return me.body;
  })().catch(e => {
    console.error(e);
  });
  
}
//getMyData();

