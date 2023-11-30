import React, { FunctionComponent, useState } from 'react';
import styles from "./ImageUploader.module.css";
interface ImageURLInputProps {
    
    imgURL?: string;
    value: string;
    name: string
    onUrlChange: (newUrl: string) => void;
}

const ImageURLInput: FunctionComponent<ImageURLInputProps> = ({  imgURL, value, onUrlChange  }) => {
    const [url, setUrl] = useState<string | undefined>(imgURL);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        setUrl(newUrl);
        onUrlChange(newUrl);
        
        
    }

    return (
        <div className={styles.urlInputContainer}>
            <div className={styles.inputContainer}>
                <label htmlFor="imgURL" className={styles.label}>Image URL:</label>
                <input 
                    type="url" 
                    id="imgURL" 
                    name="imgURL" 
                    value={url || value} 
                    onChange={handleChange}
                    placeholder="Enter image URL here"
                    className={styles.urlField}
                />
            </div>
            { (
                <div className={styles.imageContainer}>
                    <img src={url || value} alt="" className={styles.previewImage} />
                </div>
            )}
        </div>
        
    )
}

export default ImageURLInput;
