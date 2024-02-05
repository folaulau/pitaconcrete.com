'use client'

import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const ContactApi = {

    create: (message) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return instance.post('/pitaconcrete/contact/message', message, options);
    },
    getAllMessages: () => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return instance.get('/pitaconcrete/contact/get-all-messages', options)
    },
    getById: (id) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return instance.get('/pitaconcrete/contact/get-one?id='+id, options)
    }

}

export default ContactApi;