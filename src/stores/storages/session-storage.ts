import { createJSONStorage, type StateStorage } from "zustand/middleware";

// Custom Storage — sessionStorage (localStorage by default)
const storageAPI: StateStorage = {
	getItem: (name: string): string | null | Promise<string | null> => {
		const data = sessionStorage.getItem(name);
		return data;
	},
	setItem: (name: string, value: string): void => {
		sessionStorage.setItem(name, value);
	},
	removeItem: (name: string): void => {
		sessionStorage.removeItem(name);
	},
};

export const customSessionStorage = createJSONStorage(() => storageAPI);
