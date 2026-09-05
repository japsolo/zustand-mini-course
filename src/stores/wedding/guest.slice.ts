import type { StateCreator } from "zustand";

interface GuestState {
	guestCount: number;
}

interface Actions {
	setGuestCount: (count: number) => void;
}

export type GuestSlice = GuestState & Actions;

export const createGuestSlice: StateCreator<GuestSlice> = (set) => {
	return {
		guestCount: 0,
		setGuestCount: (count: number) => set({ guestCount: count > 0 ? count : 0 }),
	};
};
