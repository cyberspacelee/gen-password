import axios from 'axios';
import { BACKEND_URL } from './constants';

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000, // Timeout if necessary
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
});
