/* Navegação estática, detalhes dos projetos e pequenos segredos para curiosos. */
(() => {
    'use strict';
    const projects = window.portfolioProjects;
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const themeToggle = document.getElementById('theme-toggle');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let previousFocus;
    let previousOverflow = '';
    let toastTimer;
    const toast = message => {
        const node = document.getElementById('dev-toast');
        node.textContent = message;
        node.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { node.hidden = true; }, 4500);
    };
    const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    function applyTheme(theme) {
        document.body.dataset.theme = theme;
        themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
    let savedTheme;
    try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage pode estar indisponível em navegação privada. */ }
    applyTheme(['light', 'dark'].includes(savedTheme) ? savedTheme : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    themeToggle.addEventListener('click', () => {
        const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(theme);
        try { localStorage.setItem('portfolio-theme', theme); } catch { /* O tema continua funcionando sem persistência. */ }
    });
    function closeProject() {
        if (modal.open) modal.close();
    }
    modal.addEventListener('close', () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = previousOverflow;
        previousFocus?.focus();
    });
    modal.querySelector('.modal-close').addEventListener('click', closeProject);
    modal.addEventListener('click', event => { if (event.target === modal) closeProject(); });
    function openProject(id) {
        const project = projects.find(item => item.id === id);
        if (!project) { toast('Projeto não encontrado. Escolha um dos projetos da lista.'); return; }
        previousFocus = document.activeElement;
        modalBody.innerHTML = `
            <h2 class="modal-title" id="project-title">${escape(project.name)}</h2>
            <div class="modal-meta-row"><span class="modal-badge">${escape(project.status)}</span></div>
            <div class="modal-section"><h3>Sobre o projeto</h3><p class="modal-description">${escape(project.description)}</p></div>
            <div class="modal-section"><h3>Destaques</h3><ul class="features-list">${project.features.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div>
            <div class="modal-section"><h3>Tecnologias e arquitetura</h3><div class="stack-grid">${project.stack.map(([title, content]) => `<div class="stack-item"><div class="stack-item-title">${escape(title)}</div><div class="stack-item-content">${escape(content)}</div></div>`).join('')}</div></div>
            <p class="modal-note">${escape(project.note)}</p>
            <div class="modal-links"><a class="cta-link" href="https://github.com/esc4n0rx/${encodeURIComponent(project.repo)}" target="_blank" rel="noopener noreferrer">Explorar repositório ↗</a></div>`;
        previousOverflow = document.body.style.overflow;
        modal.showModal();
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        modal.querySelector('.modal-content').scrollTop = 0;
        modal.querySelector('.modal-close').focus();
    }
    document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
    function navigate() {
        const id = location.hash.slice(1) || 'inicio';
        const section = document.getElementById(id);
        if (!section?.classList.contains('section')) {
            location.replace('/404.html');
            return;
        }
        closeProject();
        document.querySelectorAll('.section').forEach(item => item.classList.toggle('active', item === section));
        document.querySelectorAll('.nav-menu a').forEach(link => {
            const active = link.hash === '#' + id;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
        });
    }
    window.addEventListener('hashchange', navigate);
    navigate();
    // Textura em baixa resolução e baixa frequência; respeita movimento reduzido.
    const canvas = document.getElementById('noise-canvas');
    const ctx = canvas.getContext('2d');
    let noiseTimer;
    function paintNoise() {
        if (!ctx) return;
        canvas.width = Math.max(1, Math.ceil(innerWidth / 4));
        canvas.height = Math.max(1, Math.ceil(innerHeight / 4));
        const image = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < image.data.length; i += 4) {
            image.data[i + 3] = Math.random() < .5 ? 80 : 0;
        }
        ctx.putImageData(image, 0, 0);
    }
    function updateNoise() {
        clearInterval(noiseTimer);
        paintNoise();
        if (!reducedMotion.matches && !document.hidden) noiseTimer = setInterval(paintNoise, 140);
    }
    reducedMotion.addEventListener('change', updateNoise);
    document.addEventListener('visibilitychange', updateNoise);
    window.addEventListener('resize', paintNoise);
    updateNoise();
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let sequence = 0;
    let coffee = '';
    document.addEventListener('keydown', event => {
        if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input, textarea, [contenteditable="true"]')) return;
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
        sequence = key === konami[sequence] ? sequence + 1 : key === konami[0] ? 1 : 0;
        if (sequence === konami.length) {
            sequence = 0;
            document.body.classList.toggle('blueprint');
            toast(document.body.classList.contains('blueprint') ? '// Blueprint desbloqueado. Repita o código para sair.' : '// De volta à simplicidade.');
        }
        if (key.length === 1) {
            coffee = (coffee + key).slice(-6);
            if (coffee === 'coffee') toast('418 — I’m a teapot. Café é uma dependência de desenvolvimento. ☕');
        }
    });
    window.portfolio = Object.freeze({
        help: () => '↑ ↑ ↓ ↓ ← → ← → B A · ou digite coffee fora de campos de texto.',
        about: () => 'HTML + CSS + JavaScript. Seis projetos, muitas horas de curiosidade. Obrigado por ler o código!'
    });
    console.info('%c<paulo.dev />', 'font: 24px Georgia; padding: 12px 0;');
    console.info('Você encontrou a porta dos fundos. portfolio.help() revela as pistas.');
})();
