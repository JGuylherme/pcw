var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Paciente } from "./main.js";
function createForm() {
    const form = document.createElement('form');
    const labelNome = document.createElement('label');
    labelNome.setAttribute('for', 'nome');
    labelNome.innerText = "Nome: ";
    const campoNome = document.createElement('input');
    campoNome.setAttribute('name', 'nome');
    campoNome.setAttribute('type', 'text');
    form.appendChild(labelNome);
    form.appendChild(campoNome);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labelLogradouro = document.createElement('label');
    labelLogradouro.setAttribute('for', 'logradouro');
    labelLogradouro.innerText = "Logradouro: ";
    const campoLogradouro = document.createElement('input');
    campoLogradouro.setAttribute('name', 'logradouro');
    campoLogradouro.setAttribute('type', 'text');
    form.appendChild(labelLogradouro);
    form.appendChild(campoLogradouro);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labelNumero = document.createElement('label');
    labelNumero.setAttribute('for', 'numero');
    labelNumero.innerText = "Número: ";
    const campoNumero = document.createElement('input');
    campoNumero.setAttribute('name', 'numero');
    campoNumero.setAttribute('type', 'number');
    form.appendChild(labelNumero);
    form.appendChild(campoNumero);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labelComplemento = document.createElement('label');
    labelComplemento.setAttribute('for', 'complemento');
    labelComplemento.innerText = "Complemento: ";
    const campoComplemento = document.createElement('input');
    campoComplemento.setAttribute('name', 'complemento');
    campoComplemento.setAttribute('type', 'text');
    form.appendChild(labelComplemento);
    form.appendChild(campoComplemento);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labelBairro = document.createElement('label');
    labelBairro.setAttribute('for', 'bairro');
    labelBairro.innerText = "Bairro: ";
    const campoBairro = document.createElement('input');
    campoBairro.setAttribute('name', 'bairro');
    campoBairro.setAttribute('type', 'text');
    form.appendChild(labelBairro);
    form.appendChild(campoBairro);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labelCep = document.createElement('label');
    labelCep.setAttribute('for', 'cep');
    labelCep.innerText = "CEP: ";
    const campoCep = document.createElement('input');
    campoCep.setAttribute('name', 'cep');
    campoCep.setAttribute('type', 'text');
    form.appendChild(labelCep);
    form.appendChild(campoCep);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labelCidade = document.createElement('label');
    labelCidade.setAttribute('for', 'cidade');
    labelCidade.innerText = "Cidade: ";
    const campoCidade = document.createElement('input');
    campoCidade.setAttribute('name', 'cidade');
    campoCidade.setAttribute('type', 'text');
    form.appendChild(labelCidade);
    form.appendChild(campoCidade);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labeldocumentoNumero = document.createElement('label');
    labeldocumentoNumero.setAttribute('for', 'numdoc');
    labeldocumentoNumero.innerText = "Número Documento: ";
    const campodocumentoNumero = document.createElement('input');
    campodocumentoNumero.setAttribute('name', 'numdoc');
    campodocumentoNumero.setAttribute('type', 'text');
    form.appendChild(labeldocumentoNumero);
    form.appendChild(campodocumentoNumero);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    const labeldocumentoTipo = document.createElement('label');
    labeldocumentoTipo.setAttribute('for', 'documentoTipo');
    labeldocumentoTipo.innerText = "Tipo Documento: ";
    const selectdocumentoTipo = document.createElement('select');
    selectdocumentoTipo.setAttribute('name', 'documentoTipo');
    const optVazio = document.createElement('option');
    optVazio.innerText = '';
    optVazio.setAttribute('value', '');
    selectdocumentoTipo.appendChild(optVazio);
    const docs = ['RG', 'Carteira de Motorista', 'CPF'];
    docs.forEach(documentoTipo => {
        const option = document.createElement('option');
        option.innerText = documentoTipo;
        option.setAttribute('value', documentoTipo);
        selectdocumentoTipo.appendChild(option);
    });
    form.appendChild(labeldocumentoTipo);
    form.appendChild(selectdocumentoTipo);
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
            const nome = campoNome.value;
            const logradouro = campoLogradouro.value;
            const numero = parseInt(campoNumero.value);
            const complemento = campoComplemento.value;
            const bairro = campoBairro.value;
            const cep = parseInt(campoCep.value);
            const cidade = campoCidade.value;
            const documentoNumero = parseInt(campodocumentoNumero.value);
            const documentoTipo = selectdocumentoTipo.value;
            let pacientesExistentes = JSON.parse((_a = localStorage.getItem('pacientes')) !== null && _a !== void 0 ? _a : "{}") || [];
            const newId = pacientesExistentes.length > 0
                ? pacientesExistentes
                    .sort((a, b) => b.id - a.id)[0].id + 1
                : 0;
            const paciente = new Paciente(nome, newId, logradouro, numero, complemento, bairro, cep, cidade, documentoNumero, documentoTipo);
            try {
                const response = yield fetch('http://localhost:3000/api/pacientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(paciente)
                });
                if (response.ok) {
                    alert('Paciente cadastrado com sucesso!');
                    form.reset();
                }
                else {
                    alert('Erro ao cadastrar o paciente.');
                }
            }
            catch (error) {
                console.error('Erro ao enviar dados:', error);
                alert('Erro ao cadastrar o paciente.');
            }
        });
    });
    document.body.appendChild(form);
}
window.addEventListener('load', createForm);
