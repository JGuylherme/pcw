import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Consulta } from "../entity/Consulta";

export class consultaRepository {
    static async getAllConsultas(req: Request, res: Response) {
      const data = cache.get("data");
      if (data) {
        return res.status(200).json({
          data,
        });
      } else {
        const consultaRepository = AppDataSource.getRepository(Consulta);
        const consultas = await consultaRepository.find();
        cache.put("data", consultas, 10000);
        return res.status(200).json({
          data: consultas,
        });
      }
    }

    static async createConsulta(req: Request, res: Response) {
      const { data, tipo, observacoes, medicamentosPrescritos, examesSolicitados, medico, paciente } =
        req.body;

      const consulta = new Consulta();
      consulta.data = data;
      consulta.tipo = tipo;
      consulta.observacoes = observacoes;
      consulta.medicamentosPrescritos = medicamentosPrescritos;
      consulta.examesSolicitados = examesSolicitados;
      consulta.medico = medico,
      consulta.paciente = paciente
    
      //await AppDataSource.manager.save(consulta)
  
      const consultaRepository = AppDataSource.getRepository(Consulta);
      await consultaRepository.save(consulta);
      return res
        .status(200)
        .json({ message: "consulta criado .", consulta });
    }
  
    static async updateConsulta(req: Request, res: Response) {
      const { id } = req.params;
      const {  data, tipo, observacoes, medicamentosPrescritos, examesSolicitados, medicoId, pacienteId  } =
        req.body;
      const consultaRepository = AppDataSource.getRepository(Consulta);
      const consulta = await consultaRepository.findOne({
        where: { id },
      });
      consulta.data = data;
      consulta.tipo = tipo;
      consulta.observacoes = observacoes;
      consulta.medicamentosPrescritos = medicamentosPrescritos;
      consulta.examesSolicitados = examesSolicitados;
      consulta.medico = medicoId,
      consulta.paciente = pacienteId
      await consultaRepository.save(consulta);
      return res
        .status(200)
        .json({ message: "consulta atualizado", consulta });
    }
  
    static async deleteConsulta(req: Request, res: Response) {
      console.log("delete")
      const { id } = req.params;
      const consultaRepository = AppDataSource.getRepository(Consulta);
      const consulta = await consultaRepository.findOne({
        where: { id },
      });
      await consultaRepository.remove(consulta);
      return res
        .status(200)
        .json({ message: "consulta deletado .", consulta });
    }
  }