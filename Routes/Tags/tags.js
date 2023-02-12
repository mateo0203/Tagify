const Router = require("express").Router();
const {getMyData} = require("../../Backend/spotifyApi");
const db = require('../../DB');

//get all tags from user
Router.get('/getAllTags/', async (req, res)=>{
    try{
        const user_id = await getMyData();
        const getTagsFromUser = await db.query('SELECT tag_name FROM tags where $1 = tag_user', [user_id]);

        // CHECK THAT getTagsFromUser != 0

        if (getTagsFromUser.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'No tags from user yet'
            });

        }
        let tagsArray = []
        for(let i = 0; i < Object.keys(getTagsFromUser.rows).length; i++) {
            tagsArray.push(getTagsFromUser.rows[i].tag_name)
        }
        // RETURNING THE DATA OF getPlaylistNames
        
        return res.status(200).json({
            statusMessage:'success',
            tagsFromUser: tagsArray
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



//Get all tracks with tag from user

Router.get('/getAllTracksWTag/:tag_name', async (req, res)=>{

    
    const tag_name = req.params.tag_name;
    try{
        const user_id = await getMyData();
        const getAllTracksWTag = await db.query('SELECT tag_tracks FROM tags where $1 = tag_user AND tag_name = $2', [user_id, tag_name ]);

        // CHECK THAT getAllTracksWTag != 0

        if (getAllTracksWTag.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'No song with that tag.'
            });
        }

        let tracksArray = []
        for(let i = 0; i < Object.keys(getAllTracksWTag.rows).length; i++) {
            tracksArray.push(getAllTracksWTag.rows[i].tag_tracks)
        }

        // RETURNING THE DATA OF getAllTracksWTag
        
        return res.status(200).json({
            statusMessage:'success',
            allTracks: tracksArray[0]
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

module.exports = Router;