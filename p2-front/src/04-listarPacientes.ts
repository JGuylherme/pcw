async function createList() {
    const lista = document.createElement('ul');
    
    try {
        const response = await fetch('http://localhost:3000/api/pacientes');
    
        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        const pacientes = data.pacientes || [];

        console.log(pacientes)

        pacientes.forEach((p:any) => {
            const linhaCorpo = document.createElement('li');
            linhaCorpo.innerText = `Nome: ${p.nome} | Id: ${p.id} | Logradouro: ${p.logradouro} | Numero: ${p.numero} | Complemento: ${p.complemento} | Bairro: ${p.bairro} | CEP: ${p.cep} | Cidade: ${p.cidade} | Numero Documento: ${p.documentoNumero} | Tipo Documento: ${p.documentoTipo}`;
            lista.appendChild(linhaCorpo);
        });

    } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Erro ao buscar pacientes.';
        lista.appendChild(errorMessage);
    }

    document.body.appendChild(lista);
}

window.addEventListener('load', createList);