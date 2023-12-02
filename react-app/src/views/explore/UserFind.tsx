import React, { useState } from 'react';
import './usersfind.css';

interface User {
  name: string;
  age: number;
  major: string;
  university?: string;
  gender?: string;
}

const UserFind: React.FC = () => {
  const users: User[] = [
    {
      name: 'Jeff',
      age: 20,
      university: 'Towson University',
      major: 'Computer Science',
      gender: 'Male',
    },
    {
      name: 'Lela',
      age: 21,
      major: 'Busienss Admin',
      gender: 'Female',
    },
    {
      name: 'Jamy',
      age: 19,
      major: 'Arts and Design',
      gender: 'Female',
    },
    {
      name: 'Hanif',
      age: 20,
      major: 'Economics',
      gender: 'Male',
    },
  ];

  const [userList, setUserList] = useState<User[] | undefined>(users);
  const [text, setText] = useState<string>('');

  const handleOnClick = () => {
    const findUniversity = userList?.filter((u) => u.name === text);
    setUserList(findUniversity);
  };

  return (
    <div>
      <div className="title">
        <h1>Unlock a World of Connections:</h1>
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

        {userList &&
          userList.length > 0 &&
          userList.map((user) => (
            <div className="body__item" key={user.name}>
              <h3>Name: {user.name}</h3>
              <p>Age: {user.age}</p>
              <p>Major: {user.major}</p>
              {user.university && <p>University: {user.university}</p>}
              {user.gender && <p>Gender: {user.gender}</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserFind;
