import axios from "axios";
import * as Device from "expo-device";
import { Platform } from "react-native";

function isAndroidEmulator() {
  return Platform.OS === "android" && !Device.isDevice;
}

export const localhost = isAndroidEmulator()
  ? "http://10.0.2.2:3002"
  : process.env.EXPO_PUBLIC_API_URL || "http://localhost:3002";

console.log("🌐 Base URL da API:", localhost);

const api = axios.create({
  baseURL: localhost,
  timeout: 8000,
});

export default api;
