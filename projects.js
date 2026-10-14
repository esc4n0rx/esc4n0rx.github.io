// Conteúdo baseado na documentação e estrutura dos repositórios selecionados.
window.portfolioProjects = [
  {
    "id": "abapfy",
    "name": "Abapfy",
    "repo": "abapfyv2",
    "summary": "Workspace desktop de IA para equipes SAP.",
    "meta": "Electron / React / Supabase / MCP",
    "status": "Desktop",
    "description": "Workspace que reúne conhecimento, agentes de IA, documentos e tarefas para equipes SAP. O contexto é organizado por cliente, módulo, projeto e pasta, para apoiar sessões de trabalho sem repetir os mesmos anexos.",
    "features": [
      "Conversas com streaming e provedores OpenAI, Gemini e Claude.",
      "Agentes e skills especializados no ecossistema SAP/ABAP.",
      "Integração MCP por HTTP e stdio, com confirmação de ações sensíveis.",
      "Drive por cliente, quadro de tarefas e geração de especificações em DOCX."
    ],
    "stack": [
      [
        "Aplicativo",
        "Electron, React, TypeScript e Zustand"
      ],
      [
        "Dados",
        "Supabase Auth, PostgreSQL, RLS e Storage"
      ],
      [
        "Integrações",
        "Model Context Protocol e provedores de IA"
      ]
    ],
    "note": "Recursos colaborativos e administrativos dependem da configuração e das migrações do Supabase."
  },
  {
    "id": "tako",
    "name": "Tako",
    "repo": "Tako",
    "summary": "Backend de cardápio digital e pedidos para lojas.",
    "meta": "C# / ASP.NET Core / PostgreSQL",
    "status": "Backend SaaS",
    "description": "API de um SaaS de cardápio digital para restaurantes e lojas. Centraliza catálogo, pedidos, clientes e assinatura da plataforma em uma arquitetura em camadas, com isolamento entre lojas.",
    "features": [
      "Catálogo com categorias, produtos e opcionais por loja.",
      "Fluxos de pedidos, cupons, fidelidade e relatórios.",
      "Autorização por permissões e contexto multi-tenant.",
      "Integrações de WhatsApp e cobrança de assinaturas via Stripe."
    ],
    "stack": [
      [
        "Backend",
        "C#, ASP.NET Core e Entity Framework Core"
      ],
      [
        "Persistência",
        "PostgreSQL e Redis"
      ],
      [
        "Arquitetura",
        "API, Application, Domain e Infrastructure"
      ]
    ],
    "note": "Este repositório contém o backend. O Stripe atende à assinatura do lojista, não ao pagamento dos pedidos pelos clientes."
  },
  {
    "id": "drawai",
    "name": "DrawAi",
    "repo": "Drawai",
    "summary": "Diagramas colaborativos com copiloto de IA.",
    "meta": "React / TypeScript / Yjs",
    "status": "Web",
    "description": "Whiteboard e editor de diagramas com ferramentas de desenho, projetos em nuvem e copiloto de IA. Combina edição visual, colaboração em tempo real e importação de formatos usados por equipes de produto e engenharia.",
    "features": [
      "Formas, conectores, frames, camadas e desenho livre.",
      "Importação de Mermaid, draw.io e Excalidraw; exportação PNG, SVG, PDF e JSON.",
      "Colaboração com Yjs, presença e comentários no canvas.",
      "Copiloto multi-provedor com streaming e alterações pontuais no diagrama."
    ],
    "stack": [
      [
        "Interface",
        "React, TypeScript, Vite e Zustand"
      ],
      [
        "Colaboração",
        "Yjs (CRDT) e Supabase Realtime"
      ],
      [
        "Nuvem e IA",
        "Supabase Storage e Edge Functions"
      ]
    ],
    "note": "O editor local funciona sem Supabase; nuvem, colaboração e IA dependem dos serviços configurados."
  },
  {
    "id": "vynpad",
    "name": "VynPad",
    "repo": "VynPad",
    "summary": "Seu Android como controle de Xbox para o PC.",
    "meta": "Rust / Tauri / Kotlin",
    "status": "Em evolução",
    "description": "Aplicativo que transforma o celular Android em um controle virtual de Xbox 360 no Windows. O núcleo em Rust coordena pareamento, rede e mapeamento de entradas, com cliente Android e servidor desktop.",
    "features": [
      "Até quatro controles virtuais via ViGEmBus e XInput.",
      "Pareamento por QR code ou PIN e canal de controle TLS 1.3.",
      "Inputs UDP autenticados e cifrados com ChaCha20-Poly1305.",
      "Layouts editáveis, giroscópio, vibração e perfis de mapeamento."
    ],
    "stack": [
      [
        "Núcleo",
        "Rust, Tokio, UDP e TLS"
      ],
      [
        "Desktop",
        "Tauri 2, React e TypeScript"
      ],
      [
        "Android",
        "Kotlin, Compose Multiplatform e UniFFI"
      ]
    ],
    "note": "Aplicativos funcionais segundo a documentação; primeiro release, publicação mobile e medição completa de latência ainda são pendências registradas."
  },
  {
    "id": "lyn",
    "name": "Lyn",
    "repo": "Lyn",
    "summary": "Linguagem de programação para o ERP Lynx.",
    "meta": "Rust / Compilador / VM",
    "status": "Alpha",
    "description": "Linguagem com foco em legibilidade e regras de negócio, inspirada em COBOL e ABAP. Implementada em Rust, percorre análise léxica, parsing, análise semântica e geração de bytecode executado em uma máquina virtual própria.",
    "features": [
      "Tipos fortes, ausência de null e tratamento explícito com Result.",
      "Decimal exato para cálculos de domínio financeiro.",
      "Compilador, VM de bytecode e diagnósticos com localização no código.",
      "CLI para executar, verificar e inspecionar bytecode; extensão para VS Code."
    ],
    "stack": [
      [
        "Implementação",
        "Rust e workspace de crates"
      ],
      [
        "Pipeline",
        "Lexer, parser, semântica e geração de bytecode"
      ],
      [
        "Execução",
        "Máquina virtual e programas .lyn / .lynb"
      ]
    ],
    "note": "Projeto em estágio alpha. Bootstrap e IDE desktop fazem parte da evolução planejada."
  },
  {
    "id": "torrentflixx",
    "name": "TorrentFlixx",
    "repo": "TorrentFlixx",
    "summary": "Streaming via torrents com entrega HTTP parcial.",
    "meta": "Node.js / Express / WebTorrent",
    "status": "Experimental",
    "description": "Aplicação de streaming que disponibiliza arquivos de torrents por HTTP sem aguardar o download completo. Uma interface web em estilo terminal permite organizar torrents e gerenciar streams ativos.",
    "features": [
      "Upload e organização de arquivos .torrent por categoria.",
      "Ativação e desativação de streams via API.",
      "Suporte a HTTP Range para reprodução parcial em players compatíveis.",
      "Separação em rotas, controllers e serviços de streaming."
    ],
    "stack": [
      [
        "Servidor",
        "Node.js e Express"
      ],
      [
        "Streaming",
        "WebTorrent e requisições HTTP Range"
      ],
      [
        "Interface",
        "HTML, CSS e JavaScript"
      ]
    ],
    "note": "A documentação recomenda autenticação e HTTPS antes de exposição pública."
  }
];
