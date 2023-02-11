const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAPA1Umo9utG4BSJAW7xm5fqjsWbXwpzo4qFQ0mlnDchHuJn2Mi-tksS2bgotsgxkeAY927N2-0bHahld57Y__sSHbRh4a2k_OB8A93Bk-YGVWyfHCju-hvWEK8X9XVVicv4__N3d4pNcCx4tTEKdWUrwIljqlb68IZt75rXnLWifCC48zFP-CcuNN9R9t-e3-sj-3iybSxgxRsV4vEBFCz_BfFz1ZhOPNKE68uTW1YF6__V2ZOdO5Si7XWPu35M0CyyfxeRQC8-L2wUKE8FpnCciAGVfpV6I3N1-pNNVekggL2OqCa1H8x3N7qEdyZP6_SIqrjzLssO4igvc2UKKVvtw";

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