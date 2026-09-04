import { WhiteCard } from "@/components";

export const WeddingInvitationPage = () => {
	return (
		<>
			<h1>Invitación de Boda</h1>
			<p>Zustand segmentado en slices</p>
			<hr />

			<WhiteCard className="flex justify-center items-center p-12">
				<div className="mx-auto w-full max-w-[550px]">
					<form>
						<div className="flex flex-wrap -mx-3">
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="firstName">
										Primer Nombre
									</label>
									<input type="text" name="firstName" id="firstName" placeholder="Primer Nombre" />
								</div>
							</div>
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="lastName">
										Apellido
									</label>
									<input type="text" name="lastName" id="lastName" placeholder="Apellido" />
								</div>
							</div>
						</div>
						<div className="mb-5">
							<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="guestNumber">
								¿Cuántos invitados traerá?
							</label>
							<input
								type="number"
								name="guestNumber"
								id="guestNumber"
								placeholder="5"
								min="0"
								className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
							/>
						</div>

						<div className="flex flex-wrap -mx-3">
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="eventDate">
										Fecha de evento
									</label>
									<input type="date" name="eventDate" id="eventDate" />
								</div>
							</div>
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label className="mb-3 block text-base font-medium text-[#07074D]" htmlFor="eventTime">
										Hora del evento
									</label>
									<input type="time" name="eventTime" id="eventTime" />
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
									<input type="radio" name="isComing" id="radioButton1" className="w-5 h-5 cursor-pointer" />
									<span>Si</span>
								</label>

								<label
									className="flex items-center gap-1 text-base font-medium text-[#07074D] cursor-pointer"
									htmlFor="radioButton2"
								>
									<input type="radio" name="isComing" id="radioButton2" className="w-5 h-5 cursor-pointer" />
									<span>No</span>
								</label>
							</div>
						</div>

						<div>
							<button type="button">Enviar</button>
						</div>
					</form>
				</div>
			</WhiteCard>
		</>
	);
};
