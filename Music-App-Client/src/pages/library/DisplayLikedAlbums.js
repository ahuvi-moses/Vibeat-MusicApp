import * as React from 'react';
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import icon from '../images/icon.png';



export default function Display(props) {

    const { currentLikedAlbums, setCurrentLikedAlbums } = useContext(AuthContext)
    const navigate = useNavigate()
    const deleteAlbum = (albumID) => {
        console.log(albumID)
        const Delete = async () => {
            try {
                await axios.delete('http://localhost:3600/api/likedalbums', {
                    data: { lal_albums_albumID: albumID },
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });

                setCurrentLikedAlbums(currentLikedAlbums.filter((album) => album.album.albumID !== albumID));
                // setfavorites(favorites.filter((song) => song.song.songID !== songID));

            } catch (error) {
                console.log(error);
            }
        };

        Delete();

    }

    useEffect(() => {
        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            }

            try {
                const response = await axios.get('http://localhost:3600/api/likedalbums', config);
                const likedAlbumsData = response.data;
                setCurrentLikedAlbums(likedAlbumsData);
            } catch (error) {
                console.error("Error fetching liked albums:", error);
            }
        }

        fetchData(); // Call the fetchData function here
    }, []);


    const display = (albumID) => {

        navigate(`/albumSongs/${albumID}`)
    }

    return (
        <>
          <div>Your Liked Albums</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
            {currentLikedAlbums.map((album, i) => (
              <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
                <Card style={{ width: '100%' }}>
                  <CardActionArea onClick={() => { display(album.album.albumID) }}>
                    <CardMedia
                      component="img"
                      sx={{ height: '150px', objectFit: 'fill', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                      image={icon}
                      alt="image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {album.album.albumTitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <IconButton>
                    <RemoveCircleOutlineIcon onClick={() => deleteAlbum(album.album.albumID)} />
                  </IconButton>
                </Card>
              </div>
            ))}
          </div>
        </>
      );
      
}