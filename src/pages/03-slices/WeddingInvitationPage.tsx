import { WhiteCard } from "@/components";
import { useWeddingBoundStore } from "@/stores/wedding";

export const WeddingInvitationPage = () => {
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
	const setIsConfirmed = useWeddingBoundStore((state) => state.setIsConfirmed);
	const isConfirmed = useWeddingBoundStore((state) => state.isConfirmed);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log({ eventDate, eventTime, guestCount, firstName, lastName, isConfirmed });
	};

	return (
		<>
			<h1>Invitación de Boda</h1>
			<p>Zustand segmentado en slices</p>
			<hr />

			<WhiteCard className="flex justify-center items-center p-12">
				<div className="mx-auto w-full max-w-[550px]">
					<form onSubmit={onSubmit}>
						<div className="flex flex-wrap -mx-3">
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="firstName">
										Nombre:
									</label>
									<input
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										type="text"
										name="firstName"
										id="firstName"
										placeholder="Ej: Jane"
									/>
								</div>
							</div>
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="lastName">
										Apellido:
									</label>
									<input
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										type="text"
										name="lastName"
										id="lastName"
										placeholder="Ej: Smith"
									/>
								</div>
							</div>
						</div>
						<div className="mb-5">
							<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="guestNumber">
								¿Con cuántos invitados vendrás?
							</label>
							<input
								value={guestCount}
								onChange={(e) => setGuestCount(Number(e.target.value))}
								type="number"
								name="guestNumber"
								id="guestNumber"
								placeholder="Ej: 5"
								min="0"
								className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div className="flex flex-wrap -mx-3">
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="eventDate">
										Fecha de evento:
									</label>
									<input
										type="date"
										name="eventDate"
										id="eventDate"
										value={eventDate}
										onChange={(e) => setEventDate(e.target.value)}
									/>
								</div>
							</div>
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="eventTime">
										Hora del evento:
									</label>
									<input
										type="time"
										name="eventTime"
										id="eventTime"
										value={eventTime}
										onChange={(e) => setEventTime(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className="mb-5">
							<span className="mb-3 block text-base font-medium text-[#07074D]">¿Asistirás?</span>
							<div className="flex items-center space-x-6">
								<label
									className="flex items-center gap-1 text-base font-medium text-[#07074D] cursor-pointer"
									htmlFor="radioButton1"
								>
									<input
										type="radio"
										name="isComing"
										id="radioButton1"
										className="w-5 h-5 cursor-pointer"
										onChange={() => setIsConfirmed(true)}
										checked={isConfirmed}
									/>
									<span>Si</span>
								</label>

								<label
									className="flex items-center gap-1 text-base font-medium text-[#07074D] cursor-pointer"
									htmlFor="radioButton2"
								>
									<input
										type="radio"
										name="isComing"
										id="radioButton2"
										className="w-5 h-5 cursor-pointer"
										onChange={() => setIsConfirmed(false)}
										checked={!isConfirmed}
									/>
									<span>No</span>
								</label>
							</div>
						</div>

						<div>
							<button type="submit">Enviar</button>
						</div>
					</form>
				</div>
			</WhiteCard>
		</>
	);
};
