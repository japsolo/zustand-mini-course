import z from "zod";
import { createFallbackTo } from "@/stores/utils";

const fallbackTo = createFallbackTo("tasks-store");

export enum TaskStatus {
	OPEN = "open",
	IN_PROGRESS = "in-progress",
	DONE = "done",
}

export const taskSchema = z.object({
	// No catch here on purpose: `id` is the task's identity — the React key and the
	// drag payload. Rescuing it as "" produces a task that renders but silently
	// refuses to be dragged, so an invalid id drops the whole task (see tasksSchema).
	id: z.string(),
	title: z.string().catch(fallbackTo("", "title")),
	status: z.enum(TaskStatus).catch(fallbackTo(TaskStatus.OPEN, "status")),
});

type TaskRecord = Record<string, z.infer<typeof taskSchema>>;

// Each entry is validated on its own so a single unrecoverable task doesn't take
// the rest with it, which is what a plain z.record(…, taskSchema) would do.
export const tasksSchema = z
	.record(z.string(), z.unknown())
	.catch(fallbackTo({}, "tasks"))
	.transform((entries) =>
		Object.entries(entries).reduce<TaskRecord>((valid, [key, value]) => {
			const parsed = taskSchema.safeParse(value);

			if (!parsed.success) {
				if (import.meta.env.DEV) {
					console.warn(`[tasks-store] tarea "${key}" descartada`, { received: value, issues: parsed.error.issues });
				}

				return valid;
			}

			// The record key is what the store mutates through (state.tasks[taskId]) while
			// the UI drags by task.id. When the two disagree, changeTaskStatus writes to a
			// key that doesn't exist and rebuilds the task from undefined, dropping its id
			// and title. The key is the identity the store already indexes by, so adopt it
			// and keep the task: the divergence is repairable, and discarding it would
			// throw away user data over an inconsistency we can resolve.
			if (parsed.data.id !== key) {
				if (import.meta.env.DEV) {
					console.warn(`[tasks-store] tarea "${key}" reconciliada: su id era "${parsed.data.id}"`, { received: value });
				}

				valid[key] = { ...parsed.data, id: key };
				return valid;
			}

			valid[key] = parsed.data;

			return valid;
		}, {}),
	);

// Describes the whole persisted state, which is the shape `persist` hands to
// `merge` — not just the tasks record. Deliberately without an outer catch: when
// the persisted value isn't a state object at all, only the store knows what to
// fall back to (its own initial state), so that call belongs in `merge`.
export const taskStateSchema = z.object({
	tasks: tasksSchema,
	draggingTaskId: z.string().nullable().catch(fallbackTo(null, "draggingTaskId")),
});

export type Task = z.infer<typeof taskSchema>;
