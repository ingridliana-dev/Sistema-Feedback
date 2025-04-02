document.addEventListener('DOMContentLoaded', function() {
    // Configurar data atual
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    document.getElementById('data').value = dataFormatada;

    // Configurar event listeners
    document.getElementById('gerarFeedbackBtn').addEventListener('click', gerarFeedback);
    document.getElementById('copyButton').addEventListener('click', copiarTexto);
    document.getElementById('themeSwitch').addEventListener('click', toggleTheme);

    // Inicializar tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

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

    const feedback = `------------------
📌 Turma: ${turma}
📅 Data: ${data}
🎬 Link da aula: ${linkAula}
📙 Professor(a): ${professor}

⚠️ AVISO AOS PAIS E RESPONSÁVEIS ⚠️
Na aula de hoje, nenhum aluno esteve presente. 
Por isso, o(a) professor(a) gravou um passo a passo da atividade que seria realizada. 
É muito importante que os alunos assistam à gravação durante a semana e realizem a atividade proposta, para que possam acompanhar o conteúdo da próxima aula.
Contamos com o apoio de todos para que as aulas aconteçam da melhor maneira possível. 🚀

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