import z from "zod";

/** Shape of an error body returned by the Teslo API (NestJS). */
export const apiErrorSchema = z.object({
	// NestJS returns a string for thrown exceptions and a string[] for validation failures
	message: z.union([z.string(), z.array(z.string())]),
	error: z.string(),
	statusCode: z.number(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
