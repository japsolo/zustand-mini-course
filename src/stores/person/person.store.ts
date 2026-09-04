import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "@/stores/storages/firebase-storage";
import { personStateSchema } from "./person.schema";

// import { customSessionStorage } from "../storages/session-storage";
// import { firebaseStorageOptimized } from "../storages/firebase-storage-optimized";

interface PersonState {
	firstName: string;
	lastName: string;
}

interface Actions {
	setFirstName: (value: string) => void;
	setLastName: (value: string) => void;
}

type PersonStore = PersonState & Actions;

/*
 * [["zustand/devtools", never], ["zustand/persist", unknown]] allow us to pass
 * a third parameter to set(function), that parameter is an object or string
 * to set the action name, that way in redux devtools we can see the action name
 */
const storeAPI: StateCreator<PersonStore, [["zustand/devtools", never], ["zustand/persist", unknown]]> = (set) => ({
	firstName: "",
	lastName: "",
	setFirstName: (value: string) => set(() => ({ firstName: value }), false, { type: "setFirstName" }),
	setLastName: (value: string) => set(() => ({ lastName: value }), false, { type: "setLastName" }),
});

export const usePersonStore = create<PersonStore>()(
	// devtools(persist(storeAPI, { name: "person-storage", storage: customSessionStorage })),
	devtools(
		persist(storeAPI, {
			name: "person-storage",
			storage: firebaseStorage,
			merge: (persisted, current) => {
				// const { success, data } = personStateSchema.safeParse(persisted);

				// if (success) {
				// 	return {
				// 		...current,
				// 		...data,
				// 	};
				// }

				// console.log("Only return current data");

				// return {
				// 	...current,
				// };

				return {
					...current,
					...personStateSchema.parse(persisted),
				};
			},
		}),
	),
);
