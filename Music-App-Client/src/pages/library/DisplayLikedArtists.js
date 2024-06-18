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



export default function DisplayA(props) {

    const {currentLikedArtists, setCurrentLikedArtists} = useContext(AuthContext)
    const navigate = useNavigate()
    const deleteArtist = (artistID) => {
        console.log(artistID)
        const Delete = async () => {
            try {
                await axios.delete('http://localhost:3600/api/likedartists', {
                    data: { lar_artists_artistID: artistID },
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });

                setCurrentLikedArtists(currentLikedArtists.filter((artist) => artist.artist.artistID !== artistID));
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
                const response = await axios.get('http://localhost:3600/api/likedartists', config);
                const likedArtistsData = response.data;
                setCurrentLikedArtists(likedArtistsData);
            } catch (error) {
                console.error("Error fetching liked artists:", error);
            }
        }

        fetchData(); // Call the fetchData function here
    }, []);


    const display = (artistID) => {

        navigate(`/artistSongs/${artistID}`)
    }

    return (
        <>
          <div>Your Liked Artists</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
            {currentLikedArtists.map((artist, i) => (
              <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
                <Card style={{ width: '100%' }}>
                  <CardActionArea onClick={() => { display(artist.artist.artistID) }}>
                    <CardMedia
                      component="img"
                      sx={{ height: '150px', objectFit: 'fill', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                      image={icon}
                      alt="image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {artist.artist.artistName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <IconButton>
                    <RemoveCircleOutlineIcon onClick={() => deleteArtist(artist.artist.artistID)} />
                  </IconButton>
                </Card>
              </div>
            ))}
          </div>
        </>
      );
      
}