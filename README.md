# FinTrack - Sistema de Gestão Financeira

Um sistema Full-Stack para gerenciamento de finanças pessoais, desenvolvido com foco em boas práticas de engenharia de software, arquitetura moderna e experiência do usuário. 

![home-page](./public/assets/Home%20Page.png)
![details-page](./public/assets/Details%20Page.png)
![form-page](./public/assets/Form%20Page.png)

## Tecnologias Utilizadas

**Front-end:**
* **Angular** (Versões recentes com *Standalone Components*)
* **Angular Signals** (`signal`, `computed`, `toSignal`) para gerenciamento de estado reativo e alta performance.
* **RxJS** (Observables para comunicação HTTP assíncrona).
* **Angular Material** (UI Components, Stepper, Icons).

---

## Funcionalidades e Decisões Arquiteturais

Este projeto foi construído não apenas para funcionar, mas para ser escalável e manutenível. Abaixo destaco algumas das principais implementações:

* **Dashboard e Filtros Reativos:** Utilização de `computed` signals no Angular para derivar listas de Receitas e Despesas a partir de uma única fonte de verdade, evitando a mutação de arrays e garantindo atualizações instantâneas na tela sem novas requisições HTTP.
* **Experiência de Cadastro (Wizard):** Implementação do formulário de inserção utilizando o `MatStepper` com **Reactive Forms**. Isso garante que regras de negócio (como impedir valores nulos ou negativos) sejam validadas em cada etapa no client-side antes de alcançar a API.
* **Inline Editing (Edição Direta):** A tela de detalhes da transação utiliza um padrão de "Modo Leitura / Modo Edição". A camada de apresentação (com o `CurrencyPipe` e internacionalização pt-BR) é separada da camada de persistência, evitando erros de conversão de dados (`NaN`) ao enviar o payload para o Java.

---

## Como executar o projeto localmente

1. Certifique-se de ter o Node.js e o Angular CLI instalados.
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
ng serve
```
4. Acesse http://localhost:4200 no seu navegador.

## Autor
Feito com dedicação por Arthur Sena.