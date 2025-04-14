// /server/api/trpc.ts
import { initTRPC } from "@trpc/server";

// Crear una instancia de tRPC
const t = initTRPC.create();

// Esta es una configuración básica que se puede extender según las necesidades del proyecto.
export const publicProcedure = t.procedure;
export const router = t.router;
