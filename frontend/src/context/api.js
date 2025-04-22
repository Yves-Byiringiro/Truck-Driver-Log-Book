import axios from 'axios';


export const baseURL = import.meta.env.VITE_API_ENDPOINT;

const reqInstance = axios.create({
  baseURL: baseURL,
});

export default reqInstance;