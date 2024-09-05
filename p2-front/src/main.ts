export class Paciente{
    nome: string;
    id: number;
    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: number;
    cidade: string;
    documentoNumero: number;
    documentoTipo: string;
    constructor(nome:string,id:number,logradouro:string,numero:number,complemento:string,bairro:string,cep:number,cidade:string,documentoNumero:number,documentoTipo:string){
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


export class Medico{
    nome:string;
    id:number;
    crm:number;
    diasAtendimento:string[];
    especialidade:string;
    constructor(nome:string,id:number,crm:number,diasAtendimento:string[],especialidade:string){
            this.nome = nome;
            this.id = id;
            this.crm = crm;
            this.diasAtendimento = diasAtendimento;
            this.especialidade = especialidade;
    }
}

export class Consulta{
    id:number;
    data: Date;
    tipo: string;
    observacoes: string;
    medicamentosPrescritos: string;
    examesSolicitados: string[];
    medico: Medico;
    paciente: Paciente;
    constructor(id:number,data:Date,tipo:string,observacoes:string,medicamentosPrescritos:string,examesSolicitados:string[],medico:Medico,paciente:Paciente){
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
