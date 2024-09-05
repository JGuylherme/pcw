import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Consulta } from "./Consulta";

@Entity()
export class Paciente{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    logradouro: string

    @Column()
    numero: number; 

    @Column()
    complemento: string;

    @Column()
    bairro: string;

    @Column()
    cep: string;

    @Column()
    cidade: string;

    @Column()
    documentoNumero: number;

    @Column()
    documentoTipo: string;

    @OneToMany(() => Consulta, (consulta) => consulta.medico)
    consultas: Consulta[];
}