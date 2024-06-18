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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import icon from '../images/icon.png';


export default function Artists(props) {

    const [artists, setArtists] = useState([]);
    const { currentLikedArtists, setCurrentLikedArtists } = useContext(AuthContext)

    const navigate = useNavigate()
    const addArtist = async (artistID) => {
        // Check if the album is already in the liked albums
        if (currentLikedArtists.some((likedArtist) => likedArtist.artist.artistID === artistID)) {
            // Handle the case where the album is already liked (e.g., show a message)
            console.log("Artist is already liked.");
        } else {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }

            try {
                // Make a POST request to add the album to the liked albums list
                await axios.post(`http://localhost:3600/api/likedartists`, { "lar_artists_artistID": artistID }, config);

                // Fetch the updated list of liked albums and set it in your state
                const response = await axios.get('http://localhost:3600/api/likedartists', config);
                const updatedLikedArtists = response.data;
                setCurrentLikedArtists(updatedLikedArtists);
            } catch (error) {
                // Handle any errors here
                console.error("Error adding artist:", error);
            }
        }
    }

    useEffect(() => {

        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            }
            const { data } = await axios.get(`http://localhost:3600/api/artists`, config);
            setArtists(data);
        }
        fetchData();
    }, []);


    const filteredData = artists.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.artistName.toLowerCase().includes(props.input)
        }
    })
    const display = (artistID) => {


        navigate(`/artistSongs/${artistID}`)
    }

    return (
        <>
            <React.Fragment>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                    {filteredData.map((artist, i) => (
                        <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
                            <Card style={{ width: '100%' }}>
                                <CardActionArea onClick={() => { display(artist.artistID) }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: '150px', objectFit: 'fill', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                        image={icon}
                                        alt="image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {artist.artistName}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <IconButton>
                                    <AddCircleOutlineIcon onClick={() => addArtist(artist.artistID)} />
                                </IconButton>
                            </Card>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        </>
    );


}