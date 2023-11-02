import axios from 'axios';
import React, { useEffect } from 'react';

const Test = () => {
    useEffect(() => {
        const test = async () => {
            // Set the baseURL to the production URL of your Flask API
          axios.defaults.baseURL = 'http://127.0.0.1:5000';
            try {
                const response = await axios.get('/api/test');
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        test();
    }, []);

    return (
        <div>
            <p>Test</p>
        </div>
    );
};

export default Test;
