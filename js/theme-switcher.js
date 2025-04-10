const themeSwitchButton = document.getElementById('themeSwitch');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Atualiza o ícone do botão (opcional, mas bom para UX)
    if (themeSwitchButton) {
        themeSwitchButton.textContent = theme === 'dark' ? '☀️' : '🌓';
    }
}

function toggleTheme() {
    // Ao clicar, sempre baseia na preferência salva OU na detecção atual do sistema
    const currentSetTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentSetTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); // Salva a nova escolha manual no localStorage
}

function detectSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // Se já existe uma preferência salva pelo usuário, usa ela
        setTheme(savedTheme);
        console.log('[Theme] Aplicado tema salvo:', savedTheme);
    } else {
        // Se não há preferência salva, detecta a do sistema
        const systemPreference = detectSystemPreference();
        setTheme(systemPreference);
        console.log('[Theme] Aplicado tema do sistema:', systemPreference);
        // IMPORTANTE: Não salvar a preferência do sistema no localStorage aqui,
        // para permitir que a detecção ocorra novamente se o usuário limpar o storage
        // ou se a preferência do sistema mudar.
        localStorage.removeItem('theme'); // Garante que não haja lixo
        // Atualiza o atributo diretamente, pois setTheme salva no localStorage
        document.documentElement.setAttribute('data-theme', systemPreference);
        if (themeSwitchButton) {
             themeSwitchButton.textContent = systemPreference === 'dark' ? '☀️' : '🌓';
        }
    }
}

// Inicializa o tema ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Adiciona o listener ao botão, se ele existir na página
    const button = document.getElementById('themeSwitch');
    if (button) {
        button.addEventListener('click', toggleTheme);
    }
}); 