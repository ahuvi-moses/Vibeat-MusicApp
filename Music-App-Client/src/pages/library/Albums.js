import * as React from 'react';
import axios from "axios";
import { useEffect, useState,useContext } from "react";
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
import BlogoText from '../images/BlogoText.png';

export default function Albums(props){

    const [albums, setalbums] = useState([]);
    const { currentLikedAlbums ,setCurrentLikedAlbums} = useContext(AuthContext)
    const navigate = useNavigate()
    const addAlbum = async (albumID) => {
        // Check if the album is already in the liked albums
        if (currentLikedAlbums.some((likedAlbum) => likedAlbum.album.albumID === albumID)) {
            // Handle the case where the album is already liked (e.g., show a message)
            console.log("Album is already liked.");
        } else {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
    
            try {
                // Make a POST request to add the album to the liked albums list
                await axios.post(`http://localhost:3600/api/likedalbums`, { "lal_albums_albumID": albumID }, config);
    
                // Fetch the updated list of liked albums and set it in your state
                const response = await axios.get('http://localhost:3600/api/likedalbums', config);
                const updatedLikedAlbums = response.data;
                setCurrentLikedAlbums(updatedLikedAlbums);
            } catch (error) {
                // Handle any errors here
                console.error("Error adding album:", error);
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
            const { data } = await axios.get(`http://localhost:3600/api/albums`,config);
            setalbums(data);
        }
        fetchData();
    }, []);


    const filteredData = albums.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.albumTitle.toLowerCase().includes(props.input)
        }
    })
    const display = (albumID) => {

        navigate(`/albumSongs/${albumID}`)
    }

    return (
        <>
          <React.Fragment>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
              {filteredData.map((album, i) => (
                <div key={i} style={{ width: 'calc(33.33% - 8px)', margin: '10px' }}>
                  <Card style={{ width: '100%' }}>
                    <CardActionArea onClick={() => { display(album.albumID) }}>
                      <CardMedia
                        component="img"
                        sx={{ height: '150px', objectFit: 'fill', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                        image={icon}
                        alt="image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {album.albumTitle}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <IconButton>
                      <AddCircleOutlineIcon onClick={() => addAlbum(album.albumID)} />
                    </IconButton>
                  </Card>
                </div>
              ))}
            </div>
          </React.Fragment>
        </>
      );
      



}