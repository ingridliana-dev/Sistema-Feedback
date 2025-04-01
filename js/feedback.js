const TEXTO_PADRAO_PARA_CASA = "O aluno pode acessar o portal e realizar as atividades para casa da aula atual e também das anteriores, qualquer dúvida, anotar e trazer na próxima semana.";

window.onload = function() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('data').value = formattedDate;

    document.getElementById('tipoParaCasa').addEventListener('change', function() {
        const textArea = document.getElementById('paraCasaTexto');
        textArea.style.display = this.value === 'personalizado' ? 'block' : 'none';
    });
}

function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    const meses = [
        'jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.',
        'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'
    ];
    return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
}

function gerarFeedback() {
    const turma = document.getElementById('turma').value;
    const data = formatarData(document.getElementById('data').value);
    const linkAula = document.getElementById('linkAula').value;
    const professor = document.getElementById('professor').value;
    const ferramenta = document.getElementById('ferramenta').value;
    const objetivos = document.getElementById('objetivos').value;
    
    const tipoParaCasa = document.getElementById('tipoParaCasa').value;
    const paraCasaTexto = tipoParaCasa === 'padrao' ? 
        TEXTO_PADRAO_PARA_CASA : 
        document.getElementById('paraCasaTexto').value;

    const feedback = `------------------
📌 Turma: ${turma}
📅 Data: ${data}
🎬 Link da aula: ${linkAula}
📙 Professor(a): ${professor}

🛠 Ferramenta: ${ferramenta}
🎯 Objetivos da aula:
${objetivos}

🏆 Para Casa:
${paraCasaTexto}

❓Qualquer dúvida entre em contato conosco via telefone ou whatsapp. 🚀
📞 (11) 4000-2231
------------------`;

    const resultado = document.getElementById('resultado');
    resultado.textContent = feedback;
    resultado.style.display = 'block';
    document.getElementById('copyButton').style.display = 'block';
}

function copiarTexto() {
    const texto = document.getElementById('resultado').textContent;
    navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado com sucesso!');
    });
}