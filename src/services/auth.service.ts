import { AxiosError } from "axios";
import { tesloApi } from "@/api/teslo.api";
import type { User } from "@/interfaces";

export interface LoginResponse extends User {
	token: string;
}

// biome-ignore lint/complexity/noStaticOnlyClass: I prefer to manage this methods as static ones
export class AuthService {
	static async login(email: string, password: string): Promise<LoginResponse> {
		try {
			const response = await tesloApi.post<LoginResponse>("/auth/login", {
				email,
				password,
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("👀 ~ AxiosError:", { error: error.response?.data });
				throw new Error(error.response?.data);
			}
			console.log("👀 ~ CatchError:", { error });
			throw new Error("Unable to login");
		}
	}

	static async checkStatus(): Promise<LoginResponse> {
		try {
			const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log({ error: error.response?.data });
				throw new Error(error.response?.data);
			}
			console.log({ error });
			throw new Error("Unauthorized");
		}
	}
}
