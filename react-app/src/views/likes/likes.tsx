import React, { useEffect, useState } from 'react';
import { User } from 'shared/models/user';

const Likes: React.FC = () => {
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User>();

 
  const baseUrl = 'http://localhost:5001/api';
 
  useEffect(() => {
     setIsLoading(true);
     fetch(baseUrl + `/users/likes/${currentUser?._id}`, { credentials: 'include' })
       .then((res) => res.json())
       .then((data) => {
         setLikedUsers(data);
         setIsLoading(false);
       })
       .catch((err) => {
         console.error(err);
         setError('Failed to load data');
         setIsLoading(false);
       });
  }, [baseUrl, currentUser]);
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
     <div>
       <h2>Users who liked your profile:</h2>
       <ul>
         {likedUsers.map((user) => (
           <li key={user._id}>{user.fname}</li>
         ))}
       </ul>
     </div>
  );
 };

export default Likes;



