const Router = require("express").Router()
const {getLikedTracks, getAudioFeatures, getMyData} = require("../../Backend/spotifyApi");
const db = require('../../DB');


//Get liked tracks
Router.get('/getLikedTracks/', async (req, res)=>{
    try{

        const getTracks = await getLikedTracks();
        
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
            likedTracks: getTracks
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



//Post add track to tag from user

Router.post('/addTrackToTag/:track_id/:tag_name/', async (req, res) => {
    const {track_id, tag_name} = req.params;
    try{
    
    const user_id = await getMyData();
    //Update tracks Array of tag
    const updateTracksArray = db.query('UPDATE tags SET tag_tracks = ARRAY_APPEND(tag_tracks, $1) WHERE tag_name = $2 AND tag_user = $3 returning *;', [track_id, tag_name, user_id]);

    if (updateTracksArray.rowCount === 0){
        return res.status(204).json({
            statusMessage: 'No track with that tag.'
        });
    } else {
        return res.status(200).json({
            statusMessage: "Successfully added the track"
        })
    }
    
    } catch(err) {
        console.log(err)
        res.status(400).json({
            "statusMessage":"Hubo un error"
        })
    }

})

//create new tag

Router.post('/createNewTag/:tag_name', async (req, res)=>{

    const tag_name = req.params.tag_name
    try {
    const user_id = await getMyData();
    //check if tag already exists
    const checkTag = await db.query('SELECT tag_name from tags where tag_name = $1 AND $2 = tag_user;', [tag_name, user_id]);
    
    if (checkTag) {
        const newTag = await db.query('INSERT INTO tags (tag_name, tag_user, tag_tracks) VALUES ($1, $2, Array[]::text[]) returning *;', [tag_name, user_id ]);

        if (newTag.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'There was an error while creating. Try again'
            });
        } else {
            return res.status(200).json({
                statusMessage: "Successfully created the tag"
            })
        }

    } else {
        //aca deberia salir algo que dice "tag already exists"
        return res.status(204).json({
            statusMessage: 'failed',
            errorMessage: 'Tag already exists'
        });
    }
    }catch(error){
        console.log(error);
        res.status(400).json({
            statusMessage:"Error."
        })
    }
});




//Post remove track from tag
Router.delete('/deleteTrackFromTag/:tag_name/:track_id', async (req, res)=>{

    const tag_name = req.params.tag_name;
    const track_id = req.params.track_id;
    try{
        const user_id = await getMyData();
        // GET all tracks with the specified tag
        const deleteTrack = await db.query('UPDATE tags SET tag_tracks = ARRAY_REMOVE(tag_tracks, $1) WHERE tag_name = $2 AND tag_user = $3 returning *;', [track_id, tag_name, user_id]);

       // CHECK THAT deleteTrack != 0

       if (deleteTrack.rowCount === 0){
        return res.status(204).json({
            statusMessage: 'Track was not deleted'
        });
    }

        return res.status(200).json({
            statusMessage:'success',
        });
        // GET an array with the track deleted from the original array with all tracks with that tag
        //const getArrayWDeletedTag = await db.query('SELECT array_remove($1, $2);', [getAllTracksWTag, track_id]);

        //console.log(getArrayWDeletedTag)
        //Update the array in DB with new Array without the deleted track
        //const updateArrayWDeletedTrack = await db.query('UPDATE tags set tag_tracks = $1 WHERE $2 = ANY(tag_user) AND tag_name = $3 ;', [getArrayWDeletedTag, user, tag ]);

        // RETURNING THE A succesfull message

    }
    catch(error){

        // IF THERE IS AN ERROR
        console.log(error);
        return res.status(400).json({
            statusMessage: 'failed',
            errorMessage: 'Hubo un error.'
        });
    }
});

//select tag from track
Router.get('/getTagsFtrack/:track_id', async (req, res)=>{
    const track_id = req.params.track_id;
    try{
        const user_id = await getMyData();
        const getTags = await db.query('select tag_name from tags where $1 = tag_user AND $2 = ANY(tag_tracks)',[user_id, track_id])
        
        console.log(getTags);
        // CHECK THAT getTags != 0
        if (getTags.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No Content'
            });
        }

        // RETURNING THE DATA OF getTracks
        
        return res.status(200).json({
            statusMessage:'success',
            tags: getTags
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

//Get Track Audio Features

Router.get('/audioFeatures/:track_id', async (req, res) => {

    const {track_id} = req.params;
    
    try{
        const getTrackAudioFeatures = await getAudioFeatures(track_id);

        // CHECK THAT Length of getTrackAudioFeatures != 0

        if (Object.keys(getTrackAudioFeatures).length === 0 ){
            return res.status(204).json({
                statusMessage: 'failed',
                errorMessage: 'No features for that track.'
            });
        }

        // RETURNING the audio features of the track
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getTrackAudioFeatures
        });

    }
    catch(error){

        // IF THERE IS AN ERROR
        console.log(error);
        return res.status(400).json({
            statusMessage: 'failed',
            errorMessage: 'Hubo un error.'
        });
    }
});

module.exports = Router;