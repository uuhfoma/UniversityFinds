import React, { useEffect, useRef, useState } from 'react';
import styles from './messages.module.css';
import { useParams } from 'react-router-dom';
import { User } from 'shared/models/user';
import {Message} from 'shared/models/message'

const Chat = React.memo(({ groupedMessages }: { groupedMessages: Message[][] }) => {
    const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
    const { id } = useParams();
    const { id2 } = useParams();

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [groupedMessages]);

    return (
        <div className={styles.chat}>
                    {groupedMessages.map((group, index) => (
                        <div>
                        {group.map((message, index2) => (
                        <div key={index2} className={`${group[index2].from === id2 ? styles.mine : styles.yours} ${styles.messages}`}>
                            
                                
                                <div key={message._id} className={` ${styles.message}`}onMouseEnter={() => setHoveredMessage(message._id)}
                                 onMouseLeave={() => setHoveredMessage(null)}>
                                    {message.content}
                                    
                                </div>

                                {hoveredMessage === message._id && (
                                <div className={styles.messageTime}>
                                    {new Date(message.dateAndTime).toLocaleString()}
                                </div>
                            )}

                                
                            
                        </div>
                        ))}

                        </div>
                    ))}
                    <div ref={chatEndRef} />
            </div>
    );
});

const Messages: React.FC = () => {
    const { id } = useParams();
    const { id2 } = useParams();
    const baseUrl = 'http://localhost:5001/api';
    const [currentMatch, setCurrentMatch] = useState<User>();
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setIsLoading(true);
        fetch(baseUrl + `/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setCurrentMatch(data);
            setIsLoading(false);       
        });
    }, [id]); // Adding id as a dependency

    useEffect(() => {
        if (id2 && id) {
            const queryParams = new URLSearchParams({
                id_sender: id2,
                id_receiver: id
            });
            fetch(`${baseUrl}/messages/directmessage?${queryParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setMessageList(data);
                    
            });
        } else {
            console.log('One of the IDs is undefined');
        }

    }, []); 

    const groupMessages = (messages: Message[]): Message[][] => {
        const grouped: Message[][] = [];
        let currentGroup: Message[] = [];
        let lastSenderId = '';

        messages.forEach(message => {
            if (message.from !== lastSenderId) {
                if (currentGroup.length) {
                    grouped.push(currentGroup);
                }
                currentGroup = [];
            }
            currentGroup.push(message);
            lastSenderId = message.from;
        });

        if (currentGroup.length) {
            grouped.push(currentGroup);
        }
        console.log(grouped)
        return grouped;
    };

    const groupedMessages = groupMessages(messageList);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submit action
        const now = new Date();
        const timestamp = now.toISOString().split('.')[0] + 'Z'; // Formatted as '2023-12-03T09:30:00Z'

        fetch(baseUrl + `/messages/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: id2, to: id, dateAndTime: timestamp, content: inputValue})
        }
        )
        
        // Process the message here (e.g., send it to the server)
        console.log('Message to send:', inputValue);

        let number = '';
        for (let i = 0; i < 12; i++) {
            number += Math.floor(Math.random() * 10).toString(); // generates a single digit (0-9) and converts it to a string
        }
        
        messageList.push({_id:number,from: id2 as string, to: id as string, dateAndTime: timestamp, content: inputValue})
        setMessageList(messageList)
        const groupedMessages = groupMessages(messageList);
        // Clear the input field after sending the message
        setInputValue('');
    };
    



    if (isLoading) {
        return <div>Loading...</div>;
    }

  return (
    <div className={styles.head}>
        <div className={styles.headerContainer}>
            <h1 className={styles.header}>Instant Messenger</h1>
        </div>
        <div className={styles.body}>
            
            <div className={styles.leftContainer}>
                <img className={styles.image} src={currentMatch?.pictures[0]} alt='profile pic' />
                <h1 className={styles.text}>{currentMatch?.fname}, {currentMatch?.age}</h1>
                <p className={styles.text}><b>Bio: </b>{currentMatch?.bio}</p>
                <p className={styles.text}><b>School:</b> {currentMatch?.school || 'Currently unenrolled'}</p>
                <div> </div>
                <p><b>Class:</b> {currentMatch?.class_ || 'n/a'}</p>
                <p><b>Major:</b> {currentMatch?.major || 'Undecided'}</p>
                <p><b>Minor:</b> {currentMatch?.minor || 'n/a'}</p>

            </div>
            
            <div className={styles.messenger}>
                <Chat groupedMessages={groupedMessages}/>
                <form onSubmit={handleSubmit}>
                    <div className={styles.textbox}>
                            <input id="input" value={inputValue} placeholder='  Message' onChange={handleInputChange}></input>
                            <button id="sendButton">Send</button>
                    </div>
                </form>
            </div>    
            
        </div>
    </div>
  );
};

export default Messages;
