import { z } from "zod";

export const createHeadlinesSchema = z.object({
  nombreTitular: z.string({
    required_error: "Nombre del titular es requerido",
  }),
  apellidoTitular: z.string({
    required_error: "Apellido del titular es requerido",
  }),
  tipoDocTitular: z.string({
    required_error: "Tipo de documento del titular es requerido",
  }),
  documentoTitular: z.number({
    required_error: "Número de documento del titular es requerido",
  }),
  correoTitular: z
    .string({
      required_error: "Correo del titular es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  telefonoTitular: z.number({
    required_error: "Teléfono del titular es requerido",
  }),
  direccionTitular: z.string({
    required_error: "Dirección del titular es requerida",
  }),

//   fechaNacimientoTitular: z.string().datetime().optional(),

//   fechaAfiliacion: z.string().datetime().optional(),

//   fechaVencimiento: z.string().datetime().optional(),

  servicios: z.string({
    required_error: "Servicios son requeridos",
  }),
  zonaTitular: z.string({
    required_error: "Zona del titular es requerida",
  }),
  // estadoTitular: z.boolean({
  //   required_error: "Estado del titular es requerido",
  // }),
});
