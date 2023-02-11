const Router = require("express").Router();
const {getUserPlaylistsNames} = require('.../getMe.js');


//Get playlists from user

Router.get('/getPlaylists/:user', async (req, res)=>{

    const user = req.params.user;
    try{
        const getPlaylistNames = await getUserPlaylistsNames(user);
        
        // CHECK THAT getPlaylistNames != 0

        if (getPlaylistNames.rowCount === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });

        }

        // RETURNING THE DATA OF getPlaylistNames
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getPlaylistNames.rows
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

//GET all songs from Playlist

Router.get('/getSongsFromPlaylist/:user/:playlist', async (req, res)=>{

    const user = req.params.user;
    const playlist = req.params.playlist;

    try{
        const getSongs = await getUserPlaylistSongs(playlist_id);
        
        // CHECK THAT getSongs != 0

        if (getSongs.rowCount === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });

        }

        // RETURNING THE DATA OF getSongs
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getSongs.rows
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


//Get songs from playlist with tag filter from user

Router.get('/getFilteredSongsFromPlaylist/:user/:playlist/:tag', async (req, res)=>{

    const user = req.params.user;
    const playlist = req.params.playlist;
    const tag = req.params.tag;

    try{
        const getPlaylistSongs = await getUserPlaylistSongs(playlist_id);

        
        // CHECK THAT getFilteredSongs != 0

        if (getPlaylistSongs.rowCount === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });
        }

        const getSongsWTag = await db.query('SELECT tag_songs FROM tags where $1 = ANY(tag_user) AND tag_name = $2', [user, tag]);

        // CHECK THAT getSongsWTag.length != 0
        if (getSongsWTag.rowCount === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });
        }

        //Get songs that are in both lists

        getSongsWTag.sort();
        getPlaylistSongs.sort();
        let filteredSongs = [];

        //for (let i = 0; i < )

        // RETURNING THE DATA OF getSongs
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getSongs.rows
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