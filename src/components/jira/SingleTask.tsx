import { IoReorderTwoOutline } from "react-icons/io5";
import { type Task, useTaskStore } from "@/stores";

interface Props {
	task: Task;
}

export const SingleTask = ({ task }: Props) => {
	const { title } = task;
	const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
	// const draggingTaskId = useTaskStore((state) => state.draggingTaskId);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: draggable container for task reordering
		<div
			className="flex justify-between items-center p-2 mt-5"
			draggable
			onDragStart={() => setDraggingTaskId(task.id)}
			onDragEnd={() => setDraggingTaskId(null)}
		>
			<div className="flex gap-2 justify-center items-center">
				<p className="text-base font-bold text-navy-700">{title}</p>
			</div>
			<span className="w-6 h-6 cursor-pointer text-navy-700">
				<IoReorderTwoOutline />
			</span>
		</div>
	);
};
