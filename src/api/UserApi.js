import axios from 'axios';
import Auth from '../components/Auth';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

var user = Auth.getAuth()

const UserApi = {

    sigin: (payload) => {

        console.log("signin to, "+process.env.NEXT_PUBLIC_API_URL)

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return instance.post('/pitaconcrete/signin', JSON.stringify(payload), options);
    },
    getProfile: () => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': user.token
            }
        };
        return instance.get('/users/'+user.uuid, options);
    },
    updateProfile: (payload) => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'token': user.token
            }
        };
        return instance.put('/users', JSON.stringify(payload), options);
    },
}

export default UserApi;