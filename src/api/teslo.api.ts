import axios from "axios";
import { useAuthStore } from "@/stores";

export const tesloApi = axios.create({
	baseURL: "http://localhost:3000/api",
});

// Interceptor to read the token
tesloApi.interceptors.request.use((config) => {
	// De esta manera podemos acceder al store de
	// Zustand fuera de React. :)
	const token = useAuthStore.getState().token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
