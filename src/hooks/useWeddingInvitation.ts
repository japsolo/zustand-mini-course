import { useWeddingBoundStore } from "@/stores/wedding";

export const useWeddingInvitation = () => {
	const firstName = useWeddingBoundStore((state) => state.firstName);
	const lastName = useWeddingBoundStore((state) => state.lastName);
	const setFirstName = useWeddingBoundStore((state) => state.setFirstName);
	const setLastName = useWeddingBoundStore((state) => state.setLastName);
	const guestCount = useWeddingBoundStore((state) => state.guestCount);
	const setGuestCount = useWeddingBoundStore((state) => state.setGuestCount);
	const eventDate = useWeddingBoundStore((state) => state.getEventDate());
	const eventTime = useWeddingBoundStore((state) => state.getEventTime());
	const setEventDate = useWeddingBoundStore((state) => state.setEventDate);
	const setEventTime = useWeddingBoundStore((state) => state.setEventTime);
	const setIsComing = useWeddingBoundStore((state) => state.setIsComing);
	const isComing = useWeddingBoundStore((state) => state.isComing);

	const resetValues = () => {
		setFirstName("");
		setLastName("");
		setGuestCount(0);
		setEventDate("");
		setEventTime("");
		setIsComing(undefined);
	};

	return {
		firstName,
		lastName,
		guestCount,
		eventDate,
		eventTime,
		isComing,

		setFirstName,
		setLastName,
		setGuestCount,
		setEventDate,
		setEventTime,
		setIsComing,
		resetValues,
	};
};
