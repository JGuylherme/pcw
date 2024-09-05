import "reflect-metadata"
import { DataSource } from "typeorm"
import { Medico } from "./entity/Medico"
import { Paciente } from "./entity/Paciente"
import { Consulta } from "./entity/Consulta"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "pcw2_project",
    synchronize: true,
    logging: false,
    entities: [Paciente, Medico, Consulta],
    migrations: [],
    subscribers: [],
})
