import React from 'react';
import { FunctionComponent, useContext, useState } from 'react'
import Match from './match';
import { UserContext } from 'App'
import RowComponentProps from './match'
import {User} from 'shared/models/user'
import styles from './matches.module.css'


const Matches: React.FC = () => {
  
  const userContext = useContext(UserContext)
  const currentUser = userContext?.user
  const matchesList = currentUser?.getToKnow
  if (!matchesList){
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
