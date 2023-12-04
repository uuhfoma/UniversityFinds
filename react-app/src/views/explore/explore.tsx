import React, { useEffect, useState } from 'react';
import './usersfind.css';
import { User } from 'shared/models/user';
import { NavLink } from 'react-router-dom';
import  Styles  from './explore.module.css';

const UserFind: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]); // For storing all users
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  
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
    const filteredUsers = allUsers.filter((u) => u.school === text);
    setUserList(filteredUsers);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Styles.body}>
      <div className="title">
        <h1>Unlock a World of Connections: Welcome to UniversityFinds – Where Friendships Know No Borders!</h1>
      </div>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Search University"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>

      <div className="body">
        {userList && userList.length === 0 && (
          <div className="notFound">No University Found</div>
        )}

        {userList && userList.length > 0 && (
          
          userList.map((user) => (
            <div className="body__item" key={user._id}> 
              <NavLink to={`/user/${user._id}`}> 
              <img className={Styles.image} src={user.pictures[0]} alt='profile pic' />
                <h3>Name: {user.fname}</h3>
                <p>Age: {user.age}</p>
                <p>Major: {user.major}</p>
                {user.school && <p>University: {user.school}</p>}
                {user.gender && <p>Gender: {user.gender}</p>}
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserFind;
