import { z } from "zod";

export const listaOfertasSearchSchema = z.object({
  busca: z.string(),
});

export type ListaOfertasSearchValues = z.infer<typeof listaOfertasSearchSchema>;
