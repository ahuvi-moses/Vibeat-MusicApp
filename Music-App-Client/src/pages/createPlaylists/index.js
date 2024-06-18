import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import Popup from './popup';
import handleOpen from './popup'
import NewPlaylist from './createPlaylist';
import AddSongs2Playlist from './displaySongs2Playlist';
import SearchSongs from './SearchSongs';
import icon from '../images/icon.png';


function CreatePlaylist() {

    const [playlists, setplaylists] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/playlists`, config);
            setplaylists(data);

        }
        fetchData();

    }, [playlists]);

    const display = (playlistID) => {
        //setOpen(true);

        //localStorage.setItem('playlistID', JSON.stringify(playlistID));

        navigate(`/createPlaylist/${playlistID}`)
    }


    // 
    return (
        <>
            <React.Fragment>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                    {playlists.map((playlist, i) => (
                        <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
                            <Card style={{ width: '100%' }} onClick={() => { display(playlist.playlistsID) }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: '150px', objectFit: 'fill', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                        image={icon}
                                        alt="image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {playlist.playlistTitle}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            {open && <SearchSongs></SearchSongs>}
                        </div>
                    ))}
                </div>
                <NewPlaylist />
            </React.Fragment>
        </>
    );

}
export default CreatePlaylist