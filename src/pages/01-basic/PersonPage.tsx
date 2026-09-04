import { useShallow } from "zustand/shallow";
import { WhiteCard } from "@/components";
import { usePersonStore } from "@/stores";

export const PersonPage = () => {
	const { firstName, lastName } = usePersonStore(useShallow((state) => state));
	const setFirstName = usePersonStore((state) => state.setFirstName);
	const setLastName = usePersonStore((state) => state.setLastName);
	const fullName = `${firstName} ${lastName}`;

	return (
		<>
			<h1>Persona</h1>
			<p>Información que se compartirá a otro store, Session Storage y Firebase</p>
			<hr />
			{fullName.trim().length > 0 && <h2 className="mb-2 text-blue-700">{fullName} Page</h2>}

			<WhiteCard className="flex justify-center items-center p-12">
				<div className="mx-auto w-full max-w-[550px]">
					<form>
						<div className="flex flex-wrap -mx-3">
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label htmlFor="firstName" className="mb-3 block text-base font-medium text-[#07074D]">
										Nombre:
									</label>
									<input
										type="text"
										name="firstName"
										id="firstName"
										placeholder="Primer Nombre"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
							</div>
							<div className="px-3 w-full sm:w-1/2">
								<div className="mb-5">
									<label htmlFor="lastName" className="mb-3 block text-base font-medium text-[#07074D]">
										Apellido:
									</label>
									<input
										type="text"
										name="lastName"
										id="lastName"
										placeholder="Apellido"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<pre className="bg-gray-200 p-5 rounded-[20px]">
							{JSON.stringify(
								{
									firstName,
									lastName,
								},
								null,
								2,
							)}
						</pre>
					</form>
				</div>
			</WhiteCard>
		</>
	);
};
