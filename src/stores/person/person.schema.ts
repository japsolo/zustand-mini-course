import z from "zod";

export const personStateSchema = z
	.object({
		firstName: z.string().catch(""),
		lastName: z.string().catch(""),
	})
	.catch({
		firstName: "Jon",
		lastName: "Ham",
	});

/*
 * Si se usa catch() al final del objeto, los valores por
 * default serán los que se ven en las líneas 9 y 10.
 * Por lo tanto en el merge de src/stores/person/person.store.ts,
 * línea 39 no es necesario hacer una rama de validación
 * (ver líneas comentadas) y se puede usar directamente parse()
 * ya que retorna el objeto esperado
 */
