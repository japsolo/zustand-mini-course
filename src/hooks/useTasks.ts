import { useState } from "react";
import Swal from "sweetalert2";
import { type TaskStatus, taskTitleSchema, useTaskStore } from "@/stores";

interface Options {
	status: TaskStatus;
	section: string;
}

export const useTasks = ({ status, section }: Options) => {
	const [onDragOver, setOnDragOver] = useState<boolean>(false);
	const isDragging = useTaskStore((state) => !!state.draggingTaskId);
	const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
	const addTask = useTaskStore((state) => state.addTask);

	const handleAddTask = async () => {
		const response = await Swal.fire({
			title: `Nueva tarea en: ${section}`,
			input: "text",
			inputPlaceholder: "Ej: comprar tomates",
			showCancelButton: true,
			inputValidator: (value) => {
				const { error, success } = taskTitleSchema.safeParse(value);

				if (!success) {
					return error.issues[0].message;
				}
			},
		});

		const { isConfirmed, value } = response;

		if (!isConfirmed) return;

		const { success, data: taskText } = taskTitleSchema.safeParse(value);

		if (!success) return;

		addTask(taskText, status);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setOnDragOver(false);
		onTaskDrop(status);
	};

	return {
		isDragging,
		onDragOver,
		handleAddTask,
		handleDragOver,
		handleDragLeave,
		handleDrop,
	};
};
