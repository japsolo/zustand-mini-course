import z from "zod";

export const weddingInvitationSchema = z.object({
	firstName: z.string().trim().min(2, { error: "Ingresa tu nombre" }),
	lastName: z.string().trim().min(2, { error: "Ingresa tu apellido" }),
	// El `error` va en el propio `coerce` para cubrir lo que no se puede convertir
	// a número (NaN). Sin `.default()`: un valor por defecto no vuelve a pasar por
	// `.min()`, así que `.default(0)` hacía que 0 fuera válido o inválido según por
	// dónde entrara. El `.int()` no es redundante con el `step` implícito del input
	// `type="number"`: la validación nativa del navegador se puede saltear, y el
	// schema tiene que sostenerse solo.
	guestCount: z.coerce
		.number({ error: "Ingresa un número de invitados" })
		.int({ error: "Ingresa un número entero de invitados" })
		.min(0, { error: "Ingresa un número positivo" }),
	// Un input vacío llega como "" y `z.string()` lo acepta, así que hace falta el
	// `.min(1)` para exigir que esté completo. El `error` va en el tipo porque desde
	// ahí cubre todas las incidencias del schema —el `.min()` incluido— con un solo
	// mensaje; puesto solo en el `.min()`, un campo ausente saldría en inglés.
	eventDate: z.string({ error: "Ingresa la fecha" }).min(1),
	eventTime: z.string({ error: "Ingresa la hora" }).min(1),
	isComing: z.enum(["Si", "No"], { error: "Debes elegir si vienes o no" }),
});
