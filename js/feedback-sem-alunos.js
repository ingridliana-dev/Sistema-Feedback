document.addEventListener('DOMContentLoaded', function() {
    console.log("[DOM SA] DOM carregado.");
    // Configurar data atual
    try {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        const dataInput = document.getElementById('data');
        if (dataInput) {
            dataInput.value = dataFormatada;
            console.log("[DOM SA] Data definida.");
        } else {
             console.warn("[DOM SA] Input #data não encontrado.");
        }
    } catch(e) { console.error("[DOM SA] Erro ao setar data:", e); }

    // Configurar event listeners
    const gerarBtn = document.getElementById('gerarFeedbackBtn');
    const copyBtn = document.getElementById('copyButton');
    const themeSwitchBtn = document.getElementById('themeSwitch');

    if(gerarBtn) {
         gerarBtn.addEventListener('click', gerarFeedback);
         console.log("[DOM SA] Listener #gerarFeedbackBtn adicionado.");
    } else { console.error("[DOM SA] Botão #gerarFeedbackBtn não encontrado!"); }
    
    if(copyBtn) {
        copyBtn.addEventListener('click', copiarTexto);
        console.log("[DOM SA] Listener #copyButton adicionado.");
    } else { console.warn("[DOM SA] Botão #copyButton não encontrado."); }
    
    if(themeSwitchBtn) {
        themeSwitchBtn.addEventListener('click', toggleTheme);
        console.log("[DOM SA] Listener #themeSwitch adicionado.");
    } else { console.warn("[DOM SA] Botão #themeSwitch não encontrado."); }

    // Inicializar tema
    try {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        console.log("[DOM SA] Tema inicializado.");
    } catch(e) { console.error("[DOM SA] Erro ao inicializar tema:", e); }
});

function formatarData(data) {
    if (!data) return ''; 
    const partes = data.split('-');
    if (partes.length !== 3) return data; 
    const [ano, mes, dia] = partes;
    const meses = [
        'jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.',
        'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'
    ];
    const mesNum = parseInt(mes);
    if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) return data; 
    return `${dia} de ${meses[mesNum - 1]} de ${ano}`;
}

function gerarFeedback() {
    console.log("[Feedback SA] Gerando feedback...");
    const turmaInput = document.getElementById('turma');
    const dataInput = document.getElementById('data');
    const linkAulaInput = document.getElementById('linkAula');
    const professorInput = document.getElementById('professor');

    // Validação básica de elementos
    if (!turmaInput || !dataInput || !linkAulaInput || !professorInput) {
        console.error("[Feedback SA] Erro: Um ou mais inputs não encontrados.");
        alert("Erro: Falta um campo no formulário.");
        return;
    }

    const turma = turmaInput.value;
    const data = formatarData(dataInput.value);
    const linkAula = linkAulaInput.value;
    const professor = professorInput.value;

    // Salvar Históricos usando a função genérica
    console.log("[Feedback SA] Salvando históricos...");
    salvarHistorico(turmaInput.id, turma);
    salvarHistorico(professorInput.id, professor);
    // Opcional: salvar linkAula se tiver datalist
    if(linkAulaInput.hasAttribute('list')) salvarHistorico(linkAulaInput.id, linkAula);

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

❓Qualquer dúvida entre em contato com a secretaria de sua escola. 🚀
------------------`;

    const resultado = document.getElementById('resultado');
    const copyButton = document.getElementById('copyButton');

    if(resultado) {
        resultado.textContent = feedback;
        resultado.style.display = 'block';
        console.log("[Feedback SA] Resultado exibido.");
    } else { console.error("[Feedback SA] Div #resultado não encontrada."); }
    
    if(copyButton) {
        copyButton.style.display = 'block';
        console.log("[Feedback SA] Botão Copiar exibido.");
    } else { console.warn("[Feedback SA] Botão #copyButton não encontrado."); }
}

function copiarTexto() {
    const texto = document.getElementById('resultado')?.textContent;
    if (texto && navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            console.log("[Copiar SA] Texto copiado.");
            alert('Texto copiado com sucesso!');
        }, (err) => {
            console.error('[Copiar SA] Falha ao copiar:', err);
            alert('Falha ao copiar o texto.');
        });
    } else { /* ... tratamento de erro ... */ }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    console.log("[Tema SA] Tema definido para:", theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log("[Tema SA] Alternando tema para:", newTheme);
    setTheme(newTheme);
}