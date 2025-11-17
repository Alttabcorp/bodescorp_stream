# Landing page — OrnnMainBR

Breve landing page estática para um streamer main Ornn. Projetada para ser leve, responsiva e fácil de personalizar.

O que tem aqui
- `index.html` — marcação principal
- `styles.css` — estilos (tema Ornn: tons terrosos, forja)
- `script.js` — pequenas interações (menu, alternância de tema, ano dinâmico)
- `logo.svg` — logo simples

Como ver localmente
1. Abra o arquivo `landing/index.html` num navegador (duplo clique ou `file://`).
2. Para um servidor local (recomendado):

```bash
# usando Python 3 na pasta 'landing'
cd landing
python3 -m http.server 8000
# acessar http://localhost:8000
```

Personalização rápida
- Substitua os links das redes sociais no `index.html` pelos URLs reais.
- Altere o horário da agenda na seção `#schedule`.
- Atualize o SVG `logo.svg` por um logo personalizado.

Próximos passos sugeridos
- Integrar botão "Assistir" com link direto para Twitch / embed player.
- Adicionar formulários de contato ou integração com Discord.
- Incluir thumbnails reais nos destaques/clips.
