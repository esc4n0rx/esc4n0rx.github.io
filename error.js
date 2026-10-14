/* As páginas estáticas de recuperação também respeitam o tema escolhido. */
(() => {
    let theme;
    try { theme = localStorage.getItem('portfolio-theme'); } catch { /* Usa a preferência do sistema. */ }
    document.body.dataset.theme = ['light', 'dark'].includes(theme) ? theme : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (document.getElementById('project-modal')) {
        window.addEventListener('error', event => {
            const source = event.filename || (event.target instanceof HTMLScriptElement ? event.target.src : '');
            if (source === location.origin + '/app.js' || source === location.origin + '/projects.js') location.assign('/error.html');
        }, true);
    }
})();
