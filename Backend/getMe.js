//PRACTICE CLASS
const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDZEPH3YjfIPiKwAqtC3GYoXIOpFl703HZS0_wh6f1EzGDWA1qVc-254EXyTxo01lH5g2VZIKNlg5IEqStEcyss2kCntoL5TrIVTLOANinnc4ns6tkIZYBElgoWezvD2hEE_bkCsyPfgS5yPoPXvqMnzEAygw4siWzsBqJMwKrbkQDE5td-rm_VSF5_gct4qtaNPHloyUihYW95LVhPxnNxdkhfuj-IqPwHMtwSZIvZIsD0pv8VGe4ehbUDKoZAc9_ebuHFG7hSq8duOBWUiQ1-3pGiRotNJLVFeCHh_ufob0pWnLs9_qRlucAoenwn8YJarqlv1kfAdcChq6SMQ1QZGg";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
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
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();