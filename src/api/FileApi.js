'use client'

import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const FileApi = {

    getPresignedUrlsToUploadFiles: (files) => {


        let fileInfos = []

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            let fileInfo = {
                fileName : file.name,
                fileType: file.type
            }

            fileInfos.push(fileInfo)
        }

        let payload = {}
        payload['fileInfos'] = fileInfos

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return instance.post('/pitaconcrete/files/get-upload-urls', payload, options);
    },
    uploadFileToS3: (file, uploadUrl) => {

        var awsInstance = axios.create();

        const options = {
            headers: {
                'Content-Type': file.type,
            }
        };

        return awsInstance.put(uploadUrl, file, options)
    },
    // uploadFiles: (slug, formData) => {
    //     console.log("uploadFiles...")
    //     const options = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     };
    //     return instance.post('/pitaconcrete/files/upload?slug='+slug, formData, options);
    // }

}

export default FileApi;