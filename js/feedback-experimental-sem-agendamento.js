document.addEventListener('DOMContentLoaded', function() {
    // Pegar a data local sem ajustes de UTC
    const hoje = new Date();
    
    // Formatar a data diretamente
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    
    document.getElementById('data').value = dataFormatada;

    // Configurar horário atual
    const timeString = hoje.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    document.getElementById('horario').value = timeString;

    // Atualizar dia da semana inicial
    atualizarDiaSemana();

    // Configurar event listeners
    document.getElementById('data').addEventListener('change', atualizarDiaSemana);
    document.getElementById('gerarFeedbackBtn').addEventListener('click', gerarFeedback);
    document.getElementById('copyButton').addEventListener('click', copiarTexto);
    document.getElementById('themeSwitch').addEventListener('click', toggleTheme);

    // Inicializar tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

function atualizarDiaSemana() {
    const dataInput = document.getElementById('data').value;
    const data = new Date(dataInput);
    const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    const diaSemana = diasSemana[data.getDay()];
    document.getElementById('diaSemana').value = diaSemana;
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
    const data = formatarData(document.getElementById('data').value);
    const diaSemana = document.getElementById('diaSemana').value;
    const horario = document.getElementById('horario').value;

    const feedback = `------------------------
📆 Data: ${data}
📅 Dia da Semana: ${diaSemana}
🕒 Horário: ${horario}

** Sem agendamentos e nenhum aluno entrou. **
------------------------`;

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