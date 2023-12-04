import React from 'react';
import ReactPlayer from 'react-player';
import styles from'./Home.module.css'

const Home: React.FC = () => {
  return (
    <div className="Home" >

    <h1 className={styles.header}>Welcome to University Finds</h1>
    <h1 className={styles.header2}> Where Friendships Know No Borders!</h1>


    <ReactPlayer className={styles.reactPlayer}
    url={"/src/layouts/public/Home.videoTUII.mp4"} 
     playing  
     muted 
     loop
     height ='119%'
     width= '105%'
    //  style={{ position: 'absolute', top: 0, left: 0 }}
     />

  </div>
  );
};

export default Home;