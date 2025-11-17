# 🎨 Guia de Personalização - Bodescorp Landing Page

Este guia mostra como personalizar facilmente a landing page do Bodescorp para outros streamers ou projetos similares.

## 🚀 Personalização Rápida

### 1. Informações Básicas

Edite o arquivo `src/landing/index.html`:

```html
<!-- Linha ~28: Título da página -->
<title>Bodescorp - Mestre Forjador | Streamer Ornn LoL</title>

<!-- Linha ~30: Nome do streamer -->
<h1>Bodescorp</h1>

<!-- Linha ~31: Descrição -->
<p>Streamer brasileiro especialista em Ornn no League of Legends...</p>
```

### 2. Links das Redes Sociais

```html
<!-- Seção de redes sociais (~linha 70-90) -->
<a href="SEU_TWITCH_URL" class="social-link">
  <svg>...</svg>
  <span>Twitch</span>
</a>

<a href="SEU_TWITTER_URL" class="social-link">
  <svg>...</svg>
  <span>Twitter</span>
</a>

<a href="SEU_DISCORD_URL" class="social-link">
  <svg>...</svg>
  <span>Discord</span>
</a>
```

### 3. Imagem do Campeão

```html
<!-- Linha ~37: Imagem principal -->
<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_0.jpg"
     alt="Ornn - O Forjador de Fogo">
```

### 4. Cores do Tema

Edite `src/landing/styles.css`:

```css
:root {
  /* Cores principais */
  --accent-primary: #ea580c;    /* Laranja principal */
  --accent-secondary: #dc2626; /* Vermelho secundário */

  /* Para outros campeões, use cores temáticas: */
  /* Ahri: #ff6b9d (rosa) */
  /* Jinx: #ff4757 (rosa choque) */
  /* Lux: #ffd700 (dourado) */
  /* Yasuo: #4a90e2 (azul) */
}
```

## 🎯 Adaptação para Outros Campeões

### Exemplo: Para um Main Yasuo

1. **Atualizar título e descrição:**
```html
<h1>YasuoMaster_BR</h1>
<p>Streamer brasileiro especialista em Yasuo no League of Legends...</p>
```

2. **Trocar imagem principal:**
```html
<img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg"
     alt="Yasuo - O Imperdoável">
```

3. **Ajustar cores do tema:**
```css
:root {
  --accent-primary: #4a90e2;    /* Azul Yasuo */
  --accent-secondary: #2c5282; /* Azul escuro */
}
```

4. **Atualizar dados do campeão:**
```javascript
// Em ornn-data.js, renomear para yasuo-data.js
// Trocar todas as referências de 'Ornn' para 'Yasuo'
```

## 📱 Personalização Avançada

### Adicionar Novo Modal

1. **HTML - Adicionar botão:**
```html
<button class="btn secondary" onclick="openNewModal()">Nova Feature</button>
```

2. **HTML - Adicionar modal:**
```html
<div id="newModal" class="modal">
  <div class="modal-content">
    <!-- Conteúdo do modal -->
  </div>
</div>
```

3. **JavaScript - Adicionar funções:**
```javascript
window.openNewModal = function() {
  const modal = document.getElementById('newModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeNewModal = function() {
  const modal = document.getElementById('newModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
};
```

4. **CSS - Estilizar modal:**
```css
/* Adicionar estilos específicos se necessário */
#newModal .modal-content {
  max-width: 600px;
}
```

### Modificar Layout da Galeria

```css
/* skins-gallery em styles.css */
.modern-skins-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Menor */
  /* ou */
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); /* Maior */
}
```

## 🎨 Temas para Diferentes Campeões

### Cores Sugeridas:

```css
/* Ahri - Sedutora */
--accent-primary: #ff6b9d;
--accent-secondary: #ff4757;

/* Jinx - Caos */
--accent-primary: #ff4757;
--accent-secondary: #ffa502;

/* Lux - Luminosa */
--accent-primary: #ffd700;
--accent-secondary: #ffb142;

/* Miss Fortune - Pirata */
--accent-primary: #3742fa;
--accent-secondary: #2f3542;

/* Vi - Piltover */
--accent-primary: #ffa502;
--accent-secondary: #ff6348;

/* Katarina - Sinistra */
--accent-primary: #ff3838;
--accent-secondary: #ff6b6b;
```

## 🚀 Deploy e Publicação

### GitHub Pages
1. Atualize os links no HTML
2. Commit e push para `main`
3. Ative GitHub Pages no repositório
4. URL: `https://SEU_USERNAME.github.io/bodescorp_stream/`

### Outros Hosts
- **Netlify**: Arraste a pasta `src/landing/`
- **Vercel**: Conecte o repositório Git
- **Firebase**: Use `firebase deploy`

## 📊 Analytics e Monitoramento

### Google Analytics
Adicione ao `<head>` do HTML:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitoramento de Performance
- Use Lighthouse no Chrome DevTools
- Monitore Core Web Vitals
- Teste em diferentes dispositivos

## 🐛 Troubleshooting

### Problemas Comuns:

1. **Imagens não carregam:**
   - Verifique conexão com Data Dragon API
   - Use HTTPS em produção

2. **Modal não funciona:**
   - Verifique se IDs coincidem no HTML/JS
   - Console do navegador para erros

3. **CSS não aplica:**
   - Verifique ordem de carregamento
   - Use `!important` se necessário

4. **Mobile quebrado:**
   - Teste media queries
   - Use Chrome DevTools device mode

## 📞 Suporte

- **Documentação Técnica**: [development-guide.md](development-guide.md)
- **Issues**: [GitHub Issues](https://github.com/Alttabcorp/bodescorp_stream/issues)
- **Discord**: Comunidade League of Legends

---

**💡 Dica**: Sempre teste as mudanças em diferentes navegadores e dispositivos antes de publicar!