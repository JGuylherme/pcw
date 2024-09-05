var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Consulta, Medico, Paciente } from "./main.js";
function createForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.createElement('form');
        const labelData = document.createElement('label');
        labelData.setAttribute('for', 'data');
        labelData.innerText = "Data: ";
        const campoData = document.createElement('input');
        campoData.setAttribute('name', 'data');
        campoData.setAttribute('type', 'date');
        form.appendChild(labelData);
        form.appendChild(campoData);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const labeltipo = document.createElement('label');
        labeltipo.setAttribute('for', 'tipo');
        labeltipo.innerText = "Tipo Consulta: ";
        const campotipo = document.createElement('input');
        campotipo.setAttribute('name', 'tipo');
        campotipo.setAttribute('type', 'text');
        form.appendChild(labeltipo);
        form.appendChild(campotipo);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const labelObservacoes = document.createElement('label');
        labelObservacoes.setAttribute('for', 'observacoes');
        labelObservacoes.innerText = "Observações: ";
        const campoObservacoes = document.createElement('input');
        campoObservacoes.setAttribute('name', 'observacoes');
        campoObservacoes.setAttribute('type', 'text');
        form.appendChild(labelObservacoes);
        form.appendChild(campoObservacoes);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const labelMedicamentosPrescritos = document.createElement('label');
        labelMedicamentosPrescritos.setAttribute('for', 'medicamentosPrescritos');
        labelMedicamentosPrescritos.innerText = "Medicamentos Prescritos: ";
        const campoMedicamentosPrescritos = document.createElement('input');
        campoMedicamentosPrescritos.setAttribute('name', 'medicamentosPrescritos');
        campoMedicamentosPrescritos.setAttribute('type', 'text');
        form.appendChild(labelMedicamentosPrescritos);
        form.appendChild(campoMedicamentosPrescritos);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const labelExame = document.createElement('label');
        labelExame.innerText = "Exames: ";
        const exames = ['Hemograma', 'Ultrassom', 'Raio X'];
        const examesDiv = document.createElement('div');
        exames.forEach(e => {
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', 'exames');
            checkbox.setAttribute('value', e);
            const label = document.createElement('label');
            label.innerText = e;
            examesDiv.appendChild(checkbox);
            examesDiv.appendChild(label);
            examesDiv.appendChild(document.createElement("br"));
        });
        form.appendChild(labelExame);
        form.appendChild(examesDiv);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const labelMedico = document.createElement('label');
        labelMedico.setAttribute('for', 'medico');
        labelMedico.innerText = 'Médico: ';
        const selectMedico = document.createElement('select');
        selectMedico.setAttribute('name', 'medico');
        const responseMedicos = yield fetch('http://localhost:3000/api/medicos');
        const dataMedicos = yield responseMedicos.json();
        const medicos = dataMedicos.medicos || [];
        medicos.forEach((p) => {
            const option = document.createElement('option');
            option.value = p.id;
            option.innerText = `${p.nome} (ID: ${p.id})`;
            selectMedico.appendChild(option);
        });
        form.appendChild(labelMedico);
        form.appendChild(selectMedico);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const labelPaciente = document.createElement('label');
        labelPaciente.setAttribute('for', 'paciente');
        labelPaciente.innerText = 'Paciente: ';
        const selectPaciente = document.createElement('select');
        selectPaciente.setAttribute('name', 'paciente');
        const responsePacientes = yield fetch('http://localhost:3000/api/pacientes');
        const datapacientes = yield responsePacientes.json();
        const pacientes = datapacientes.pacientes || [];
        pacientes.forEach((p) => {
            const option = document.createElement('option');
            option.value = p.id;
            option.innerText = `${p.nome} (ID: ${p.id})`;
            selectPaciente.appendChild(option);
        });
        form.appendChild(labelPaciente);
        form.appendChild(selectPaciente);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        const button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.textContent = 'Cadastrar';
        form.appendChild(button);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        form.addEventListener('submit', function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                event.preventDefault();
                const data = new Date(campoData.value);
                const tipo = campotipo.value;
                const observacoes = campoObservacoes.value;
                const medicamentosPrescritos = campoMedicamentosPrescritos.value;
                const exames = Array.from(form.querySelectorAll('input[name="exames"]:checked')).map(input => input.value);
                const medicoId = parseInt(selectMedico.value);
                const medico = new Medico('', medicoId, 0, [], '');
                const pacienteId = parseInt(selectPaciente.value);
                const paciente = new Paciente('', pacienteId, '', 0, '', '', 0, '', 0, '');
                let consultasExistentes = JSON.parse((_a = localStorage.getItem('consultas')) !== null && _a !== void 0 ? _a : "{}") || [];
                const newId = consultasExistentes.length > 0
                    ? consultasExistentes
                        .sort((a, b) => b.id - a.id)[0].id + 1
                    : 0;
                const consulta = new Consulta(newId, data, tipo, observacoes, medicamentosPrescritos, exames, medico, paciente);
                try {
                    const response = yield fetch('http://localhost:3000/api/consultas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(consulta)
                    });
                    if (response.ok) {
                        alert('Consulta cadastrada com sucesso!');
                        form.reset();
                    }
                    else {
                        alert('Erro ao cadastrar a consulta.');
                    }
                }
                catch (error) {
                    console.error('Erro ao enviar dados:', error);
                    alert('Erro ao cadastrar a consulta.');
                }
            });
        });
        document.body.appendChild(form);
    });
}
window.addEventListener('load', createForm);
