/**
 * gotten from https://github.com/thelinmichael/spotify-web-api-node
 * This example is using the Authorization Code flow.
 *
 * In root directory run
 *
 *     npm install express
 *
 * then run with the followinng command. If you don't have a client_id and client_secret yet,
 * create an application on Create an application here: https://developer.spotify.com/my-applications to get them.
 * Make sure you whitelist the correct redirectUri in line 26.
 *
 *     node access-token-server.js "<Client ID>" "<Client Secret>"
 *
 *  and visit <http://localhost:3000/login> in your Browser.
 */
const SpotifyWebApi = require('spotify-web-api-node');
const Router = require("express").Router();
const fs = require('fs')
const axios = require('axios');




const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'http://localhost:4000/api/v1/spotify/callback',
  clientId: '843c81a042144826bee6bac842578aa3',
  clientSecret: '4f082ea22777440d850fc5fd511acdb6'
});


Router.get('/login', (req, res) => {
    console.log("llego")
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

Router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

Router.get('/callback', (req, res) => {
    spotifyApi.createAuthorizeURL(scopes);
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});


module.exports = Router;