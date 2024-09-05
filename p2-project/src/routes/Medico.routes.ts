import { Router } from "express";
import { MedicoRepository } from "../repositories/MedicoRepo";

const router = Router();

router.get("/medicos", MedicoRepository.getAllMedicos);
router.post("/medicos", MedicoRepository.createMedico);
router.put("/medicos/:id", MedicoRepository.updateMedico);
router.delete("/medicos/:id", MedicoRepository.deleteMedico);

/*
const methodNotAllowed = (req, res, next) => res.status(405).send();

router
.route(`/medicos`)
.get( MedicoRepository.getAllMedicos)
.put( MedicoRepository.updateMedico)
.post(MedicoRepository.createMedico)
.delete( MedicoRepository.deleteMedico)
.all(methodNotAllowed);
*/
export default router;
