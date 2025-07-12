/*import axios from 'axios';
import { Platform } from 'react-native';

import * as Device from "expo-device";


function isAndroidEmulator() {
  return Platform.OS === "android" && !Device.isDevice;
}

/*const localhost =
  Platform.OS === 'android'
    ? 'http://192.168.0.140:3002' // emulador Android
    : 'http://localhost:3002'; // navegador ou emulador iOS
    */
  

 /*const localhost =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_API_URL // emulador Android
    : 'http://localhost:3002'; // navegador ou emulador iOS  
    
    console.log('localhost ', localhost)*/

  /**
 * Retorna a URL base da API dependendo do ambiente:
 * - Emulador Android: usa 10.0.2.2 (gateway do host)
 * - Celular real Android ou iOS: usa variável de ambiente EXPO_PUBLIC_API_URL
 */
/*export const localhost = isAndroidEmulator()
  ? "http://10.0.2.2:3002"
  : process.env.EXPO_PUBLIC_API_URL;
*/

/*export const localhost =
  Platform.OS === 'android'
    ? "http://10.0.2.2:3002"
    : process.env.EXPO_PUBLIC_API_URL;

 export const localhost = isAndroidEmulator()
  ? "http://10.0.2.2:3002"
  : process.env.EXPO_PUBLIC_API_URL;
   

console.log("🌐 Base URL da API:", localhost);  

const api = axios.create({
  baseURL: localhost,
  timeout: 8000, // aumentei um pouco o tempo limite
});

export default api;

*/


import axios from "axios";
import * as Device from "expo-device";
import { Platform } from "react-native";

/**
 * Detecta se o app está rodando num emulador Android.
 */
function isAndroidEmulator() {
  return Platform.OS === "android" && !Device.isDevice;
}

/**
 * Retorna a URL base da API dependendo do ambiente:
 * - Emulador Android: usa 10.0.2.2 (gateway do host)
 * - Senão, usa variável de ambiente EXPO_PUBLIC_API_URL (ex.: Docker)
 * - Se não definida, cai em http://localhost:3002 como fallback
 */
export const localhost = isAndroidEmulator()
  ? "http://10.0.2.2:3002"
  : process.env.EXPO_PUBLIC_API_URL || "http://localhost:3002";

console.log("🌐 Base URL da API:", localhost);

const api = axios.create({
  baseURL: localhost,
  timeout: 8000, // aumentei um pouco o tempo limite
});

export default api;
