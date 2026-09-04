import { useShallow } from "zustand/shallow";
import { WhiteCard } from "@/components";
import { useBearStore } from "@/stores";

export const BearPage = () => {
	return (
		<>
			<h1>Contador de Osos</h1>
			<p>Manejo de estado simple de Zustand</p>
			<hr />

			<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				<BlackBears />
				<PolarBears />
				<PandaBears />
				<BearsDisplay />
			</div>
		</>
	);
};

const BlackBears = () => {
	const blackBears = useBearStore((state) => state.blackBears);
	const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);

	return (
		<WhiteCard centered>
			<h2>Osos Negros</h2>
			<div className="flex flex-col md:flex-row">
				<button type="button" onClick={() => increaseBlackBears(+1)} className="bg-blue-600">
					+1
				</button>
				<span className="mx-2 text-3xl lg:mx-10">{blackBears}</span>
				<button type="button" onClick={() => increaseBlackBears(-1)} className="bg-blue-600">
					-1
				</button>
			</div>
		</WhiteCard>
	);
};

const PolarBears = () => {
	const polarBears = useBearStore((state) => state.polarBears);
	const increasePolarBears = useBearStore((state) => state.increasePolarBears);
	/*
	 * the official recomendation is to not destructuring the state
	 * beacuse it will generate re-renders everywhere the state
	 * is used.
	 */

	return (
		<WhiteCard centered>
			<h2>Osos Polares</h2>

			<div className="flex flex-col md:flex-row">
				<button type="button" className="bg-blue-600" onClick={() => increasePolarBears(+1)}>
					+1
				</button>
				<span className="mx-2 text-3xl lg:mx-10"> {polarBears} </span>
				<button type="button" className="bg-blue-600" onClick={() => increasePolarBears(-1)}>
					-1
				</button>
			</div>
		</WhiteCard>
	);
};

const PandaBears = () => {
	const pandaBears = useBearStore((state) => state.pandaBears);
	const increasePandaBears = useBearStore((state) => state.increasePandaBears);

	return (
		<WhiteCard centered>
			<h2>Osos Pandas</h2>

			<div className="flex flex-col md:flex-row">
				<button type="button" className="bg-blue-600" onClick={() => increasePandaBears(+1)}>
					+1
				</button>
				<span className="mx-2 text-3xl lg:mx-10"> {pandaBears} </span>
				<button type="button" className="bg-blue-600" onClick={() => increasePandaBears(-1)}>
					-1
				</button>
			</div>
		</WhiteCard>
	);
};

export const BearsDisplay = () => {
	/*
	 * useShallow avoids the component re-render if the states (pre / new)
	 * are the same
	 */
	const bears = useBearStore(useShallow((state) => state.bears));
	const doNothing = useBearStore((state) => state.doNothing);
	const addBear = useBearStore((state) => state.addBear);
	const clearBears = useBearStore((state) => state.clearBears);

	return (
		<WhiteCard>
			<h2>Osos</h2>
			<button type="button" onClick={doNothing} className="mb-2 bg-blue-600">
				Hacer nada
			</button>
			<button type="button" onClick={addBear} className="mb-2 bg-blue-600">
				Agregar oso
			</button>
			<button type="button" onClick={clearBears} className="mb-2 bg-blue-600">
				Borrar osos
			</button>

			<pre>{JSON.stringify(bears, null, 2)}</pre>

			<ul className="list-disc">
				{bears.map((bear) => (
					<li key={bear.id} className="text-lg text-blue-600">
						{bear.name}
					</li>
				))}
			</ul>
		</WhiteCard>
	);
};

// interface BearsProps {
// 	title: string;
// 	count: number;
// 	increaseAndDecrease: (by: number) => void;
// }

// const Bears = ({ title, count, increaseAndDecrease }: BearsProps) => {
// 	return (
// 		<WhiteCard centered>
// 			<h2>{title}</h2>

// 			<div className="flex flex-col md:flex-row">
// 				<button
// 					type="button"
// 					className="bg-blue-600"
// 					onClick={() => increaseAndDecrease(+1)}
// 				>
// 					+1
// 				</button>
// 				<span className="mx-2 text-3xl lg:mx-10"> {count} </span>
// 				<button
// 					type="button"
// 					className="bg-blue-600"
// 					onClick={() => increaseAndDecrease(-1)}
// 				>
// 					-1
// 				</button>
// 			</div>
// 		</WhiteCard>
// 	);
// };
