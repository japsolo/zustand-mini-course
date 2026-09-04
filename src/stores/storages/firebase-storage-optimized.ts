import { createJSONStorage, type StateStorage } from "zustand/middleware";

// Firebase Storage (optimized)
// Same as firebase-storage.ts but serializes writes per key so PUT requests
// always reach Firebase in call order, with no two requests for the same
// key ever in flight at once.

const fireBaseURL = "https://zustand-storage-7ec65-default-rtdb.firebaseio.com/zustand";

type PendingWrite = {
	controller: AbortController;
	latestValue: string;
	settle: Promise<void>;
};

// One entry per storage key: tracks the in-flight request and the most
// recent value that should end up persisted once it finishes.
const pendingWrites = new Map<string, PendingWrite>();

function isAbortError(error: unknown): boolean {
	return typeof error === "object" && error !== null && (error as { name?: string }).name === "AbortError";
}

async function runWrite(name: string): Promise<void> {
	const pending = pendingWrites.get(name);
	if (!pending) return;

	const valueBeingSent = pending.latestValue;

	try {
		await fetch(`${fireBaseURL}/${name}.json`, {
			method: "PUT",
			body: valueBeingSent,
			signal: pending.controller.signal,
		});
	} catch (error) {
		if (!isAbortError(error)) {
			console.log(error);
		}
	}

	const current = pendingWrites.get(name);
	if (!current) return;

	if (current.latestValue !== valueBeingSent) {
		// A newer value arrived while this PUT was in flight: send it next
		// instead of overlapping requests. Values in between are skipped on
		// purpose, only the final state needs to land in Firebase.
		current.settle = runWrite(name);
		return current.settle;
	}

	pendingWrites.delete(name);
}

const storageAPI: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		try {
			const data = await fetch(`${fireBaseURL}/${name}.json`).then((res) => res.json());

			if (!data) return null;

			return JSON.stringify(data); // data is an object, that's why we need to serialized as string
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	setItem: (name: string, value): Promise<void> => {
		const existing = pendingWrites.get(name);

		if (existing) {
			// A write is already queued/in flight for this key: just update
			// the value it should end up sending, no new request yet.
			existing.latestValue = value;
			return existing.settle;
		}

		const controller = new AbortController();
		const entry: PendingWrite = { controller, latestValue: value, settle: Promise.resolve() };
		pendingWrites.set(name, entry);
		entry.settle = runWrite(name);
		return entry.settle;
	},
	removeItem: (name: string): void => {
		// Cancel any pending write so a stale PUT can't resurrect data after removal.
		pendingWrites.get(name)?.controller.abort();
		pendingWrites.delete(name);
		sessionStorage.removeItem(name);
	},
};

export const firebaseStorageOptimized = createJSONStorage(() => storageAPI);
