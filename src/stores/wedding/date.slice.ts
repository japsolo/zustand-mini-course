import type { StateCreator } from "zustand";

interface DateState {
	eventDate?: Date;
}

interface Actions {
	getEventDate: () => string;
	getEventTime: () => string;
	setEventDate: (partialDate: string) => void;
	setEventTime: (partialDate: string) => void;
}

export type DateSlice = DateState & Actions;

/*
 * Base sobre la que se aplican los cambios parciales de fecha y hora.
 * `new Date("")` es un Invalid Date, y sobre él las dos APIs no se comportan
 * igual: `setFullYear` opera (la spec trata el tiempo como 0) pero `setHours`
 * devuelve NaN y deja la fecha inválida. Partir siempre de una fecha válida
 * evita que elegir la hora antes que la fecha deje el estado en "NaN:NaN".
 */
const baseDate = (current?: Date) => (current ? new Date(current) : new Date());

export const createDateSlice: StateCreator<DateSlice> = (set, get) => {
	return {
		getEventDate: () => {
			const date = get().eventDate;
			if (!date) return "";
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const day = date.getDate().toString().padStart(2, "0");
			return `${year}-${month}-${day}`;
		},
		getEventTime: () => {
			const date = get().eventDate;
			if (!date) return "";
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");
			return `${hours}:${minutes}`;
		},
		setEventDate: (partialDate: string) => {
			if (partialDate.trim().length === 0) {
				set({ eventDate: undefined });
				return;
			}

			const [year, month, day] = partialDate.split("-").map(Number);
			if ([year, month, day].some((part) => !Number.isFinite(part))) return;

			set((state) => {
				const newDate = baseDate(state.eventDate);
				newDate.setFullYear(year, month - 1, day);
				return { eventDate: newDate };
			});
		},
		setEventTime: (time: string) => {
			if (time.trim().length === 0) {
				set({ eventDate: undefined });
				return;
			}

			const [hours, minutes] = time.split(":").map(Number);
			if ([hours, minutes].some((part) => !Number.isFinite(part))) return;

			set((state) => {
				const newDate = baseDate(state.eventDate);
				// Segundos y milisegundos a 0: el input solo expone HH:mm, así que
				// arrastrarlos desde la base dejaría precisión que nadie eligió.
				newDate.setHours(hours, minutes, 0, 0);
				return { eventDate: newDate };
			});
		},
	};
};
