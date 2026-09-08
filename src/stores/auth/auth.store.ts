import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AuthStatus, User } from "@/interfaces";
import { AuthService } from "@/services";
import { usePersonStore } from "@/stores/person/person.store";

export type AuthState = {
	status: AuthStatus;
	token?: string;
	user?: User;
};

interface Actions {
	loginUser: (email: string, password: string) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
	logoutUser: () => void;
}

type AuthStore = AuthState & Actions;

const storeApi: StateCreator<AuthStore, [["zustand/devtools", never], ["zustand/persist", unknown]]> = (set) => ({
	status: "pending",
	token: undefined,
	user: undefined,
	loginUser: async (email: string, password: string) => {
		try {
			const { token, ...user } = await AuthService.login(email, password);
			set({ status: "authorized", token, user }, false, { type: "loginUser" });
		} catch {
			set({ status: "unauthorized", token: undefined, user: undefined }, false, { type: "loginUser" });
			throw "Unauthorized";
		}
	},
	checkAuthStatus: async () => {
		try {
			const { token, ...user } = await AuthService.checkStatus();
			set({ status: "authorized", token, user }, false, { type: "checkAuthStatus" });
		} catch {
			set({ status: "unauthorized", token: undefined, user: undefined }, false, { type: "checkAuthStatus" });
			throw "Unauthorized";
		}
	},
	logoutUser: () => set({ status: "unauthorized", token: undefined, user: undefined }, false, { type: "logoutUser" }),
});

export const useAuthStore = create<AuthStore>()(devtools(persist(storeApi, { name: "auth-storage" })));

useAuthStore.subscribe((nextState) => {
	const fullName = nextState.user?.fullName;

	if (fullName && fullName.length > 0) {
		const firstName = fullName?.split(" ")[0];
		const lastName = fullName?.split(" ")[1];
		usePersonStore.getState().setFirstName(firstName);
		usePersonStore.getState().setLastName(lastName);
	}
});
