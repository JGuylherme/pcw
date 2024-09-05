import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

@Entity()
export class Consulta{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string

    @Column()
    tipo: string;

    @Column()
    observacoes: string;

    @Column()
    medicamentosPrescritos: string; 

    @Column({type: 'simple-array',nullable:true})
    examesSolicitados: string[];

    @ManyToOne(() => Medico, (medico) => medico.consultas, { eager: true })
    @JoinColumn()
    medico: Medico;

    @ManyToOne(() => Paciente, (paciente) => paciente.consultas, { eager: true })
    @JoinColumn()
    paciente: Paciente;
}
