import { useShallow } from "zustand/shallow";
import { JiraTasks } from "@/components";
import { TaskStatus, useTaskStore } from "@/stores";

export const JiraPage = () => {
	const pendingTasks = useTaskStore(useShallow((state) => state.getTasksByStatus(TaskStatus.OPEN)));
	const inProgressTasks = useTaskStore(useShallow((state) => state.getTasksByStatus(TaskStatus.IN_PROGRESS)));
	const doneTasks = useTaskStore(useShallow((state) => state.getTasksByStatus(TaskStatus.DONE)));

	return (
		<>
			<h1>Tareas</h1>
			<p>Manejo de estado con objectos de Zustand</p>
			<hr />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<JiraTasks title="Pendientes" status={TaskStatus.OPEN} tasks={pendingTasks} />
				<JiraTasks title="En progreso" status={TaskStatus.IN_PROGRESS} tasks={inProgressTasks} />
				<JiraTasks title="Terminadas" status={TaskStatus.DONE} tasks={doneTasks} />
			</div>
		</>
	);
};
