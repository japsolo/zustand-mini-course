import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

interface Props {
	title: string;
	handleAddTask: () => void;
}

export const TaskHeader = ({ title, handleAddTask }: Props) => {
	return (
		<div className="flex relative flex-row justify-between">
			<div className="flex justify-center items-center">
				<div className="flex justify-center items-center w-9 h-9 bg-indigo-100 rounded-full">
					<span className="flex justify-center items-center w-6 h-6 text-brand-500">
						<IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
					</span>
				</div>

				<h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
			</div>

			<button type="button" onClick={handleAddTask}>
				<IoAddOutline />
			</button>
		</div>
	);
};
