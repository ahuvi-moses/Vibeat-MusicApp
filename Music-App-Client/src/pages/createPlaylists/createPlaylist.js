import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";


function NewPlaylist() {

    const [title, setTitle] = useState("");
        const CreatePlaylist=() => {
             const config = {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            
        }            
 
         const Create  =async() =>{
            await axios.post(`http://localhost:3600/api/playlists`,   {  "playlistTitle":title }  , config);  

        }
         Create();

    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Choose a name for your playlist</h2>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Playlist Name"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
            InputProps={{
              style: { backgroundColor: '#f9f9f9' },
            }}
          />
          <button onClick={CreatePlaylist} style={{ backgroundColor: '#E008F7', color: '#F2F2F2 ', fontWeight: 'bold', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Create Playlist
          </button>
        </div>
      );
      

}
export default NewPlaylist