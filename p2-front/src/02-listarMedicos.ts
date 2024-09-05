async function showList() {
    const lista = document.createElement('ul');

    try {
        const response = await fetch('http://localhost:3000/api/medicos');
        
        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        const medicos = data.medicos || [];

        medicos.forEach((m:any) => {
            const linhaCorpo = document.createElement('li');
            linhaCorpo.innerText = `Nome: ${m.nome} | Id: ${m.id} | CRM: ${m.crm} | Dias de Atendimento: ${m.diasAtendimento.join(', ')} | Especialidade: ${m.especialidade}`;
            lista.appendChild(linhaCorpo);
        });
    } catch (error) {
        console.error('Erro ao buscar medicos:', error);
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Erro ao buscar medicos.';
        lista.appendChild(errorMessage);
    }

    document.body.appendChild(lista);
}

window.addEventListener('load', showList);