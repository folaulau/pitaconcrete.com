'use client'

import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const FileApi = {

    getPresignedUrlToUploadFile: (slug) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': user.token
            }
        };
        return instance.get('/files/s3-presigned-url?slug='+slug, options);
    },
    uploadFiles: (slug, formData) => {
        console.log("uploadFiles...")
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return instance.post('/pitaconcrete/files/upload?slug='+slug, formData, options);
    }

}

export default FileApi;