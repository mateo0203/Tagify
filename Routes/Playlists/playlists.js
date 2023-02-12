const Router = require("express").Router();
const {getUserPlaylists, getPlaylistTracks, getMyData} = require("../../Backend/spotifyApi");
const db = require('../../DB');


//Get User Playlists

Router.get('/getPlaylists/', async (req, res)=>{
    try{
        const getPlaylists = await getUserPlaylists();
        
        // CHECK THAT getPlaylists != 0

        if (getPlaylists.length === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'The user has 0 playlists'
            });

        }

        // RETURNING THE DATA OF getPlaylists
        
        return res.status(200).json({
            statusMessage:'success',
            playlists: getPlaylists
        });

    }
    catch(error){

        // IF THERE IS AN ERROR

        return res.status(400).json({
            statusMessage: 'failed',
            errorMessage: error
        });
    }
});

//GET Playlist tracks

Router.get('/getPlaylistTracks/:playlist', async (req, res)=>{

    const playlist_id = req.params.playlist;

    try{

        const getTracks = await getPlaylistTracks(playlist_id);
        
        // CHECK THAT getTracks != 0
        if (getTracks.length === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });

        }

        // RETURNING THE DATA OF getTracks
        
        return res.status(200).json({
            statusMessage:'success',
            tracks: getTracks
        });

    }
    catch(error){

        // IF THERE IS AN ERROR

        return res.status(400).json({
            statusMessage: 'failed',
            errorMessage: 'Hubo un error.'
        });
    }
});


//Get Filtered Playlists Tracks

Router.get('/getFilteredPlaylistTracks/:playlist/:tag_id', async (req, res)=>{

    const playlist_id = req.params.playlist;
    const tag_id = req.params.tag_id;

    try{

        const getTracks = await getPlaylistTracks(playlist_id);
        let pTracksId = [];

        for(let i = 0 ; i < getTracks.length ; i++) {
            pTracksId.push(getTracks[i][2])
        }
        const user_id = await getMyData();
        
        // CHECK THAT getFilteredTracks != 0

        if (getTracks.length === 0){
            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });
        }
        let getTracksWTag = await db.query('SELECT tag_tracks FROM tags where $1 = tag_user AND tag_id = $2', [user_id, tag_id])

        // CHECK THAT getTracksWTag.length != 0
        if (getTracksWTag.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });
        }

        //Get tracks that are in both lists
        getTracksWTag = getTracksWTag.rows[0].tag_tracks;
        getTracksWTag.sort();
        pTracksId.sort();

        //print both lists
        console.log(getTracksWTag + " This is are all the songs from the tag")
        console.log(pTracksId + " This is are all the songs from the playlist")


        let filteredTracks = [];
        let ptIndex = 0;
        let stIndex = 0;
        while(pTracksId.length > ptIndex && getTracksWTag.length > stIndex) {
            if(getTracksWTag[stIndex] > pTracksId[ptIndex]) {
                ptIndex++;
            } else if(getTracksWTag[stIndex] < pTracksId[ptIndex]){
                stIndex++;
            } else {
                filteredTracks.push(getTracksWTag[stIndex]);
                stIndex++;
                ptIndex++;
            }
        }

        // CHECK THAT getTracksWTag.length != 0
            if (filteredTracks.length === 0){
                return res.status(204).json({
                    statusMessage: 'No tracks for that tag',
                });
                }

        // RETURNING THE DATA OF getTracks
        
        return res.status(200).json({
            statusMessage:'success',
            filteredTracks: filteredTracks
        });

    }
    catch(error){

        // IF THERE IS AN ERROR
        console.log(error)
        return res.status(400).json({
            statusMessage: 'failed',
            errorMessage: 'Hubo un error.'
        });
    }
});

module.exports = Router;