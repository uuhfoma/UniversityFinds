import React from 'react';
import ReactPlayer from 'react-player';
import styles from '/Home.module.css'
//  import video from '../src/layouts/public/Home.videoTU.mp4'

const Home: React.FC = () => {
  return (
    <div className="Home">
      <h1>Welcome to the home page</h1>
    <ReactPlayer url={" /src/layouts/public/Home.videoTU.mp4"} playing 
      muted
      loop
      width="100%"
      height="100vh"
      />
  </div>
  );
};

export default Home;