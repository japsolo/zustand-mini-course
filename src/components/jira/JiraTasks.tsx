import classNames from "classnames";
import { useTasks } from "@/hooks/useTasks";
import type { Task, TaskStatus } from "@/stores";
import { SingleTask } from "./SingleTask";
import { TaskHeader } from "./TaskHeader";

interface Props {
	title: string;
	status: TaskStatus;
	tasks: Task[];
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
	const { isDragging, onDragOver, handleAddTask, handleDragOver, handleDragLeave, handleDrop } = useTasks({
		status,
		section: title,
	});
	const baseClassNames =
		"!text-black relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] border";

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: draggable container for task reordering
		<div
			className={classNames(baseClassNames, {
				"border-blue-500 border-dashed": isDragging,
				"bg-green-50 border-green-500 shadow-2xl": onDragOver,
			})}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{/* Task Header */}
			<TaskHeader title={title} handleAddTask={handleAddTask} />

			{/* Task Items */}
			<div className="w-full h-full">
				{tasks.map((task) => (
					<SingleTask key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};
