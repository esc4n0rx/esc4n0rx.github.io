# Portfólio — Paulo Oliveira

Site estático em HTML, CSS e JavaScript, mantendo a composição minimalista, temas claro/escuro e projetos em modais.

## Desenvolvimento

Não há build nem dependências de produção. Na raiz do checkout:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

`projects.js` concentra os seis projetos selecionados e seus links. Os textos foram elaborados a partir da documentação e estrutura dos repositórios Abapfy v2, Tako, DrawAi, TorrentFlixx, VynPad e Lyn. As categorias descrevem o tipo ou estágio documentado, sem presumir publicação em produção.

## Recuperação e hospedagem

- `404.html`: página personalizada reconhecida automaticamente pelo GitHub Pages na raiz do site.
- `error.html`: recuperação quando os scripts da aplicação falham. Não simula uma resposta HTTP 500.
- Recursos usam caminhos absolutos para a publicação na raiz de `esc4n0rx.github.io`.
- O servidor padrão do Python entrega os arquivos, mas não usa `404.html` para URLs inexistentes; isso depende da hospedagem.

## Verificação

Com o servidor ativo, Chromium e Playwright disponíveis no ambiente:

```sh
node tests/smoke.cjs
```

Verifica seis modais, links, Escape e retorno do foco, tema persistente, histórico, larguras de 360 a 1280 pixels, movimento reduzido, recuperação de erros e easter eggs. Screenshots temporários ficam em `/tmp/portfolio-checks`.

## Segredos para devs

O console indica `portfolio.help()`. O código Konami alterna uma malha de arquitetura discreta; digitar `coffee` fora de campos de texto revela uma mensagem HTTP 418. Nenhum deles executa código fornecido pelo visitante.
