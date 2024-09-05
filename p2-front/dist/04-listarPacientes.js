"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createList() {
    return __awaiter(this, void 0, void 0, function* () {
        const lista = document.createElement('ul');
        try {
            const response = yield fetch('http://localhost:3000/api/pacientes');
            if (!response.ok) {
                const errorMessage = `Error: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }
            const data = yield response.json();
            const pacientes = data.pacientes || [];
            console.log(pacientes);
            pacientes.forEach((p) => {
                const linhaCorpo = document.createElement('li');
                linhaCorpo.innerText = `Nome: ${p.nome} | Id: ${p.id} | Logradouro: ${p.logradouro} | Numero: ${p.numero} | Complemento: ${p.complemento} | Bairro: ${p.bairro} | CEP: ${p.cep} | Cidade: ${p.cidade} | Numero Documento: ${p.documentoNumero} | Tipo Documento: ${p.documentoTipo}`;
                lista.appendChild(linhaCorpo);
            });
        }
        catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Erro ao buscar pacientes.';
            lista.appendChild(errorMessage);
        }
        document.body.appendChild(lista);
    });
}
window.addEventListener('load', createList);
