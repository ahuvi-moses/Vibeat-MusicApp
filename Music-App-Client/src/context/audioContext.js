import { createContext, useState, useEffect ,useRef} from 'react';
import axios from "axios";
import { loadSong } from '../pages/PlayMusic/SongLoader';

export const AudioContext = createContext({
  // currentTrack: null,
  // setCurrentTrack: () => {},
});
//change
export const AudioContextProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef({ current: new Audio() });

  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token")
          }                 
      }
        const response = await axios.get('http://localhost:3600/api/songs',config);
        const data = response.data;
  
        // Transform the API response into the desired structure
        const formattedTracks = await Promise.all(data.map(async (song, index) => {
          const songSrc = await loadSong(song.path);

          return {
            title: song.songName,
            src: songSrc || '',
            Image: `${song.image}`
          };
        }));
  console.log(formattedTracks);

        setTracks(formattedTracks);
  
        // Only set the current track if it's initially null
        if (!currentTrack) {
          setCurrentTrack(formattedTracks[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);


  

  return (
    // <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>

    <AudioContext.Provider  value={{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying, tracks,setTracks,audioRef }}>
      {children}
    </AudioContext.Provider>
    // </div>
  );
};
