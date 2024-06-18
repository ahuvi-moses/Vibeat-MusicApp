import { useRef, useState } from 'react';
import { useContext } from 'react';
//import { tracks } from '../songs/tracks';
import axios from "axios";
import React, {  useEffect } from 'react';
// import components
import DisplayTrack from './DisplayTrack';
import Controls from './controls';
import ProgressBar from './ProgressBar';
import { loadSong } from './SongLoader';
import { AudioContext } from '../../context/audioContext';
import BasicDemo from '../home/carusal2';


const AudioPlayer = () => {


  //const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const { currentTrack, setCurrentTrack, tracks} = useContext(AudioContext);
  const { audioRef } =  useContext(AudioContext);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressBarRef = useRef();

  if (!tracks || !currentTrack) {
    return <div>Loading...</div>; // Or any loading indicator or default content
  }
  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  

  return (
    <>
    <div className="wrapper">
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack 
            { ...{
              currentTrack,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, timeProgress, duration }}
          />
          {/* <BasicDemo
          {...{currentTrack}}
          ></BasicDemo> */}
        </div>
      </div>
      </div>
    </>
  );
};
export default AudioPlayer;