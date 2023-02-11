const Router = require("express").Router()

//Get liked songs
Router.get('/getLikedSongs/:user', async (req, res)=>{

    const user = req.params.user;
    try{
        const getLikedSongs = await getLikedSongs(user);
        
        // CHECK THAT getLikedSongs != 0

        if (getLikedSongs.rowCount === 0){

            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });

        }

        // RETURNING THE DATA OF getLikedSongs
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getLikedSongs.rows
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



//Post add song to tag from user

Router.post('/addSongToTag/:song_id/:tag_name/user_id', async (req, res) => {
    const {song_id, tag_name, user_id} = req.params;
    try{
    //Update songs Array of tag
    const updateSongsArray = db.query('UPDATE tags SET tag_songs = ARRAY_APPEND(tag_songs, $1) WHERE tag_name = $2 AND tag_user = $3;', [song_id, tag_name, user_id]);


    } catch(err) {
        res.status(400).json({
            "statusMessage":"Hubo un error"
        })
    }

})

//create new tag

Router.post('createNewTag/:user:tag', async (req, res)=>{
    const {user, tag} = req.params

    //check if tag already exists
    const checkTag = await db.query('SELECT tag_name from tags where tag_name = $1 AND $2 = tag_user;', [tag, user]);
    
    if (checkTag == null) {
        const newTag = await db.query('INSERT INTO tags (tag_name, tag_user, tag_songs) VALUES ($1, $2, $3);', [tag, user]);

    } else {
        //aca deberia salir algo que dice "tag already exists"
        return res.status(204).json({
            statusMessage: 'failed',
            errorMessage: 'No Content'
        });
    }
});




//Post remove song from tag of user
Router.delete('/deleteSongFromTag/:user/:tag/:song', async (req, res)=>{

    const user = req.params.user;
    const tag = req.params.tag;
    try{

        // GET all songs with the specified tag
        const getAllSongsWTag = await db.query('SELECT tag_songs FROM tags where $1 = ANY(tag_user) AND tag_name = $2', [user,tag ]);

       // CHECK THAT getAllSongsWTag != 0

       if (getAllSongsWTag.rowCount === 0){
        return res.status(204).json({
            statusMessage: 'No songs with that tag'
        });
    }

        // GET an array with the song deleted from the original array with all songs with that tag
        const getArrayWDeletedTag = await db.query('SELECT array_remove($1,$2);', [getAllSongsWTag, user]);


        //Update the array in DB with new Array without the deleted song
        const updateArrayWDeletedSong = await db.query('UPDATE tags set tag_songs = $1 WHERE $2 = ANY(tag_user) AND tag_name = $3 ;', [getArrayWDeletedTag, user, tag ]);

        // RETURNING THE A succesfull message
        
        return res.status(200).json({
            statusMessage:'success',
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

//Get Track Audio Features

Router.get('/audioFeatures/:track_id', async (req, res) => {

    const {track_id} = req.params;
    
    try{
        const getTrackAudioFeatures = await getTrackAudioFeatures(track_id);
        
        // CHECK THAT Length of getTrackAudioFeatures != 0

        if (Object.keys(getTrackAudioFeatures).length === 0 ){
            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No features for that song.'
            });
        }

        // RETURNING the audio features of the song
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getTrackAudioFeatures
        });

    }
    catch(error){

        // IF THERE IS AN ERROR

        return res.status(400).json({
            statusMessage: 'failed',
            errorMessage: 'Hubo un error.'
        });
    }

})