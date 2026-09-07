import { useState } from "react";
import z from "zod";
import { WhiteCard } from "@/components";
import { useWeddingInvitation } from "@/hooks/useWeddingInvitation";
import { weddingInvitationSchema } from "@/stores/wedding/wedding-invitation.schema";

export const WeddingInvitationPage = () => {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const {
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
	} = useWeddingInvitation();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = Object.fromEntries(new FormData(e.currentTarget));

		const parsed = weddingInvitationSchema.safeParse(formData);

		if (!parsed.success) {
			const { fieldErrors } = z.flattenError(parsed.error);
			// Solo el primer mensaje por campo: es el que se muestra debajo del input.
			const mappedErrors = Object.fromEntries(
				Object.entries(fieldErrors).map(([field, messages]) => [field, messages[0]]),
			);
			setErrors(mappedErrors);
			return;
		}

		setErrors({});
		resetValues();

		console.log("%cDatos enviados!!!", "color: orange; font-size: 24px");
		console.log("data:", parsed.data);
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
									{errors.firstName && <p className="text-xs text-red-600"> {errors.firstName}</p>}
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
									{errors.lastName && <p className="text-xs text-red-600"> {errors.lastName}</p>}
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
								name="guestCount"
								id="guestCount"
								placeholder="Ej: 5"
								min="0"
								className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
							{errors.guestCount && <p className="text-xs text-red-600"> {errors.guestCount}</p>}
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
									{errors.eventDate && <p className="text-xs text-red-600"> {errors.eventDate}</p>}
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
									{errors.eventTime && <p className="text-xs text-red-600"> {errors.eventTime}</p>}
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
										onChange={() => setIsComing(true)}
										checked={isComing === true}
										value="Si"
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
										onChange={() => setIsComing(false)}
										checked={isComing === false}
										value="No"
									/>
									<span>No</span>
								</label>
							</div>
							{errors.isComing && <p className="text-xs text-red-600"> {errors.isComing}</p>}
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
