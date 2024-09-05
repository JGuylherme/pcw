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
function showList() {
    return __awaiter(this, void 0, void 0, function* () {
        const lista = document.createElement('ul');
        try {
            const response = yield fetch('http://localhost:3000/api/medicos');
            if (!response.ok) {
                const errorMessage = `Error: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }
            const data = yield response.json();
            const medicos = data.medicos || [];
            medicos.forEach((m) => {
                const linhaCorpo = document.createElement('li');
                linhaCorpo.innerText = `Nome: ${m.nome} | Id: ${m.id} | CRM: ${m.crm} | Dias de Atendimento: ${m.diasAtendimento.join(', ')} | Especialidade: ${m.especialidade}`;
                lista.appendChild(linhaCorpo);
            });
        }
        catch (error) {
            console.error('Erro ao buscar medicos:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Erro ao buscar medicos.';
            lista.appendChild(errorMessage);
        }
        document.body.appendChild(lista);
    });
}
window.addEventListener('load', showList);
