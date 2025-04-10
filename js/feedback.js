// --- Lógica de Histórico Específica para #turma ---
const HISTORICO_LIMITE_TURMA = 20;
const HISTORICO_TURMA_KEY = 'historicoTurma'; // Chave específica

function carregarHistoricoTurma() {
    console.log("[Histórico Turma] Carregando..."); // Log
    const datalist = document.getElementById('turma-list');
    if (!datalist) {
        console.error("[Histórico Turma] Erro: Datalist #turma-list não encontrado!"); // Log erro
        return;
    }

    const historicoJSON = localStorage.getItem(HISTORICO_TURMA_KEY);
    console.log("[Histórico Turma] Lido do localStorage:", historicoJSON); // Log
    try {
        const historico = JSON.parse(historicoJSON || '[]');
        datalist.innerHTML = '';
        historico.forEach(item => {
            console.log("[Histórico Turma] Adicionando opção:", item); // Log
            const option = document.createElement('option');
            option.value = item;
            datalist.appendChild(option);
        });
        console.log("[Histórico Turma] Carregamento concluído."); // Log
    } catch (e) {
        console.error("[Histórico Turma] Erro ao parsear JSON do localStorage:", e); // Log erro
        localStorage.removeItem(HISTORICO_TURMA_KEY); // Limpa chave inválida
    }
}

function salvarHistoricoTurma(valor) {
    console.log("[Histórico Turma] Tentando salvar valor:", valor); // Log
    if (!valor || typeof valor !== 'string' || valor.trim() === '') {
        console.log("[Histórico Turma] Valor inválido ou vazio, não salvando."); // Log
        return;
    }

    let historico = [];
    try {
        historico = JSON.parse(localStorage.getItem(HISTORICO_TURMA_KEY) || '[]');
        if (!Array.isArray(historico)) { // Verifica se é um array
           console.warn("[Histórico Turma] Valor no localStorage não era um array. Resetando.");
           historico = [];
        }
    } catch (e) {
        console.error("[Histórico Turma] Erro ao ler/parsear histórico para salvar. Resetando.", e);
        historico = [];
    }

    const valorTrimmed = valor.trim();

    historico = historico.filter(item => item !== valorTrimmed); // Remove duplicados
    historico.unshift(valorTrimmed); // Adiciona no início

    if (historico.length > HISTORICO_LIMITE_TURMA) {
        historico = historico.slice(0, HISTORICO_LIMITE_TURMA); // Limita tamanho
    }

    const historicoJSON = JSON.stringify(historico);
    console.log("[Histórico Turma] Salvando no localStorage:", historicoJSON); // Log
    try {
        localStorage.setItem(HISTORICO_TURMA_KEY, historicoJSON);
        console.log("[Histórico Turma] Salvo com sucesso!"); // Log
    } catch (e) {
        console.error("[Histórico Turma] Erro ao salvar no localStorage:", e); // Log erro
        alert("Não foi possível salvar o histórico. Verifique as permissões do localStorage ou se o limite de armazenamento foi atingido.");
    }
}
// --- Fim da Lógica de Histórico ---

function formatarData(data) {
    if (!data) return ''; // Retorna vazio se data for inválida
    const partes = data.split('-');
    if (partes.length !== 3) return data; // Retorna original se não estiver no formato esperado

    const [ano, mes, dia] = partes;
    const meses = [
        'jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.',
        'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'
    ];
    const mesNum = parseInt(mes);
    if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) return data; // Retorna original se mês for inválido

    return `${dia} de ${meses[mesNum - 1]} de ${ano}`;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("[DOM] DOM carregado para feedback-aula."); // Log
    // Configurar data atual
    try {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        const dataInput = document.getElementById('data');
        if (dataInput) {
            dataInput.value = dataFormatada; // Usar .value 
            console.log("[DOM] Data definida para:", dataFormatada);
        } else {
           console.warn("[DOM] Elemento #data não encontrado."); // Log aviso
        }
    } catch (e) {
        console.error("[DOM] Erro ao configurar data:", e);
    }

    // Configurar event listeners
    const gerarBtn = document.getElementById('gerarFeedbackBtn');
    const copyBtn = document.getElementById('copyButton');
    const themeSwitchBtn = document.getElementById('themeSwitch');
    const tipoParaCasaSelect = document.getElementById('tipoParaCasa');

    if(gerarBtn) {
        gerarBtn.addEventListener('click', gerarFeedback);
        console.log("[DOM] Listener adicionado a #gerarFeedbackBtn.");
    } else {
        console.error("[DOM] Erro: Botão #gerarFeedbackBtn não encontrado!");
    }
    if(copyBtn) {
         copyBtn.addEventListener('click', copiarTexto);
         console.log("[DOM] Listener adicionado a #copyButton.");
    } else {
         console.warn("[DOM] Botão #copyButton não encontrado.");
    }
    if(themeSwitchBtn) {
        themeSwitchBtn.addEventListener('click', toggleTheme);
        console.log("[DOM] Listener adicionado a #themeSwitch.");
    } else {
        console.warn("[DOM] Botão #themeSwitch não encontrado.");
    }
    if(tipoParaCasaSelect) {
        tipoParaCasaSelect.addEventListener('change', toggleParaCasaTexto);
        console.log("[DOM] Listener de change adicionado a #tipoParaCasa.");
         // Garante estado inicial correto
        toggleParaCasaTexto();
    } else {
         console.warn("[DOM] Select #tipoParaCasa não encontrado.");
    }

    // Inicializar tema
    try {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        console.log("[DOM] Tema inicializado para:", savedTheme);
    } catch (e) {
        console.error("[DOM] Erro ao inicializar tema:", e);
    }
    
    // Carregar histórico da turma ao iniciar
    console.log("[DOM] Chamando carregarHistoricoTurma do DOMContentLoaded."); // Log
    carregarHistoricoTurma();

    // Adicionar evento para controlar visibilidade do textarea
    document.getElementById('tipoParaCasa').addEventListener('change', function() {
        const paraCasaTexto = document.getElementById('paraCasaTexto');
        paraCasaTexto.style.display = this.value === 'personalizado' ? 'block' : 'none';
    });
});

