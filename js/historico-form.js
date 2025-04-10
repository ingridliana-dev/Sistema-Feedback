// js/historico-form.js - Lógica Genérica de Histórico de Formulários

const HISTORICO_LIMITE = 20;

/**
 * Gera a chave única para o localStorage baseada no ID do campo.
 * @param {string} inputId O ID do campo de input/textarea.
 * @returns {string} A chave do localStorage.
 */
function getStorageKey(inputId) {
    return `formHistorico-${inputId}`;
}

/**
 * Carrega o histórico do localStorage e preenche o datalist associado.
 * @param {string} inputId O ID do campo de input/textarea.
 */
function carregarHistorico(inputId) {
    const datalist = document.getElementById(`${inputId}-list`);
    if (!datalist) return; 

    const storageKey = getStorageKey(inputId);
    let historicoJSON = null;
    try {
        historicoJSON = localStorage.getItem(storageKey);
        console.log(`[Histórico #${inputId}] Lido do localStorage:`, historicoJSON); // LOG ATIVADO
    } catch (e) {
        console.error(`[Histórico #${inputId}] Erro ao LER do localStorage:`, e);
        return; // Não continuar se não puder ler
    }

    try {
        const historico = JSON.parse(historicoJSON || '[]'); // Default para array vazio se null/undefined
        if (!Array.isArray(historico)) {
            console.warn(`[Histórico #${inputId}] Valor no localStorage não era array. Conteúdo:`, historicoJSON, "Resetando.");
            localStorage.removeItem(storageKey);
            datalist.innerHTML = '';
            return;
        }
        
        datalist.innerHTML = ''; 
        historico.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            datalist.appendChild(option);
        });
        console.log(`[Histórico #${inputId}] Carregamento concluído. ${historico.length} itens.`); // LOG ATIVADO
    } catch (e) {
        console.error(`[Histórico #${inputId}] Erro ao PARSEAR JSON:`, e, "Conteúdo lido:", historicoJSON);
        // Se deu erro no parse, o conteúdo provavelmente está corrompido. Limpar.
        try { localStorage.removeItem(storageKey); } catch (removeError) { console.error("Erro ao tentar remover chave corrompida:", removeError); }
        datalist.innerHTML = '';
    }
}

/**
 * Salva um valor no histórico do campo especificado no localStorage.
 * @param {string} inputId O ID do campo de input/textarea.
 * @param {string} valor O valor a ser salvo.
 */
function salvarHistorico(inputId, valor) {
    if (valor === null || valor === undefined || (typeof valor === 'string' && valor.trim() === '')) {
        return; 
    }
    
    const valorStr = String(valor).trim(); 
    if (valorStr === '') return;

    const storageKey = getStorageKey(inputId);
    let historico = [];
    let historicoLidoJSON = null;

    // Tenta ler e parsear o histórico existente
    try {
        historicoLidoJSON = localStorage.getItem(storageKey);
        historico = JSON.parse(historicoLidoJSON || '[]');
        if (!Array.isArray(historico)) {
            console.warn(`[Histórico #${inputId}] Valor lido para salvar não era array. Resetando. Lido:`, historicoLidoJSON);
            historico = [];
        }
    } catch (e) {
        console.error(`[Histórico #${inputId}] Erro ao ler/parsear histórico para salvar. Resetando. Lido:`, historicoLidoJSON, "Erro:", e);
        historico = [];
    }

    // Manipula o array
    historico = historico.filter(item => String(item).toLowerCase() !== valorStr.toLowerCase());
    historico.unshift(valorStr);
    if (historico.length > HISTORICO_LIMITE) {
        historico = historico.slice(0, HISTORICO_LIMITE);
    }

    // Tenta salvar de volta no localStorage
    const historicoParaSalvarJSON = JSON.stringify(historico);
    console.log(`[Histórico #${inputId}] Preparado para salvar:`, historicoParaSalvarJSON); // LOG ATIVADO
    try {
        localStorage.setItem(storageKey, historicoParaSalvarJSON);
        console.log(`[Histórico #${inputId}] Salvo com sucesso!`); // LOG ATIVADO
    } catch (e) {
        console.error(`[Histórico #${inputId}] Erro ao SALVAR no localStorage:`, e);
        // Não limpar a chave aqui, pode ser erro temporário (ex: limite)
    }
}

// --- Carregamento Automático --- 

document.addEventListener('DOMContentLoaded', function() {
    const camposComHistorico = document.querySelectorAll('input[type="text"][list], textarea[list]'); 
    console.log(`[Histórico Auto] Encontrados ${camposComHistorico.length} campos com 'list'.`);
    camposComHistorico.forEach(campo => {
        if (campo.id) {
            if (document.getElementById(`${campo.id}-list`)) {
                 console.log(`[Histórico Auto] Disparando carregamento para #${campo.id}`); // LOG ATIVADO
                 carregarHistorico(campo.id);
            } else {
                console.warn(`[Histórico Auto] Campo #${campo.id} tem 'list' mas datalist #${campo.id}-list não foi encontrado.`);
            }
        } else {
            console.warn("[Histórico Auto] Campo com atributo 'list' não possui ID:", campo);
        }
    });
}); 