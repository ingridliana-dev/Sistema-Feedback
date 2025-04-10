// --- Lógica de Histórico Específica para #turma (Sem Alunos) ---
const HISTORICO_LIMITE_TURMA_SA = 20;
const HISTORICO_TURMA_KEY_SA = 'historicoTurma_SA'; // Chave distinta

function carregarHistoricoTurma_SA() {
    console.log("[Histórico Turma SA] Carregando...");
    const datalist = document.getElementById('turma-list');
    if (!datalist) {
        console.error("[Histórico Turma SA] Erro: Datalist #turma-list não encontrado!");
        return;
    }
    const historicoJSON = localStorage.getItem(HISTORICO_TURMA_KEY_SA);
    console.log("[Histórico Turma SA] Lido do localStorage:", historicoJSON);
    try {
        const historico = JSON.parse(historicoJSON || '[]');
        datalist.innerHTML = '';
        historico.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            datalist.appendChild(option);
        });
        console.log("[Histórico Turma SA] Carregamento concluído.");
    } catch (e) {
        console.error("[Histórico Turma SA] Erro ao parsear JSON:", e);
        localStorage.removeItem(HISTORICO_TURMA_KEY_SA);
    }
}

function salvarHistoricoTurma_SA(valor) {
    console.log("[Histórico Turma SA] Tentando salvar valor:", valor);
    if (!valor || typeof valor !== 'string' || valor.trim() === '') return;
    let historico = [];
    try {
        historico = JSON.parse(localStorage.getItem(HISTORICO_TURMA_KEY_SA) || '[]');
        if (!Array.isArray(historico)) historico = [];
    } catch (e) { historico = []; }
    const valorTrimmed = valor.trim();
    historico = historico.filter(item => item !== valorTrimmed);
    historico.unshift(valorTrimmed);
    if (historico.length > HISTORICO_LIMITE_TURMA_SA) {
        historico = historico.slice(0, HISTORICO_LIMITE_TURMA_SA);
    }
    const historicoJSON = JSON.stringify(historico);
    console.log("[Histórico Turma SA] Salvando:", historicoJSON);
    try {
        localStorage.setItem(HISTORICO_TURMA_KEY_SA, historicoJSON);
        console.log("[Histórico Turma SA] Salvo com sucesso!");
    } catch (e) {
        console.error("[Histórico Turma SA] Erro ao salvar:", e);
    }
}
// --- Fim da Lógica #turma (Sem Alunos) ---

// --- Lógica de Histórico Específica para #professor (Sem Alunos) ---
const HISTORICO_LIMITE_PROFESSOR_SA = 20;
const HISTORICO_PROFESSOR_KEY_SA = 'historicoProfessor_SA'; // Chave distinta

function carregarHistoricoProfessor_SA() {
    console.log("[Histórico Professor SA] Carregando...");
    const datalist = document.getElementById('professor-list');
    if (!datalist) {
        console.error("[Histórico Professor SA] Erro: Datalist #professor-list não encontrado!");
        return;
    }
    const historicoJSON = localStorage.getItem(HISTORICO_PROFESSOR_KEY_SA);
    console.log("[Histórico Professor SA] Lido do localStorage:", historicoJSON);
    try {
        const historico = JSON.parse(historicoJSON || '[]');
        datalist.innerHTML = '';
        historico.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            datalist.appendChild(option);
        });
        console.log("[Histórico Professor SA] Carregamento concluído.");
    } catch (e) {
        console.error("[Histórico Professor SA] Erro ao parsear JSON:", e);
        localStorage.removeItem(HISTORICO_PROFESSOR_KEY_SA);
    }
}

function salvarHistoricoProfessor_SA(valor) {
    console.log("[Histórico Professor SA] Tentando salvar valor:", valor);
    if (!valor || typeof valor !== 'string' || valor.trim() === '') return;
    let historico = [];
    try {
        historico = JSON.parse(localStorage.getItem(HISTORICO_PROFESSOR_KEY_SA) || '[]');
        if (!Array.isArray(historico)) historico = [];
    } catch (e) { historico = []; }
    const valorTrimmed = valor.trim();
    historico = historico.filter(item => item !== valorTrimmed);
    historico.unshift(valorTrimmed);
    if (historico.length > HISTORICO_LIMITE_PROFESSOR_SA) {
        historico = historico.slice(0, HISTORICO_LIMITE_PROFESSOR_SA);
    }
    const historicoJSON = JSON.stringify(historico);
    console.log("[Histórico Professor SA] Salvando:", historicoJSON);
    try {
        localStorage.setItem(HISTORICO_PROFESSOR_KEY_SA, historicoJSON);
        console.log("[Histórico Professor SA] Salvo com sucesso!");
    } catch (e) {
        console.error("[Histórico Professor SA] Erro ao salvar:", e);
    }
}
// --- Fim da Lógica #professor (Sem Alunos) ---

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
    
    // Carregar históricos
    console.log("[DOM SA] Carregando históricos...");
    carregarHistoricoTurma_SA();
    carregarHistoricoProfessor_SA();
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

    // Salvar Históricos
    console.log("[Feedback SA] Salvando históricos...");
    salvarHistoricoTurma_SA(turma);
    salvarHistoricoProfessor_SA(professor);
    // Falta salvar linkAula se quisermos, mas não foi pedido.

    // Recarregar Datalists
    console.log("[Feedback SA] Recarregando datalists...");
    carregarHistoricoTurma_SA();
    carregarHistoricoProfessor_SA();

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