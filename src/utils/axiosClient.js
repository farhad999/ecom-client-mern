import axios from 'axios'
import {appConfig} from '../configs/app'

const axiosClient = axios.create({
    baseURL: appConfig.apiUrl,
    headers: {
        'accept': 'application/json',
    }
})

axiosClient.interceptors.request.use((config)=> {
    let token = localStorage.getItem('token');

    if(token){
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;

}, error => Promise.reject(error));

export default axiosClient;