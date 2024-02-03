'use client'

import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const ProjectApi = {

    createUpdate: (project) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return instance.post('/pitaconcrete/projects/create-update', project, options);
    },
    getById: (id) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return instance.get('pitaconcrete/projects/get-one?id='+id, options)
    },
    getAllMedia: () => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return instance.get('pitaconcrete/media/get-all', options)
    }

}

export default ProjectApi;