function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    const meses = [
        'jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.',
        'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'
    ];
    return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Configurar data atual
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    document.getElementById('data').defaultValue = dataFormatada;

    // Configurar event listeners
    // Corrigir event listener do botão
    document.getElementById('gerarFeedbackBtn').addEventListener('click', gerarFeedback);
    
    document.getElementById('copyButton').addEventListener('click', copiarTexto);
    document.getElementById('themeSwitch').addEventListener('click', toggleTheme);
    document.getElementById('tipoParaCasa').addEventListener('change', toggleParaCasaTexto);

    // Inicializar tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Adicionar evento para controlar visibilidade do textarea
    document.getElementById('tipoParaCasa').addEventListener('change', function() {
        const paraCasaTexto = document.getElementById('paraCasaTexto');
        paraCasaTexto.style.display = this.value === 'personalizado' ? 'block' : 'none';
    });
});

function toggleParaCasaTexto() {
    const tipoParaCasa = document.getElementById('tipoParaCasa').value;
    const paraCasaTexto = document.getElementById('paraCasaTexto');
    paraCasaTexto.style.display = tipoParaCasa === 'personalizado' ? 'block' : 'none';
}

function gerarFeedback() {
    const turma = document.getElementById('turma').value;
    const data = document.getElementById('data').value;
    const linkAula = document.getElementById('linkAula').value;
    const professor = document.getElementById('professor').value;
    const ferramenta = document.getElementById('ferramenta').value;
    const objetivos = document.getElementById('objetivos').value;
    const tipoParaCasa = document.getElementById('tipoParaCasa').value;
    const paraCasaTexto = document.getElementById('paraCasaTexto').value;

    const paraCasaPadrao = "O aluno pode acessar o portal e realizar as atividades para casa da aula atual e também das anteriores, qualquer dúvida, anotar e trazer na próxima semana.";
    const textoPraCasa = tipoParaCasa === 'padrao' ? paraCasaPadrao : paraCasaTexto;

    const feedback = `------------------
📌 Turma: ${turma}
📅 Data: ${formatarData(data)}
🎬 Link da aula: ${linkAula}
📙 Professor(a): ${professor}

🛠 Ferramenta: ${ferramenta}
🎯 Objetivos da aula:
${objetivos}

🏆 Para Casa:
${textoPraCasa}

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

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}