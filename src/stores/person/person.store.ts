import type z from "zod";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "@/stores/storages/firebase-storage";
import { useWeddingBoundStore } from "@/stores/wedding";
import { personStateSchema } from "./person.schema";

// import { customSessionStorage } from "../storages/session-storage";
// import { firebaseStorageOptimized } from "../storages/firebase-storage-optimized";

type PersonState = z.infer<typeof personStateSchema>;

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
				// `persist` llama a merge en toda hidratación, incluida la primera, donde
				// pasa undefined porque todavía no hay nada guardado. Eso no es corrupción,
				// así que no debe avisar — y como el resultado de merge reemplaza el estado
				// entero, devolver cualquier cosa que no sea `current` pisa los defaults.
				if (persisted === undefined) return current;

				const parsed = personStateSchema.safeParse(persisted);

				if (!parsed.success) {
					if (import.meta.env.DEV) {
						console.warn("[person-storage] estado persistido inválido, se usan los valores iniciales", {
							received: persisted,
							issues: parsed.error.issues,
						});
					}

					return current;
				}

				return { ...current, ...parsed.data };
			},
		}),
	),
);

// De esta manera nos suscribimos al store de Person. El callback trae:
// nextState, prevState, que son las instancias del estado de Person.
// Al usar useWeddingBoundStore Podemos asignar las variables recolectadas
// con anterioridad del nextState. Tener cuidado de no hacer esta llamada
// cíclica: o sea, hacer lo mismo en useWeddingBoundStore.
usePersonStore.subscribe((nextState) => {
	const { firstName, lastName } = nextState;
	useWeddingBoundStore.getState().setFirstName(firstName);
	useWeddingBoundStore.getState().setLastName(lastName);
});
