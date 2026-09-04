// import { produce } from "immer";
import { v4 as uuid } from "uuid";
import type z from "zod";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type Task, TaskStatus, taskStateSchema } from "./task.schema";

type TasksState = z.infer<typeof taskStateSchema>;

type Actions = {
	getTasksByStatus: (status: TaskStatus) => Task[];
	setDraggingTaskId: (taskId: string | null) => void;
	changeTaskStatus: (taskId: string, status: TaskStatus) => void;
	onTaskDrop: (status: TaskStatus) => void;
	addTask: (title: string, status: TaskStatus) => void;
};

type TaskStore = TasksState & Actions;

const storeAPI: StateCreator<
	TaskStore,
	[["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]]
> = (set, get) => ({
	draggingTaskId: null,
	tasks: {
		"ABC-1": { id: "ABC-1", title: "Task 1", status: TaskStatus.OPEN },
		"ABC-2": { id: "ABC-2", title: "Task 2", status: TaskStatus.IN_PROGRESS },
		"ABC-3": { id: "ABC-3", title: "Task 3", status: TaskStatus.OPEN },
		"ABC-4": { id: "ABC-4", title: "Task 4", status: TaskStatus.DONE },
		"ABC-5": { id: "ABC-5", title: "Task 5", status: TaskStatus.OPEN },
	},
	getTasksByStatus: (status: TaskStatus) => {
		const tasks = get().tasks;
		return Object.values(tasks).filter((task) => task.status === status);
	},
	setDraggingTaskId: (taskId: string | null) => set({ draggingTaskId: taskId }, false, { type: "setDraggingTaskId" }),
	changeTaskStatus: (taskId: string, status: TaskStatus) => {
		// const task = get().tasks[taskId];
		// task.status = status;
		// set((state) => ({ // this works only removing the immer middleware
		// 	tasks: {
		// 		...state.tasks,
		// 		[taskId]: task,
		// 	},
		// }));

		// immer middleware way — state mutation, but immer knows how to handle it
		set(
			(state) => {
				state.tasks[taskId] = {
					...state.tasks[taskId],
					status,
				};
			},
			false,
			{ type: "changeTaskStatus" },
		);
	},
	onTaskDrop: (status: TaskStatus) => {
		const taskId = get().draggingTaskId;
		if (!taskId) return;

		get().changeTaskStatus(taskId, status);
		get().setDraggingTaskId(null);
	},
	addTask: (title: string, status: TaskStatus) => {
		const newTask = { id: uuid(), title, status };

		set(
			(state) => {
				state.tasks[newTask.id] = newTask;
			},
			false,
			{ type: "addTask" },
		);

		// set((state) => ({ tasks: { ...state.tasks, [newTask.id]: newTask } }));

		// set(
		// 	produce((state: TasksState) => {
		// 		state.tasks[newTask.id] = newTask; // state mutation thanks to immer, produce fn
		// 	}),
		// );
	},
});

export const useTaskStore = create<TaskStore>()(
	devtools(
		persist(immer(storeAPI), {
			name: "tasks-store",
			merge: (persisted, current) => {
				// `persist` calls merge on every hydration, including the first run, where
				// it passes undefined because nothing has been stored yet. That is not
				// corruption, so it must not warn — and since merge's result replaces the
				// whole state, returning anything but `current` here wipes the initial tasks.
				if (persisted === undefined) return current;

				const parsed = taskStateSchema.safeParse(persisted);

				if (!parsed.success) {
					if (import.meta.env.DEV) {
						console.warn("[tasks-store] estado persistido inválido, se usan los valores iniciales", {
							received: persisted,
							issues: parsed.error.issues,
						});
					}

					return current;
				}

				return { ...current, ...parsed.data };
			},
		}),
	),
);
