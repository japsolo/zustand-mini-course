import type { StateCreator } from "zustand";

interface ComingState {
	isComing?: boolean;
}

interface Actions {
	setIsComing: (isConfirm: boolean | undefined) => void;
}

export type ComingSlice = ComingState & Actions;

export const createComingSlice: StateCreator<ComingSlice> = (set) => {
	return {
		setIsComing: (isComing: boolean | undefined) => set({ isComing }),
	};
};
