import axios from 'axios';
import { Platform } from 'react-native';

const localhost =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3002' // emulador Android
    : 'http://localhost:3002'; // navegador ou emulador iOS

const api = axios.create({
  baseURL: localhost,
  timeout: 8000, // aumentei um pouco o tempo limite
});

export default api;