
import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Searchalbums from './searchalbums';
import { useNavigate } from 'react-router-dom';
import icon from '../images/icon.png'


export default function ExistPlaylists(props) {

    const { existplaylists, setExistplaylists } = props;

    const navigate = useNavigate()

    const deletePlaylist = (event, playlistID) => {
        event.stopPropagation();
        console.log(playlistID);
        const Delete = async () => {
            try {
                //              const config = {
                //     headers: {
                //         Authorization: 'Bearer ' + localStorage.getItem('token')
                //     }
                // };

                // const response = await axios.get(`http://localhost:3600/api/playlists/allSongsInPlaylist`, config);
                // const songsToDelete = response.data;

                // // Delete the songs from local storage
                // songsToDelete.forEach((song) => {
                //     const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
                //     const updatedSongs = storedSongs.filter((storedSong) => storedSong.songID !== song.songID);
                //     localStorage.setItem('songs', JSON.stringify(updatedSongs));
                // });
                await axios.delete(`http://localhost:3600/api/playlists/${playlistID}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });

                setExistplaylists(existplaylists.filter((playlist) => playlist.playlistsID !== playlistID));
                // setfavorites(favorites.filter((song) => song.song.songID !== songID));

            } catch (error) {
                console.log(error);
            }
        };
        Delete();

    }



    const display = (playlistID) => {

        navigate(`/playlistSongs/${playlistID}`)
    }


    return (
        <>
            <React.Fragment>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                    {existplaylists.map((existplaylist, i) => (
                        <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
                            <Card style={{ width: '100%' }} onClick={() => { display(existplaylist.playlistsID) }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: '150px', objectFit: 'fill', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                        image={icon}
                                        alt="image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {existplaylist.playlistTitle}
                                        </Typography>
                                    </CardContent>
                                    <IconButton onClick={(event) => deletePlaylist(event, existplaylist.playlistsID)}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </CardActionArea>
                            </Card>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        </>
    );

}