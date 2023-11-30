import React from 'react';
import ReactPlayer from 'react-player';
import styles from '/Home.module.css'
// import video from 'views/home/assests/';


const Home: React.FC = () => {
  return (
    <div className="video-background">
    <ReactPlayer
      url="videoTU.mp4" // Replace with the URL of your video
      playing
      loop
      muted
      width="100%"
      height="100%"
    />
  </div>
  );
};

export default Home;