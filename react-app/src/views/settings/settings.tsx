import React, { useEffect, useState } from 'react';
import { User } from 'shared/models/user';

const baseUrl = 'http://localhost:5001/api';
// const [currentUser, setCurrentUser] = useState<User>();
// const [isLoading, setIsLoading] = useState<boolean>(false);
// const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//      setIsLoading(true);
//      fetch(baseUrl + `/users/me`, { credentials: 'include' })
//        .then((res) => res.json())
//        .then((data) => {
//         setCurrentUser(data);
//          setIsLoading(false);
//        })
//        .catch((err) => {
//          console.error(err);
//          setError('Failed to load data');
//          setIsLoading(false);
//        });
//   }, []);

interface Settings {
  profilePicture: string;
  notificationsEnabled: boolean;
  username: string;
  school: string;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    profilePicture: '',
    notificationsEnabled: false,
    username: '',
    school: '',
  });

  // Handler for changing the profile picture
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic for profile picture change
  };

  // Handler for toggling notifications
  const toggleNotifications = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      notificationsEnabled: !prevSettings.notificationsEnabled,
    }));
  };

  // Handler for changing username
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      username: event.target.value,
    }));
  };

  // Handler for changing school
  const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      school: event.target.value,
    }));
  };

  // Handler for disabling the account
  const disableAccount = () => {
    // Logic for disabling account
  };

  // Handler for deleting the account
  const deleteAccount = () => {
    // Logic for deleting account
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Settings</h1>
      <form>
        <div>
          <label>
            Change Profile Picture:
            <input type="file" onChange={handleProfilePictureChange} />
          </label>
        </div>
        <div>
          <label>
            Enable Notifications:
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={toggleNotifications}
            />
          </label>
        </div>
        <div>
          <label>
            Change Username:
            <input
              type="text"
              value={settings.username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Change School:
            <input
              type="text"
              value={settings.school}
              onChange={handleSchoolChange}
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={disableAccount}>Disable Account</button>
        </div>
        <div>
          <button type="button" onClick={deleteAccount}>Delete Account</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
