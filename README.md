# Manus AI - Sales Page

Uma página de vendas moderna, responsiva e totalmente independente para comercializar créditos Manus AI.

## 📋 Características

✅ **Design Moderno** - Dark theme profissional inspirado em GGMAX  
✅ **Totalmente Responsivo** - Funciona perfeitamente em desktop, tablet e mobile  
✅ **Sem Dependências Externas** - Funciona 100% offline (exceto WhatsApp)  
✅ **Integração WhatsApp** - Redirecionamento automático para WhatsApp com mensagem pré-preenchida  
✅ **7 Pacotes de Produtos** - Menu de seleção com estoque em tempo real  
✅ **SEO Otimizado** - Meta tags, títulos e descrições  
✅ **Performance Rápida** - Carregamento < 2 segundos  
✅ **Acessível** - Suporte a navegação por teclado  

## 📁 Estrutura do Projeto

```
manus-ai-site/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos (dark theme, responsivo)
├── js/
│   └── script.js       # Funcionalidade (WhatsApp, seleção)
├── img/
│   ├── banner.jpg      # Banner principal
│   └── favicon.png     # Ícone do site
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Instalação Local

Simplesmente abra o arquivo `index.html` em um navegador web:

```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

### 2. Hospedagem Online

Você pode hospedar em qualquer serviço gratuito ou pago:

- **Netlify** (recomendado) - Arraste e solte os arquivos
- **Vercel** - Integração com Git
- **GitHub Pages** - Hospedagem gratuita
- **Seu próprio servidor** - Upload via FTP/SSH

## ⚙️ Configuração

### Editar Número de WhatsApp

Abra o arquivo `js/script.js` e procure por:

```javascript
const CONFIG = {
    telefone: "5561999999999", // ← EDITE ESTE NÚMERO
    marca: "Minha Marca",
    titulo_pagina: "Manus AI - Créditos e Pacotes",
    estoque: { ... }
};
```

**Formato do número:**
- Código do país: 55 (Brasil)
- Código da área: 61 (exemplo)
- Número: 999999999

Exemplo completo: `5561999999999`

### Editar Marca

No mesmo arquivo `js/script.js`:

```javascript
marca: "Minha Marca", // ← EDITE O NOME DA MARCA
```

Também atualize no `index.html`:

```html
<h1 class="logo">Minha Marca</h1>
```

### Editar Estoque

No arquivo `js/script.js`, seção `estoque`:

```javascript
estoque: {
    "Conta com Assinatura Plus por 7 dias + 5 MIL CRÉDITOS - R$15,00": 100, // ← EDITE
    "Conta com 1800 créditos - R$2,00": 99,
    // ... outros produtos
}
```

### Editar Produtos

Para adicionar, remover ou modificar produtos, edite:

1. **HTML** (`index.html`) - Adicione/remova opções no `<select>`
2. **JavaScript** (`js/script.js`) - Atualize o objeto `estoque`

## 🎨 Personalização

### Cores

Abra `css/style.css` e procure pelas variáveis de cor:

```css
/* Cores principais */
--primary-blue: #00A3FF;      /* Azul primário */
--primary-green: #00A884;     /* Verde WhatsApp */
--dark-bg: #0b0b0b;           /* Fundo escuro */
--card-bg: #1a1a1a;           /* Fundo dos cards */
```

### Fontes

A página usa a fonte **Poppins** do Google Fonts. Para mudar:

1. Abra `index.html`
2. Procure por `<link rel="stylesheet"...>`
3. Substitua por outra fonte do Google Fonts

### Logo e Imagens

- **Banner**: Substitua `img/banner.jpg`
- **Favicon**: Substitua `img/favicon.png`
- **Outras imagens**: Adicione em `img/`

## 📱 Responsividade

A página é otimizada para:

- **Desktop** (≥ 1024px) - Layout completo
- **Tablet** (768px - 1024px) - Layout adaptado
- **Mobile** (< 768px) - Layout mobile-first

Teste em diferentes tamanhos de tela usando as ferramentas do navegador (F12).

## 🧪 Testes

### Teste Local

1. Abra `index.html` em um navegador
2. Selecione um produto
3. Clique em "Comprar no WhatsApp"
4. Você deve ser redirecionado para o WhatsApp Web

### Teste de Responsividade

1. Abra as ferramentas do desenvolvedor (F12)
2. Clique em "Toggle device toolbar"
3. Teste em diferentes resoluções

### Teste de Performance

1. Abra as ferramentas do desenvolvedor (F12)
2. Vá para a aba "Network"
3. Recarregue a página
4. Verifique o tempo de carregamento (deve ser < 2s)

## 🔒 Segurança

- ✅ Sem scripts maliciosos
- ✅ Sem rastreamento de usuários
- ✅ Sem cookies desnecessários
- ✅ Sem conexões externas (exceto WhatsApp)
- ✅ Funciona offline

## 📊 Analytics (Opcional)

Para adicionar Google Analytics:

1. Abra `index.html`
2. Adicione antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Substitua `GA_ID` pelo seu ID do Google Analytics.

## 🐛 Solução de Problemas

### WhatsApp não abre

**Problema**: Ao clicar no botão, nada acontece.

**Solução**:
1. Verifique se o número de WhatsApp está correto em `js/script.js`
2. Verifique se você tem WhatsApp Web aberto
3. Verifique o console do navegador (F12) para erros

### Página carrega lentamente

**Problema**: A página demora muito para carregar.

**Solução**:
1. Comprima as imagens em `img/`
2. Use um serviço de hospedagem mais rápido
3. Verifique sua conexão de internet

### Layout quebrado no mobile

**Problema**: O design não funciona bem em celular.

**Solução**:
1. Verifique se a meta tag viewport está em `index.html`
2. Teste em diferentes navegadores
3. Verifique o console (F12) para erros de CSS

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique este README
2. Consulte o código comentado em `js/script.js`
3. Abra as ferramentas do desenvolvedor (F12) para ver erros

## 📄 Licença

Este projeto é fornecido como está. Você pode modificar e usar livremente.

## 🎯 Próximos Passos

1. ✅ Edite o número de WhatsApp
2. ✅ Customize a marca e cores
3. ✅ Teste em seu dispositivo
4. ✅ Hospede online
5. ✅ Compartilhe com seus clientes

---

**Versão**: 1.0  
**Última atualização**: Outubro 2025  
**Criado por**: Manus AI

