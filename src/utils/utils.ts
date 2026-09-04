import z from "zod";

const envSchema = z
	.object({
		VITE_FIREBASE_URL: z.url({ error: "VITE_FIREBASE_URL must be a valid url" }),
	})
	.transform((config) => ({
		VITE_FIREBASE_URL: config.VITE_FIREBASE_URL,
	}));

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
	const issues = parsed.error.issues.map((e) => `  — ${e.path.join(".")}: ${e.message}`).join("\n");
	throw new Error(`Invalid .env variables:\n${issues}\n\n Please check your .env file`);
}

export const env = parsed.data;

export type ENV = z.infer<typeof envSchema>;
