// Inicializar tema primeiro
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    
    // Configurar data
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    document.getElementById('data').value = dataFormatada;

    // Configurar horário
    const timeString = hoje.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    document.getElementById('horario').value = timeString;

    // Configurar eventos
    document.getElementById('outroConteudo').addEventListener('change', function() {
        document.getElementById('outroConteudoTexto').style.display = this.checked ? 'block' : 'none';
    });

    const slider = document.getElementById('chance');
    const output = document.getElementById('chanceValue');
    slider.oninput = function() {
        output.textContent = this.value;
    }

    // Adicionar evento ao botão de tema
    document.getElementById('themeSwitch').addEventListener('click', toggleTheme);
});

function toggleFields() {
    const presenca = document.getElementById('presenca').value;
    const camposFeedback = document.getElementById('campos-feedback');
    const botaoGerar = document.querySelector('button[onclick="gerarFeedback()"]');
    
    if (presenca === 'compareceu') {
        camposFeedback.style.display = 'block';
    } else {
        camposFeedback.style.display = 'none';
    }
    // Sempre mostrar o botão gerar
    botaoGerar.style.display = 'block';
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
    console.log("[Feedback Exp] Gerando feedback...");
    const presenca = document.getElementById('presenca').value;
    const data = formatarData(document.getElementById('data').value);
    const horario = document.getElementById('horario').value;
    const nivel = document.getElementById('nivel').value;
    const nomeAlunoInput = document.getElementById('nomeAluno');
    const outroConteudoTextoInput = document.getElementById('outroConteudoTexto');
    const desenvolvimentoInput = document.getElementById('desenvolvimento');
    
    const nomeAluno = nomeAlunoInput.value;
    const idade = document.getElementById('idade').value;

    // Salvar nome do aluno sempre que gerar
    console.log("[Feedback Exp] Salvando histórico nomeAluno...");
    salvarHistorico(nomeAlunoInput.id, nomeAluno);

    if (presenca === 'nao-compareceu') {
        const feedback = `------------------------
📆 Data: ${data}
🕒 Horário: 19:00
📚 Nível: ${nivel}

Aluno: ${nomeAluno}
Idade: ${idade}

Após aguardar durante 1h, o aluno não compareceu.
------------------------`;

        const resultado = document.getElementById('resultado');
        resultado.textContent = feedback;
        resultado.style.display = 'block';
        document.getElementById('copyButton').style.display = 'block';
        console.log("[Feedback Exp] Aluno não compareceu, feedback gerado.");
        return;
    }

    // Código para quando o aluno comparece
    const outroConteudoCheckbox = document.getElementById('outroConteudo');
    const outroConteudoTextoValue = outroConteudoTextoInput.value;
    const desenvolvimentoValue = desenvolvimentoInput.value;

    // Salvar histórico dos campos relevantes ANTES de gerar o texto final
    console.log("[Feedback Exp] Salvando históricos adicionais...");
    if (outroConteudoCheckbox.checked && outroConteudoTextoInput.hasAttribute('list')) {
        salvarHistorico(outroConteudoTextoInput.id, outroConteudoTextoValue);
    }
    if (desenvolvimentoInput.hasAttribute('list')) {
        salvarHistorico(desenvolvimentoInput.id, desenvolvimentoValue);
    }
    // NÃO precisa recarregar os datalists aqui

    const conteudosSelecionados = [...document.querySelectorAll('input[name="conteudo"]:checked')]
        .map(input => {
            if (input.value === 'outro') {
                return outroConteudoCheckbox.checked ? (outroConteudoTextoValue || 'outro') : null;
            }
            return input.value;
        })
        .filter(value => value !== null) 
        .join(', ');

    const cursos = [...document.querySelectorAll('input[name="curso"]:checked')]
        .map(input => input.value)
        .join(', ');

    const ritmos = [...document.querySelectorAll('input[name="ritmo"]:checked')]
        .map(input => input.value)
        .join(', ');

    const chance = document.getElementById('chance').value;
    
    const microfone = document.querySelector('select[name="microfone"]').value;
    const camera = document.querySelector('select[name="camera"]').value;
    const mouse = document.querySelector('select[name="mouse"]').value;
    const internet = document.querySelector('select[name="internet"]').value;
    const pc = document.querySelector('select[name="pc"]').value;

    const feedback = `------------------------
📆 Data: ${data}
🕒 Horário: ${horario}
📚 Nível: ${nivel}

**Aluno: ${nomeAluno}**
Idade: ${idade}

📖 Conteúdo aplicado: ${conteudosSelecionados}

📝 Desenvolvimento: ${desenvolvimentoValue}

✅ Tem condições de frequentar o Curso?
📚 Curso(s) indicado(s): ${cursos}
⚡ Ritmo de turma: ${ritmos}
🎯 Chance de matricular: ${chance}/10

💻 Equipamentos:
🎙 Microfone: ${microfone}
📷 Câmera: ${camera}
🖱 Mouse: ${mouse}
📶 Internet: ${internet}
💻 PC: ${pc}
------------------------`;

    const resultado = document.getElementById('resultado');
    resultado.textContent = feedback;
    resultado.style.display = 'block';
    document.getElementById('copyButton').style.display = 'block';
    console.log("[Feedback Exp] Feedback para aluno presente gerado.");
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