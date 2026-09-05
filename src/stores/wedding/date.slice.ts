import type { StateCreator } from "zustand";

interface DateState {
	eventDate: Date;
}

interface Actions {
	getEventDate: () => string;
	getEventTime: () => string;
	setEventDate: (partialDate: string) => void;
	setEventTime: (partialDate: string) => void;
}

export type DateSlice = DateState & Actions;

export const createDateSlice: StateCreator<DateSlice> = (set, get) => {
	return {
		eventDate: new Date(),
		getEventDate: () => {
			const date = get().eventDate;
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			return `${year}-${month}-${day}`;
		},
		getEventTime: () => {
			const hours = get().eventDate.getHours().toString().padStart(2, "0");
			const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");
			return `${hours}:${minutes}`;
		},
		setEventDate: (partialDate: string) => {
			const [year, month, day] = partialDate.split("-").map(Number);
			if ([year, month, day].some((part) => !Number.isFinite(part))) return;

			set((state) => {
				const newDate = new Date(state.eventDate);
				newDate.setFullYear(year, month - 1, day);
				return { eventDate: newDate };
			});
		},
		setEventTime: (time: string) => {
			const [hours, minutes] = time.split(":").map(Number);
			if ([hours, minutes].some((part) => !Number.isFinite(part))) return;

			set((state) => {
				const newDate = new Date(state.eventDate);
				newDate.setHours(hours, minutes);
				return { eventDate: newDate };
			});
		},
	};
};
