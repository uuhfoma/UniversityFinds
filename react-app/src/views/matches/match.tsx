import React, { useEffect, useState } from 'react';
import styles from './match.module.css';
import { User } from 'shared/models/user';
import { NavLink } from 'react-router-dom';
import { Message } from 'shared/models/message';

interface RowComponentProps {
    user: User;
    user2?: User;
}

const Match: React.FC<RowComponentProps> = ({ user, user2 }) => {
   const id2 = user._id
   const id = user2?._id
   const baseUrl = 'http://localhost:5001/api';
   
   const [latestMessage, setLatestMessage] = useState<Message | null>(null);


    useEffect(() => {
        if (id2 && id) {
            const queryParams = new URLSearchParams({
                id_sender: id2,
                id_receiver: id
            });
            fetch(`${baseUrl}/messages/latestmessage?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setLatestMessage(data);
                    
            });
        } else {
            console.log('One of the IDs is undefined');
        }

    }, []); 

    return (
        <NavLink to= {`/instantmessenger/${user._id}/${user2?._id}`}>
            <div className={styles.match}>
                
                    <img className={styles.image} src={user.pictures[0]} alt='profile pic' />
                    <div className={styles.name_and_text}>
                        <h2>{user.fname}</h2>
                        <div className={styles.latestMessage}>
                            <p>{latestMessage?.content || 'Start the conversation with '+user.fname}</p>
                        </div>
                    </div>
                        
                    

            </div>
        </NavLink>    
    );
};

export default Match;
