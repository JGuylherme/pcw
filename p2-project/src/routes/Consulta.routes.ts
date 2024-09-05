import { Router } from "express";
import { consultaRepository } from "../repositories/ConsultaRepo";

const router = Router();

router.get("/consultas", consultaRepository.getAllConsultas);
router.post("/consultas", consultaRepository.createConsulta);
router.put("/consultas/:id", consultaRepository.updateConsulta);
router.delete("/consultas/:id", consultaRepository.deleteConsulta);

export default router;
