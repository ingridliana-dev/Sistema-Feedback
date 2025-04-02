window.onload = function() {

    // Mostrar/ocultar campo de outro conteúdo
    document.getElementById('outroConteudo').addEventListener('change', function() {
        document.getElementById('outroConteudoTexto').style.display = this.checked ? 'block' : 'none';
    });

    // Atualizar valor do slider
    const slider = document.getElementById('chance');
    const output = document.getElementById('chanceValue');
    slider.oninput = function() {
        output.textContent = this.value;
    }
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
    const horario = document.getElementById('horario').value;
    const nivel = document.getElementById('nivel').value;
    const nomeAluno = document.getElementById('nomeAluno').value;
    const idade = document.getElementById('idade').value;
    
    // Pegar conteúdos selecionados
    const conteudos = Array.from(document.querySelectorAll('input[name="conteudo"]:checked'))
        .map(cb => cb.value);
    const outroConteudo = document.getElementById('outroConteudo').checked ? 
        document.getElementById('outroConteudoTexto').value : '';
    if (outroConteudo) conteudos.push(outroConteudo);

    const desenvolvimento = document.getElementById('desenvolvimento').value;
    const condicoes = document.getElementById('condicoes').value;
    
    // Pegar cursos indicados
    const cursosIndicados = Array.from(document.querySelectorAll('input[name="curso"]:checked'))
        .map(cb => cb.value);
    
    // Pegar ritmo selecionado
    const ritmo = Array.from(document.querySelectorAll('input[name="ritmo"]:checked'))
        .map(cb => cb.value)[0];
    
    const chance = document.getElementById('chance').value;

    // Pegar status dos equipamentos
    const microfone = document.querySelector('select[name="microfone"]').value;
    const camera = document.querySelector('select[name="camera"]').value;
    const mouse = document.querySelector('select[name="mouse"]').value;
    const internet = document.querySelector('select[name="internet"]').value;
    const pc = document.querySelector('select[name="pc"]').value;

    const feedback = `------------------
📅 Data: ${data}
⏰ Horário: ${horario}
📊 Nível: ${nivel}
👤 Nome do Aluno: ${nomeAluno}
🎂 Idade: ${idade}

📚 Conteúdo aplicado: ${conteudos.join(', ')}

📝 Desenvolvimento: ${desenvolvimento}

✅ Tem condições de frequentar o Curso? ${condicoes}
📋 Curso(s) indicado(s): ${cursosIndicados.join(', ')}
⚡ Ritmo de turma: ${ritmo}
🎯 Chance de matricular: ${chance}/10

🖥️ Equipamentos:
🎙 Microfone: ${microfone}
📷 Câmera: ${camera}
🖱 Mouse: ${mouse}
📶 Internet: ${internet}
💻 PC: ${pc}
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