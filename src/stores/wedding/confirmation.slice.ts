import type { StateCreator } from "zustand";

interface ConfirmationState {
	isConfirmed: boolean;
}

interface Actions {
	setIsConfirmed: (isConfirm: boolean) => void;
}

export type ConfirmationSlice = ConfirmationState & Actions;

export const createConfirmationSlice: StateCreator<ConfirmationSlice> = (set) => {
	return {
		isConfirmed: false,
		setIsConfirmed: (isConfirmed: boolean) => set({ isConfirmed }),
	};
};
