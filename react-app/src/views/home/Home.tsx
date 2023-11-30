import React from 'react';
import ReactPlayer from 'react-player';
import styles from'./Home.module.css'

const Home: React.FC = () => {
  return (
    <div className="Home">
    <ReactPlayer className={styles.reactPlayer}
    url={"/src/layouts/public/Home.videoTU.mp4"} 
     width="100%"
     height="100%"
     playing  
     muted 
     loop
     
      />
  </div>
  );
};

export default Home;