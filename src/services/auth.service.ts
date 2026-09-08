import { AxiosError } from "axios";
import { apiErrorSchema } from "@/api/api-error.schema";
import { tesloApi } from "@/api/teslo.api";
import type { User } from "@/interfaces";

export interface LoginResponse extends User {
	token: string;
}

/**
 * Builds an Error with a readable `message` and the original API body in `cause`.
 * `new Error(object)` would stringify to "[object Object]", losing the payload.
 */
const toApiError = (data: unknown, fallbackMessage: string): Error => {
	const parsed = apiErrorSchema.safeParse(data);

	if (!parsed.success) return new Error(fallbackMessage, { cause: data });

	const { message, ...cause } = parsed.data;
	return new Error(Array.isArray(message) ? message.join(", ") : message, { cause });
};

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
				throw toApiError(error.response?.data, "Unable to login");
			}
			throw new Error("Unable to login", { cause: error });
		}
	}

	static async checkStatus(): Promise<LoginResponse> {
		try {
			const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw toApiError(error.response?.data, "Unauthorized");
			}
			throw new Error("Unauthorized", { cause: error });
		}
	}
}
