import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createAfiliado, getAfiliadoById, getAfiliados, toggleAfiliadoEstado, updateAfiliado } from "../controllers/afiliado.controller.js";


const router = Router();

router.get("/afiliados", authRequired, getAfiliados);

router.get("/afiliados/:id", authRequired, getAfiliadoById);

router.post("/afiliados", authRequired, createAfiliado);

router.delete("/afiliados/:id", authRequired, toggleAfiliadoEstado);

router.put("/afiliados/:id", authRequired, updateAfiliado);

export default router;
