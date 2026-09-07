import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type ComingSlice, createComingSlice } from "@/stores/wedding/confirmation.slice";
import { createDateSlice, type DateSlice } from "@/stores/wedding/date.slice";
import { createGuestSlice, type GuestSlice } from "@/stores/wedding/guest.slice";
import { createPersonSlice, type PersonSlice } from "@/stores/wedding/person.slice";

type SharedState = PersonSlice & GuestSlice & DateSlice & ComingSlice;

export const useWeddingBoundStore = create<SharedState>()(
	devtools((...a) => ({
		...createPersonSlice(...a),
		...createGuestSlice(...a),
		...createDateSlice(...a),
		...createComingSlice(...a),
	})),
);
