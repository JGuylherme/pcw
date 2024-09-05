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
function pacienteDropdown() {
    return __awaiter(this, void 0, void 0, function* () {
        const dropdown = document.createElement('select');
        dropdown.setAttribute('id', 'patientDropdown');
        const defaultOption = document.createElement('option');
        defaultOption.innerText = 'Selecione um Paciente';
        defaultOption.setAttribute('value', '');
        dropdown.appendChild(defaultOption);
        const responsePacientes = yield fetch('http://localhost:3000/api/pacientes');
        const datapacientes = yield responsePacientes.json();
        const pacientes = datapacientes.pacientes || [];
        if (!Array.isArray(pacientes)) {
            console.error('Pacientes não é um array:', pacientes);
            return;
        }
        pacientes.forEach((paciente) => {
            const option = document.createElement('option');
            option.innerText = paciente.nome;
            option.setAttribute('value', paciente.id);
            dropdown.appendChild(option);
        });
        dropdown.addEventListener('change', function () {
            updateConsultations(parseInt(this.value));
        });
        document.body.appendChild(dropdown);
    });
}
function updateConsultations(selectedPatientId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingList = document.querySelector('ul');
        if (existingList) {
            existingList.remove();
        }
        if (!selectedPatientId) {
            return;
        }
        const lista = document.createElement('ul');
        try {
            const response = yield fetch('http://localhost:3000/api/consultas');
            if (!response.ok) {
                const errorMessage = `Error: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }
            const data = yield response.json();
            const consultas = data.data || [];
            const filteredConsultas = consultas.filter((c) => c.paciente.id === selectedPatientId);
            filteredConsultas.forEach((c) => {
                const linhaCorpo = document.createElement('li');
                linhaCorpo.innerText = `Data: ${c.data} | Tipo de Consulta: ${c.tipo} | Observações: ${c.observacoes} | Medicamentos Prescritos: ${c.medicamentosPrescritos} | Exames Solicitados: ${c.examesSolicitados.join(', ')} | Médico: ${c.medico.nome} | Paciente: ${c.paciente.nome}`;
                lista.appendChild(linhaCorpo);
            });
        }
        catch (error) {
            console.error('Erro ao buscar consultas:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Erro ao buscar consultas.';
            lista.appendChild(errorMessage);
        }
        document.body.appendChild(lista);
    });
}
window.addEventListener('load', function () {
    pacienteDropdown();
    updateConsultations(0);
});
