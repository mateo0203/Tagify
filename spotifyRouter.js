const axios = require("axios");
const SPOTIFY_CREATE_PLAYLIST_URL = 'https://api.spotify.com/v1/users/gerogorostiaga/playlists';
const ACCESS_TOKEN = 'BQDFhtTRlufhiIhH3_2elvQr_mxUmHaSvAXeRX3kI82ygWxcE9NzRFk9I5drXNABsmut61TTVfAIlSEFUfKZ4vkL1zMV4cuOY6XxAWfRaIcUNr-HI6l8MM6uBdBttA6jQZe8t-jzkzAriUvTWzFD8BdTS57dPGjpHjmuQomp_jLbu7i9TUc9JOVXO36auzcJ2fDkcPI1mNWz6xD-7pTeozLlsKpColaBaKNLs5WwQ4D4mGSF-bI';
const express = require("express");
const router = express.Router();


async function createPlaylistOnSpotify(name, public) {
  console.log("funciona")
  try {
        const response = await axios.post(SPOTIFY_CREATE_PLAYLIST_URL, {
         name: name,
            public: public
       }, {
            headers: {
               Authorization: `Bearer ${ACCESS_TOKEN}`       }
        });
       return response.data;
    } catch (error) {
        console.error(error);
    }
    console.log("funciona");
}

router.post("createPlaylist", async (req, res) => {
    const name = req.body.name;
    const public = req.body.public;

    const result = await createPlaylistOnSpotify(name, public);

    res.json({
        success: true,
        data: result
    })

});