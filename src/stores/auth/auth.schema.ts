import z from "zod";

export const authSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, { message: "El email es obligatorio" }) // Catches empty strings
		.pipe(z.email({ message: "El correo es inválido" })), // Catches invalid email format
	password: z.string({ error: "Debes proveer tu contraseña" }).trim().min(1, { error: "La contraseña es obligatoria" }),
});