function toggleParaCasaTexto() {
    const tipoParaCasaSelect = document.getElementById('tipoParaCasa');
    const paraCasaTexto = document.getElementById('paraCasaTexto');
    if(tipoParaCasaSelect && paraCasaTexto) {
        const tipoParaCasa = tipoParaCasaSelect.value;
        console.log("[ParaCasa] Visibilidade definida para:", tipoParaCasa === 'personalizado' ? 'block' : 'none');
        paraCasaTexto.style.display = tipoParaCasa === 'personalizado' ? 'block' : 'none';
    } else {
        if (!tipoParaCasaSelect) console.warn("[ParaCasa] Select #tipoParaCasa não encontrado em toggle.");
        if (!paraCasaTexto) console.warn("[ParaCasa] Textarea #paraCasaTexto não encontrado em toggle.");
    }
}

function gerarFeedback() {
    console.log("[Feedback] Função gerarFeedback iniciada."); // Log
    const turmaInput = document.getElementById('turma');
    const dataInput = document.getElementById('data');
    const linkAulaInput = document.getElementById('linkAula');
    const professorInput = document.getElementById('professor');
    const ferramentaInput = document.getElementById('ferramenta'); 
    const objetivosInput = document.getElementById('objetivos');
    const tipoParaCasaSelect = document.getElementById('tipoParaCasa');
    const paraCasaTextoInput = document.getElementById('paraCasaTexto');
    
    // Checa se todos os elementos essenciais existem
    const elementosNecessarios = [
        turmaInput, dataInput, linkAulaInput, professorInput,
        ferramentaInput, objetivosInput, tipoParaCasaSelect, paraCasaTextoInput
    ];
    const nomesElementos = [
        '#turma', '#data', '#linkAula', '#professor',
        '#ferramenta', '#objetivos', '#tipoParaCasa', '#paraCasaTexto'
    ];

    for (let i = 0; i < elementosNecessarios.length; i++) {
        if (!elementosNecessarios[i]) {
             const msgErro = `[Feedback] Erro: Elemento ${nomesElementos[i]} não foi encontrado.`;
             console.error(msgErro);
             alert(`Erro ao gerar feedback: ${msgErro}. Verifique o console.`);
             return;
        }
    }

    const turma = turmaInput.value;
    const data = dataInput.value;
    const linkAula = linkAulaInput.value;
    const professor = professorInput.value;
    const ferramenta = ferramentaInput.value; 
    const objetivos = objetivosInput.value;
    const tipoParaCasa = tipoParaCasaSelect.value;
    const paraCasaTexto = paraCasaTextoInput.value;

    // Salvar histórico da turma
    console.log("[Feedback] Chamando salvarHistoricoTurma."); // Log
    salvarHistoricoTurma(turma);
    // Atualizar datalist da turma imediatamente
    console.log("[Feedback] Chamando carregarHistoricoTurma após salvar."); // Log
    carregarHistoricoTurma();

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
    const copyButton = document.getElementById('copyButton');

    if(resultado) {
        resultado.textContent = feedback;
        resultado.style.display = 'block';
        console.log("[Feedback] Feedback gerado e exibido.");
    } else {
         console.error("[Feedback] Erro: Elemento #resultado não encontrado para exibir feedback.");
    }
    if(copyButton) {
        copyButton.style.display = 'block';
        console.log("[Feedback] Botão Copiar exibido.");
    } else {
        console.warn("[Feedback] Botão #copyButton não encontrado para exibir.");
    }
    console.log("[Feedback] Função gerarFeedback concluída."); // Log
}

function copiarTexto() {
    const texto = document.getElementById('resultado')?.textContent;
    if (texto && navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            console.log("[Copiar] Texto copiado com sucesso!");
            alert('Texto copiado com sucesso!');
        }, (err) => {
            console.error('[Copiar] Falha ao copiar texto: ', err);
            alert('Falha ao copiar o texto.');
        });
    } else {
        if (!texto) console.error("[Copiar] Erro: Elemento #resultado não encontrado ou vazio.");
        if (!navigator.clipboard) console.error("[Copiar] Erro: navigator.clipboard não está disponível (talvez HTTPS seja necessário).");
         alert('Erro ao copiar texto. Verifique o console.');
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    console.log("[Tema] Tema definido para:", theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log("[Tema] Alternando tema de", currentTheme, "para", newTheme);
    setTheme(newTheme);
}