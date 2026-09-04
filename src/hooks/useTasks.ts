import { useState } from "react";
import Swal from "sweetalert2";
import { type TaskStatus, useTaskStore } from "@/stores";

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
				if (!value) return "El nombre de la tarea es obligatorio";
			},
		});

		const { isConfirmed, value: taskText } = response;

		if (!isConfirmed) return;

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
