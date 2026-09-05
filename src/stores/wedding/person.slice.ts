import type { StateCreator } from "zustand";

interface PersonState {
	firstName: string;
	lastName: string;
}

interface Actions {
	setFirstName: (firstName: string) => void;
	setLastName: (lastName: string) => void;
}

export type PersonSlice = PersonState & Actions;

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
	firstName: "",
	lastName: "",
	setFirstName: (firstName: string) => set({ firstName }),
	setLastName: (lastName: string) => set({ lastName }),
});
