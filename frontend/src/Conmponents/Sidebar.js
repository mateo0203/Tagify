import React, {useState, useEffect} from 'react';
import API from '../API';


export default function Sidebar(props) {

    const [playlists, setPlaylists] = useState([])
    const [tracks, setTracks] = useState([]);
    
    useEffect(()=>{
        const fetchingPlaylists = async ()=>{
            try{
                const getPlaylists = await API.get("/playlists/getPlaylists");
                return setPlaylists(getPlaylists.data.playlists);
            }
            catch(error){
                return setPlaylists([])
            }
        }
        fetchingPlaylists();
    }, [])

    const getPlaylistTracks = async (playlist_id) => {
        try{
            const getTracks = await API.get("/playlists/getPlaylistTracks/" + playlist_id + "/");
            props.handleCallback(getTracks.data.tracks)
            return setTracks(getTracks);
            //console.log(getTracks)
        }catch(error) {
            console.log(error);
        }
    }


    const buttons = []
    for (let i = 0; i < playlists.length;  i++) {
      buttons.push(
        <button  key={i} onClick={() => getPlaylistTracks(playlists[i][1])} className="btn" style={{backgroundColor: "white", color: "black", borderRadius: "5px", padding: "5px 10px", margin: "5px 0", fontWeight: "bold", transition: "background-color 0.2s", boxShadow: "none", outline: "none"}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "lightgrey";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.outline = "none";
          }}>
            {playlists[i][0]}
        </button>
      );
    }

    return (
        <div style={{backgroundColor: "white", padding: "20px", position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto"}}>
            <h3 style={{color: "black"}}>Playlists</h3>
            <div style={{display: "flex", flexDirection: "column"}}>
                {buttons}
            </div>
            <p style={{color: "black"}}>This is the sidebar content</p>
        </div>
    )
}
