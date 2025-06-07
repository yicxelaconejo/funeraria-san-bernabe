import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getHeadlines,
  getHeadline,
  createHeadline,
  updateHeadline,
  toggleEstadoTitular,
  getAfiliadosByTitular,
} from "../controllers/headlines.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createHeadlinesSchema } from "../schemas/headline.schema.js";

const router = Router();

router.get("/headlines", authRequired, getHeadlines);

router.get("/headlines/:id", authRequired, getHeadline);

router.post("/headlines", authRequired, validateSchema(createHeadlinesSchema), createHeadline);

router.put("/headlines/:id/estado", authRequired, toggleEstadoTitular);

router.put("/headlines/:id", authRequired, updateHeadline);

router.get("/titulares/:id/afiliados", authRequired, getAfiliadosByTitular);

export default router;
