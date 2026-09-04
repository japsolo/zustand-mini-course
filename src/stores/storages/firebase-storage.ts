import { createJSONStorage, type StateStorage } from "zustand/middleware";
import { type ENV, env } from "@/utils";

// Firebase Storage
// Follow this tutorial: https://www.youtube.com/watch?v=EXY9ChC2dZ0&list=PLCKuOXG0bPi02_By1fW2_Z_RA3UuDfwp2

/*
 * In this URL we will found the realtime database
 * this functionality save the data in the firebase data base, an give us an endpoint like this:
 * https://zustand-storage-XXXX-default-ZZZZ.firebaseio.com/zustand/person-storage.json
 */

const config: ENV = env;

const storageAPI: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		try {
			const data = await fetch(`${config.VITE_FIREBASE_URL}/${name}.json`).then((res) => res.json());

			if (!data) return null;

			return JSON.stringify(data); // data is an object, that's why we need to serialized as string
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	setItem: async (name: string, value: string): Promise<void> => {
		try {
			await fetch(`${config.VITE_FIREBASE_URL}/${name}.json`, {
				method: "PUT",
				body: value, // value is an object but parsed to string, firebase knows how to handle it, that's why in getItem we need to serialized
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	removeItem: (name: string): void => {
		sessionStorage.removeItem(name);
	},
};

export const firebaseStorage = createJSONStorage(() => storageAPI);
