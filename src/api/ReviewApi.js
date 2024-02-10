'use client'

import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const ReviewApi = {

    add: (review) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return instance.post('/pitaconcrete/reviews/add', review, options);
    },
    
    getAll: () => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return instance.get('pitaconcrete/reviews/get-all', options)
    }

}

export default ReviewApi;