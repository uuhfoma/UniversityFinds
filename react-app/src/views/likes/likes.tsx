import React, { useEffect, useState } from 'react';
import { User } from 'shared/models/user';
import styles from './likes.module.css'

const Likes: React.FC = () => {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User>();
  const [user2, setUser2] = useState<User>();


 
  const baseUrl = 'http://localhost:5001/api';
 
  useEffect(() => {
     setIsLoading(true);
     fetch(baseUrl + `/users/me`, { credentials: 'include' })
       .then((res) => res.json())
       .then((data) => {
        setCurrentUser(data)
         setLikedUsers(data.likes);
         setIsLoading(false);
       })
       .catch((err) => {
         console.error(err);
         setError('Failed to load data');
         setIsLoading(false);
       });
  }, [user2]);

  const handleOnClick = async (userId: string) => {
    console.log('pass')
    const response = await fetch(baseUrl + `/users/${userId}`, { credentials: 'include' });
        const data = await response.json();
        setUser2(data);

       console.log(currentUser)
       console.log(user2)
       
    if(currentUser &&  data ){
      console.log('passed')
      //user2?.getToKnow.push(currentUser)
      let updatedUser
      if(data.getToKnow){
         updatedUser = {
          ...data,
          getToKnow: [...data.getToKnow, currentUser] // Add currentUser to getToKnow
        };
      }else{
        updatedUser = {
          ...data,
          getToKnow: [currentUser] // Add currentUser to getToKnow
        };
      }
      
      if (currentUser.likes){
        currentUser.likes = currentUser.likes.filter(user => user._id !== userId);
      }
      
      //currentUser.getToKnow.push(user2)
      let updatedUser2;
      if (currentUser.getToKnow){
        updatedUser2 = {
        ...currentUser,
        getToKnow: [...currentUser.getToKnow, updatedUser] // Add user2 to getToKnow
      };
      }else{
        updatedUser2 = {
          ...currentUser,
          getToKnow: [ updatedUser] // Add user2 to getToKnow
        };
      }
      


      fetch(baseUrl + `/users/update/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      })

      fetch(baseUrl + `/users/update/${currentUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser2)
      })

    }
      
    
    

    


  };


 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
    <div>
      <h1 className={styles.title}>Likes</h1>
      <div className={styles.body}>
        {likedUsers && likedUsers.length === 0 && (
          <div className={styles.notFound}>When someone likes you, they will be shown here.</div>
        )}
        <div className={styles.cardBody}>
        {likedUsers && likedUsers.length > 0 && (
          
          likedUsers.map((user) => (
            <div className={styles.body__item} key={user._id}> 
               
              <img className={styles.image} src={user.pictures[0]} alt='profile pic' />
              
                <h3> {user.fname}, {user.age} </h3>
                {/* <p><b>Age:</b> </p> */}
                <p><b>Major:</b> {user.major}</p>
                {user.school && <p><b>University:</b> {user.school}</p>}
                {user.bio && <p><b>Bio:</b> {user.bio}</p>}
                {user.gender && <p><b>Gender:</b> {user.gender}</p>}
                <button style={{ display: 'block', margin: 'auto', marginTop: '20px', textAlign: 'center'}} className='btn-primary' onClick={() => handleOnClick(user._id)}> Match </button>
                <div className={styles.input}>
                  
                </div>
                
            </div>
          ))
          
        )}
        </div>
      </div>
       
    </div>
  );
 };

export default Likes;



