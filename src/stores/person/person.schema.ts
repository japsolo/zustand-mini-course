import z from "zod";
import { createFallbackTo } from "@/stores/utils";

const fallbackTo = createFallbackTo("person-storage");

/*
 * Sin catch() a nivel del objeto a propósito. Un catch acá tampoco puede
 * distinguir "Firebase no devolvió nada" (primer arranque, normal) de
 * "Firebase devolvió basura", y en ninguno de los dos casos conoce los
 * valores iniciales del store — esos solo los tiene `current` dentro del
 * merge. Ver la rama de tres caminos en person.store.ts.
 *
 * Los catch() por campo sí quedan: rescatan un campo suelto sin tirar
 * abajo el resto del estado.
 */
export const personStateSchema = z.object({
	firstName: z.string().catch(fallbackTo("", "firstName")),
	lastName: z.string().catch(fallbackTo("", "lastName")),
});
