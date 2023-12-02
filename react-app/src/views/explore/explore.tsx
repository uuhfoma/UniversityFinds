import React from 'react';
import UserFind from './UserFind';

const Explore: React.FC = () => {
    const onSearch = (value: string) => {
        console.log('Searching for:', value);
    };

    return (
        <div className="centered-container">
            {/* Component content goes here */}
      
            {/* Added UserFind component */}
            <UserFind 
            />
        </div>
    );
};

export default Explore;