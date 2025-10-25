# QA Junior Playwright Frontend

Um guia simples e direto para você rodar e entender este projeto de testes E2E com Playwright.

## O que é este projeto?
Este repositório contém uma suíte de testes end-to-end (E2E) usando Playwright para validar o fluxo de uma aplicação de exemplo (Sauce Demo). Os testes cobrem login, manipulação de produtos no carrinho e checkout.

## Pré-requisitos
- Node.js (recomendado 18+)
- npm (vem junto com o Node.js)

## Instalação
Dentro da pasta do projeto, rode:

```
npm install
```

## Como executar os testes
- Rodar todos os testes (em modo headless):
```
npx playwright test
```

- Rodar com o navegador visível (headed):
```
npx playwright test --headed
```

- Rodar um teste específico (ex.: login):
```
npx playwright test tests/e2e/login.spec.js
```

- Filtrar por nome do teste:
```
npx playwright test -g "Login"
```

## Relatório de testes
Após a execução, é gerado um relatório HTML:
- Abrir automaticamente:
```
npx playwright show-report
```
- Ou abrir manualmente o arquivo:
```
playwright-report/index.html
```

## Principais funcionalidades cobertas
- Login
  - Abrir a página inicial de login
  - Login com sucesso
  - Login com falha (mensagem de erro)
- Produtos
  - Adicionar produtos ao carrinho
  - Remover produtos do carrinho
  - Conferir a quantidade de itens no carrinho
- Checkout
  - Ir para o carrinho
  - Preencher formulário de checkout
  - Finalizar compra e validar confirmação

## Page Objects (principais métodos)
- LoginPage (tests/pages/LoginPage.js)
  - `visit()`: abre a página inicial e valida o formulário de login
  - `submitLoginForm(usuario, senha)`: preenche os campos e envia
  - `expectLoginError()`: verifica que a mensagem de erro aparece

- ProductPage (tests/pages/ProductPage.js)
  - `verifyProductPage()`: garante que você está na página de produtos
  - `addProductsToCart(lista)`: adiciona um ou vários itens ao carrinho
  - `getCartCount()`: retorna o número de itens no carrinho
  - `expectCartCount(n)`: valida a quantidade de itens
  - `removeProductsFromCart(lista)`: remove itens do carrinho

- ProductCheckoutPage (tests/pages/ProductCheckoutPage.js)
  - `goToCart()`: acessa o carrinho
  - `fillCheckoutForm(nome, sobrenome, cep)`: preenche dados do checkout
  - `finishCheckout()`: finaliza o pedido e valida a confirmação

## Estrutura do projeto
- `tests/e2e/`: arquivos de teste (login, produtos, checkout)
- `tests/pages/`: Page Objects usados pelos testes
- `playwright.config.js`: configurações dos testes
  - `testDir: './tests'`
  - `baseURL: 'https://www.saucedemo.com/'`
  - `reporter: 'html'`
  - Projeto padrão: `chromium` (Chrome desktop), `headless: true`
  - `trace: 'on-first-retry'`

## Dicas rápidas
- Quer mudar a URL alvo? Edite `baseURL` em `playwright.config.js`.
- Quer ver o navegador enquanto executa? Use `--headed`.
- Quer testar outro navegador? Habilite os projetos `firefox` ou `webkit` no `playwright.config.js`.

Qualquer dúvida, sugestão ou melhoria é bem-vinda. Bons testes!