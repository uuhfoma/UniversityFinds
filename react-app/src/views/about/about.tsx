// About.tsx

import React from 'react';
import stylesco from './About.module.css';

const About: React.FC = () => {
 return (
    <div className={stylesco.container}>
      <h1 className={stylesco.header}>hi hi Welcome to UniversityFinds!</h1>
      <div className={stylesco.paragraphContainer}>
        <p className={stylesco.paragraph}>At UniversityFinds, we believe in the transformative power of connections...</p>
        <p className={stylesco.paragraph}>In essence, UniversityFinds is more than just a platform; it's a dynamic venture meticulously designed to provide college students with a dedicated space to network, meet new people, and cultivate enduring relationships. We recognize the significance of fostering better ties between students, and our website serves as the bridge that closes the gap.</p>
        <p className={stylesco.paragraph}>In the vibrant tapestry of college life, fun and fulfillment are essential threads. UniversityFinds isn't just a tool for making connections; it's a platform where students can discover exciting things to do in and around their campus. From starting romantic connections and going on dates to making new friends and organizing casual gatherings, our platform is a one-stop destination for students seeking a fulfilling social life.</p>
      </div>
    </div>
 );
};

export default About;
