import axios from 'axios';

const api = axios.create({
   baseURL: 'localhost:5000',
   timeout: 1000
});

export default api;
