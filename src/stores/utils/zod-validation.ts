import type z from "zod";

/*
 * Recovering from bad persisted data is silent by design, and that silence also
 * swallows bugs in the schema itself — a schema pointed at the wrong shape looks
 * exactly like "there was nothing stored". Announce every fallback in dev so the
 * two cases stop being indistinguishable.
 */
export const createFallbackTo =
	(scope: string) =>
	<T>(value: T, label: string) =>
	(ctx: z.core.$ZodCatchCtx): T => {
		if (import.meta.env.DEV) {
			console.warn(`[${scope}] ${label} inválido, se usa el fallback`, {
				received: ctx.value,
				issues: ctx.issues,
			});
		}
		return value;
	};
