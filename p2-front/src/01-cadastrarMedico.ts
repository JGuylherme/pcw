import { Medico } from "./main.js";

function createForm() {
    const form = document.createElement('form');
    
    const labelNome = document.createElement('label');
    labelNome.setAttribute('for','nome');
    labelNome.innerText = "Nome: ";

    const campoNome = document.createElement('input');
    campoNome.setAttribute('name', 'nome');
    campoNome.setAttribute('type', 'text');
 
    form.appendChild(labelNome);
    form.appendChild(campoNome);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    
    const labelCRM = document.createElement('label');
    labelCRM.setAttribute('for','crm');
    labelCRM.innerText = "CRM: ";

    const campoCRM = document.createElement('input');
    campoCRM.setAttribute('name', 'crm');
    campoCRM.setAttribute('type', 'text');
 
    form.appendChild(labelCRM);
    form.appendChild(campoCRM);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));

    const labelDias = document.createElement('label');
    labelDias.innerText = "Dias de Atendimento: ";
 
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const diasDiv = document.createElement('div');
    dias.forEach(dia => {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'dias');
        checkbox.setAttribute('value', dia);

        const label = document.createElement('label');
        label.innerText = dia;

        diasDiv.appendChild(checkbox);
        diasDiv.appendChild(label);
        diasDiv.appendChild(document.createElement("br"));
    });

    form.appendChild(labelDias);
    form.appendChild(diasDiv);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));

    const labelTipoEsp = document.createElement('label');
    labelTipoEsp.setAttribute('for','especialidade');
    labelTipoEsp.innerText = "Especialidade: ";
 
    const selectEsp = document.createElement('select');
    selectEsp.setAttribute('name', 'especialidade');
 
    const esp = ['Dermatologista', 'Cardiologista', 'Neurologista', 'Reumatologista', 'Hematologista'];
    esp.forEach(e => {
        const option = document.createElement('option');
        option.innerText = e;
        option.setAttribute('value', e);
        selectEsp.appendChild(option);
    });
 
    form.appendChild(labelTipoEsp);
    form.appendChild(selectEsp);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
 
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.textContent = 'Cadastrar';

    form.appendChild(button);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));


    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const nome = campoNome.value;
        const crm:number = parseInt(campoCRM.value);
        const diasSelecionados = Array.from(form.querySelectorAll('input[name="dias"]:checked')).map(input => (<HTMLInputElement>input).value);

        let medicosExistentes = JSON.parse(localStorage.getItem('medicos')??"{}") || [];

        const newId = medicosExistentes.length > 0
            ? medicosExistentes
                .sort((a:any, b:any) => b.id - a.id)[0].id + 1
            : 0;

        const medico = new Medico(nome, newId, crm, diasSelecionados, selectEsp.value);
        
        try {
            const response = await fetch('http://localhost:3000/api/medicos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medico)
            });

            if (response.ok) {
                alert('Médico cadastrado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao cadastrar o médico.');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao cadastrar o médico.');
        }
    });

    document.body.appendChild(form);
}

window.addEventListener('load', createForm);

