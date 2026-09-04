import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Bear {
	id: number;
	name: string;
}

interface BearState {
	blackBears: number;
	polarBears: number;
	pandaBears: number;
	bears: Bear[];
	totalBears: () => number;
	increaseBlackBears: (by: number) => void;
	increasePolarBears: (by: number) => void;
	increasePandaBears: (by: number) => void;
	doNothing: () => void;
	addBear: () => void;
	clearBears: () => void;
}

const storeApi: StateCreator<BearState, [["zustand/devtools", never], ["zustand/persist", unknown]]> = (set, get) => ({
	blackBears: 10,
	polarBears: 5,
	pandaBears: 2,
	bears: [{ id: 1, name: "Oso 1" }],
	totalBears: (): number => get().blackBears + get().polarBears + get().pandaBears + get().bears.length,
	increaseBlackBears: (by: number) =>
		set((state) => ({ blackBears: state.blackBears + by }), false, { type: "increaseBlackBears" }),
	increasePolarBears: (by: number) =>
		set((state) => ({ polarBears: state.polarBears + by }), false, { type: "increasePolarBears" }),
	increasePandaBears: (by: number) =>
		set(
			(state) => {
				const currentValue = state.pandaBears;
				if (currentValue === 0 && by < 0) {
					return { pandaBears: currentValue };
				}
				return { pandaBears: currentValue + by };
			},
			false,
			{ type: "increasePandaBears" },
		),
	doNothing: () => set({ bears: [...get().bears] }, false, { type: "doNothing" }), // using get fn to fetch the previous state, same as state.bears
	addBear: () =>
		set(
			(state) => ({
				bears: [...state.bears, { id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}` }],
			}),
			false,
			{ type: "addBear" },
		),
	clearBears: () => set({ bears: [] }, false, { type: "clearBears" }),
});

export const useBearStore = create<BearState>()(devtools(persist(storeApi, { name: "bears-store" })));
