import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Consulta } from "./Consulta";

@Entity()
export class Medico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    
    @Column()
    crm: number; 

    @Column({type: 'simple-array',nullable:true})
    diasAtendimento: string[];

    @Column()
    especialidade: string;

    @OneToMany(() => Consulta, (consulta) => consulta.medico)
    consultas: Consulta[];
    
}