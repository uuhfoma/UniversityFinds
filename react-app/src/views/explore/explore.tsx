import React, { useEffect, useState } from 'react';
import './usersfind.css';
import { User } from 'shared/models/user';
import { NavLink } from 'react-router-dom';
import  Styles  from './explore.module.css';
import Heart from "react-heart";

const UserFind: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]); // For storing all users
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [activeHearts, setActiveHearts] = useState<{ [key: string]: boolean }>({});
  const baseUrl = 'http://localhost:5001/api';

  useEffect(() => {
    setIsLoading(true);
    fetch(baseUrl + `/users/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        return fetch(`${baseUrl}/users/profilestack/${data._id}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        console.log(data)
        setAllUsers(data); // Store all users
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load data');
        setIsLoading(false);
      });
  }, [baseUrl]);

  const handleOnClick = () => {
    if (text == "" || text == undefined ){
      setUserList(allUsers);
    }else{
      const filteredUsers = allUsers.filter((u) => 
      u.school?.toLowerCase().includes(text.toLowerCase()));
      if (selectedGender == 'both'){
        setUserList(filteredUsers);
      }else{
        const filteredUsers2 = filteredUsers.filter((u) =>
        u.gender === selectedGender)
        setUserList(filteredUsers2);
      }
      
    }
    
  };

  const handleHeartClick = (userId: string) => {
    // Toggle the active state for the specific user
    setActiveHearts((prevActiveHearts) => ({
      ...prevActiveHearts,
      [userId]: !prevActiveHearts[userId]
    }));

    
  };
  const [selectedGender, setSelectedGender] = useState<string>('both');

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
  };

  const handleClick = () => {
    // Handle the filter logic here based on selectedGender
    console.log(`Filtering for: ${selectedGender}`);
    // Add your filter logic here
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Styles.body}>
      <div className="title">
        <h1>Unlock a World of Connections: Welcome to UniversityFinds – Where Friendships Know No Borders!</h1>
      </div>
      <div className={Styles.container}>
      <div className={Styles.filters}>
      <label className={Styles.filter}>
        Male
        <input 
          type="radio"
          value="male"
          checked={selectedGender === 'male'}
          onChange={handleGenderChange}
        />
      </label>
      <label className={Styles.filter}>
        Female
        <input
          type="radio"
          value="female"
          checked={selectedGender === 'female'}
          onChange={handleGenderChange}
        />
      </label>
      <label className={Styles.filter}>
        Both
        <input
          type="radio"
          value="both"
          checked={selectedGender === 'both'}
          onChange={handleGenderChange}
        />
      </label>
      {/* <button onClick={handleClick}>Filter</button> */}
    </div>
      <div className="input__wrapper">
        <input className={Styles.input}
          type="text"
          placeholder="Search University"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>
      </div>
      <div className="body">
        {userList && userList.length === 0 && (
          <div className="notFound">No Students Found</div>
        )}

        {userList && userList.length > 0 && (
          
          userList.map((user) => (
            <div className="body__item" key={user._id}> 
               
              <img className={Styles.image} src={user.pictures[0]} alt='profile pic' />
              <Heart 
            isActive={activeHearts[user._id] || false} 
            onClick={() => handleHeartClick(user._id)}
            />
                <h3>Name: {user.fname}</h3>
                <p>Age: {user.age}</p>
                <p>Major: {user.major}</p>
                {user.school && <p>University: {user.school}</p>}
                {user.bio && <p>Bio: {user.bio}</p>}
                {user.gender && <p>Gender: {user.gender}</p>}
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserFind;
