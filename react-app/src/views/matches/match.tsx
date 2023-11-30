import React from 'react';
import styles from './match.module.css';
import { User } from 'shared/models/user';

interface RowComponentProps {
    user: User;
}

const Match: React.FC<RowComponentProps> = ({ user }) => {
    return (
        <div className={styles.match}>
            <img className={styles.image} src={user.pictures[0]} alt='profile pic' />
            <div className={styles.name_and_text}>
                <h2>{user.fname}</h2>
                <p>Some text here</p>
            </div>
        </div>
    );
};

export default Match;
