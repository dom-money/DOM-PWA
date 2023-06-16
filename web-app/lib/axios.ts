import { P2P_SERVICE_API_URL } from '@/constants';
import axios from 'axios';

const backendClient = axios.create({
  baseURL: P2P_SERVICE_API_URL,
});

export default backendClient;

