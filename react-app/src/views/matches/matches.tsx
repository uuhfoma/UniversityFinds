import React, { useEffect } from 'react';
import { FunctionComponent, useContext, useState } from 'react'
import Match from './match';
import { UserContext } from 'App'
import RowComponentProps from './match'
import {User} from 'shared/models/user'
import styles from './matches.module.css'


const Matches: React.FC = () => {
  const baseUrl = 'http://localhost:5001/api';
  const [currentUser, setCurrentUser] = useState({});
  const [matchesList, setMatchesList] = useState<User[]>([]);


  useEffect(() => {
    fetch(baseUrl + `/users/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        fetch(baseUrl + `/users/${data._id}`)
          .then((res1) => res1.json())
          .then((data1) => {
            setCurrentUser(data1);
            setMatchesList(data1.getToKnow);
            console.log(matchesList)
            console.log(data1)
      });
       
        // Optionally set matchesList here, based on the data
        //  // Assuming data.getToKnow is the desired field
      });
  }, []);
  useEffect(() => {
    console.log('Updated matchesList:', matchesList);
  }, [matchesList]);
  //const matchesList = currentUser?.getToKnow
  if (matchesList.length === 0){
    return (
      <div className = {styles.container}>
        <h2 className={styles.title}>Matches</h2>
          <div>Matches will be available to view here.</div>
      </div>
    );
  }else{
    return (
        <div className = {styles.container}>
          <h2 className={styles.title}>Matches</h2>
            {matchesList.map((user, index) => (
                <Match key={index} user={user} />
            ))}
        </div>
    );
  }
    
};

export default Matches;
