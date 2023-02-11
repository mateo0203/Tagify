const Router = require("express").Router()

//get all tags from user
Router.get('/getAllTags/:user', async (req, res)=>{

    const user = req.params.user;
    try{

        const getTagsFromUser = await db.query('SELECT tag_songs FROM tags where $1 = ANY(tag_user)', [user]);

        // CHECK THAT getTagsFromUser != 0

        if (getTagsFromUser.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'No tags from user yet'
            });

        }

        // RETURNING THE DATA OF getPlaylistNames
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getTagsFromUser.rows
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



//Get all songs with tag from user

Router.get('/getAllSongsWTag/:user/:tag', async (req, res)=>{

    const user = req.params.user;
    const tag = req.params.tag;
    try{

        const getAllSongsWTag = await db.query('SELECT tag_songs FROM tags where $1 = ANY(tag_user) AND tag_name = $2', [user,tag ]);

        // CHECK THAT getAllSongsWTag != 0

        if (getAllSongsWTag.rowCount === 0){
            return res.status(204).json({
                statusMessage: 'No song with that tag.'
            });

        }

        // RETURNING THE DATA OF getAllSongsWTag
        
        return res.status(200).json({
            statusMessage:'success',
            filterWorkers: getAllSongsWTag.rows
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
