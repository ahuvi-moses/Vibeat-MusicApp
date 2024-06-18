import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { loadSong } from './PlayMusic/SongLoader';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
};

const EmotionDetection = (props) => {
    const [picture, setPicture] = useState('');
    const [result, setResult] = useState('');
    const [songs, setSongs] = useState('');
    const webcamRef = React.useRef(null);
    const results = { 'angry': 1, 'fear': 2, 'happy': 3, 'sad': 4, 'surprise': 5, 'neutral': 6, 'disgust': 7 }


    const capture = React.useCallback(async () => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc)

        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },

            }

            const response = await axios.post('http://127.0.0.1:8000/aa', { path: pictureSrc }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Image sent to server.');
            console.log(response.data);
            setResult(response.data)
            // Directly use the result value in the next axios.post call
            const res = await axios.post(`http://localhost:3600/api/mood2genres`, { mood_moodID: results[response.data] }, config);
            setSongs(res.data);
            console.log(songs);
        } catch (error) {
            console.error('Error sending image to server:', error);
        }
    });

    // useEffect(() => {
    //     async function fetchData() {
    //         const config = {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem("token")
    //             },

    //         }

    //         try {

    //             console.log(results[result]);
    //             const res=await axios.post(`http://localhost:3600/api/mood2genres`,{mood_moodID:results[result]} ,config);
    //             setSongs(res.data);
    //             console.log(res.data);
    //             console.log(songs);
    //         } catch (error) {
    //             // Handle any errors here
    //             console.error("Error fetch songs:", error);
    //         }
    //     }

    //     fetchData(); // Call the fetchData function here
    // }, [result]);
    const handleClick = async (song) => {
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

        props.setIsPlaying(false)
        // console.log(props.isPlaying);
    };

    return (
        <div className="container">
            <h2 className="textDetection">Please show us how you feel and press on the button :)</h2>
            <div className="webcam-container">
                {picture === '' ? (
                    <Webcam
                        audio={false}
                        style={{ width: '400px', height: '400px' }}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={picture} alt="Captured Image" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
                )}
                <div className="button-container">
                    {picture !== '' ? (
                        <button
                            onClick={() => setPicture('')}
                            className="btn btn-primary"
                        >
                            Retake
                        </button>
                    ) : (
                        <button
                            onClick={capture}
                            className="btn btn-danger"
                        >
                            Take a Selfy
                        </button>
                    )}
                    <h2>We think you're feeling {result}, so maybe this can fit for you-</h2>
                    <div style={{ width: '100px', height: '50px' }} />
                    {songs ? (
                        <div className="cards-container">
                            {songs.map((song, i) => (
                                <Card
                                    key={i}
                                    style={{
                                        display: 'block',
                                        minWidth: 100,
                                        maxWidth: 300,
                                        margin: '20px',
                                        width: '100%',
                                    }}
                                    sx={{ maxWidth: 250 }}
                                >
                                    <CardActionArea onClick={() => handleClick(song)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={require(`./images/${song.image}`)}
                                            alt="image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {song.songName}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <IconButton aria-label="play/pause" size="medium">
                                        {props.isPlaying && song.songName === props.currentTrack.title ? (
                                            <PauseIcon
                                                onClick={() => handleClickPause(song)}
                                                sx={{ height: 30, width: 30, color: '#aeabab' }}
                                            />
                                        ) : (
                                            <PlayArrowIcon
                                                onClick={() => handleClick(song)}
                                                sx={{ height: 30, width: 30, color: '#aeabab' }}
                                            />
                                        )}
                                    </IconButton>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default EmotionDetection;
