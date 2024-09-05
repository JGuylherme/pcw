export class Paciente {
    constructor(nome, id, logradouro, numero, complemento, bairro, cep, cidade, documentoNumero, documentoTipo) {
        this.nome = nome;
        this.id = id;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cep = cep;
        this.cidade = cidade;
        this.documentoNumero = documentoNumero;
        this.documentoTipo = documentoTipo;
    }
}
export class Medico {
    constructor(nome, id, crm, diasAtendimento, especialidade) {
        this.nome = nome;
        this.id = id;
        this.crm = crm;
        this.diasAtendimento = diasAtendimento;
        this.especialidade = especialidade;
    }
}
export class Consulta {
    constructor(id, data, tipo, observacoes, medicamentosPrescritos, examesSolicitados, medico, paciente) {
        this.id = id;
        this.data = data;
        this.tipo = tipo;
        this.observacoes = observacoes;
        this.medicamentosPrescritos = medicamentosPrescritos;
        this.examesSolicitados = examesSolicitados;
        this.medico = medico;
        this.paciente = paciente;
    }
}
