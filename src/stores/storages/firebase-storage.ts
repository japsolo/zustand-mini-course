import { createJSONStorage, type StateStorage } from "zustand/middleware";

// Firebase Storage
// Follow this tutorial: https://www.youtube.com/watch?v=EXY9ChC2dZ0&list=PLCKuOXG0bPi02_By1fW2_Z_RA3UuDfwp2

/*
 * In this URL we will found the realtime database
 * https://console.firebase.google.com/project/zustand-storage-7ec65/database/zustand-storage-7ec65-default-rtdb/data?hl=es-419
 * this functionality save the data in the firebase data base, an give us an endpoint like this:
 * https://zustand-storage-7ec65-default-rtdb.firebaseio.com/zustand/person-storage.json
 */

const fireBaseURL = "https://zustand-storage-7ec65-default-rtdb.firebaseio.com/zustand";

const storageAPI: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		try {
			const data = await fetch(`${fireBaseURL}/${name}.json`).then((res) => res.json());
			return JSON.stringify(data); // data is an object, that's why we need to serialized as string
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	setItem: async (name: string, value: string): Promise<void> => {
		console.log("👀 ~ typeof value:", typeof value);
		try {
			await fetch(`${fireBaseURL}/${name}.json`, {
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
