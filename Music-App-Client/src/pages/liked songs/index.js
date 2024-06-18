import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { loadSong } from '../PlayMusic/SongLoader';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


function FavoriteData(props) {

    const [favorites, setfavorites] = useState([]);


    const deleteLikedSong = (songID) => {

        const Delete = async () => {
            try {
                await axios.delete('http://localhost:3600/api/likedsongs', {
                    data: { ls_songs_songID: songID },
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                setfavorites(favorites.filter((song) => song.song.songID !== songID));

            } catch (error) {
                console.log(error);
            }
        };
        Delete();

    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/likedsongs`, config);
            setfavorites(data);

        }
        fetchData();
    }, []);

    const handleClick = async (song) => {
        console.log("nnnn");
        const songSrc = await loadSong(song.path);
        props.setCurrentTrack({
            "title": song.songName,
            "src": songSrc,
            "Image": song.image
        })
        console.log(props.currentTrack);

        props.setIsPlaying(true)
        // console.log(props.isPlaying);
    };

    const handleClickPause = async (song) => {
        console.log("bbbbb");

        props.setIsPlaying(false)
        // console.log(props.isPlaying);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
          {favorites.map((song, i) => (
            <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card style={{ flex: '1' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={require(`../images/${song.song.image}`)}
                      alt="image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {song.song.songName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <IconButton onClick={() => deleteLikedSong(song.song.songID)}>
                    <FavoriteOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label="play/pause" size="medium">
                    {props.isPlaying && song.song.songName === props.currentTrack.title ? (
                      <PauseIcon onClick={() => handleClickPause(song.song)} sx={{ height: 30, width: 30, color: '#aeabab' }} />
                    ) : (
                      <PlayArrowIcon onClick={() => handleClick(song.song)} sx={{ height: 30, width: 30, color: '#aeabab' }} />
                    )}
                  </IconButton>
                </Card>
              </div>
            </div>
          ))}
        </div>
      );
      
      


    // return (<>

    //     <React.Fragment>

    //         {favorites.map((song, i) => (
    //             <>
    //                 <Card style={{
    //                     display: 'block', minWidth: 100, maxWidth: 300, margin: "1%", width: '100%'
    //                 }}
    //                     sx={{ maxWidth: 250 }} >
    //                     <CardActionArea key={i}>
    //                         <CardMedia
    //                             component="img"
    //                             height="140"
    //                             image={require(`../images/${song.song.image}`)}
    //                             alt="image"
    //                         />
    //                         <CardContent key={i}>
    //                             <Typography gutterBottom variant="h5" component="div">
    //                                 {song.song.songName}
    //                             </Typography>

    //                         </CardContent>

    //                     </CardActionArea>
    //                     <IconButton onClick={() => deleteLikedSong(song.song.songID)}>
    //                         <FavoriteOutlinedIcon />
    //                     </IconButton>
    //                     <IconButton aria-label="play/pause" size="medium">
    //                         {props.isPlaying && song.song.songName === props.currentTrack.title ? (
    //                             <PauseIcon onClick={() => handleClickPause(song.song)} key={i} sx={{ height: 30, width: 30, color: '#aeabab' }} />
    //                         ) : (
    //                             <PlayArrowIcon onClick={() => handleClick(song.song)} key={i} sx={{ height: 30, width: 30, color: '#aeabab' }} />
    //                         )}
    //                     </IconButton>
    //                 </Card>
    //             </>

    //         ))}
    //     </React.Fragment>
    // </>)
}

export default FavoriteData