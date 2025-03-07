# Sistema de Gestão de Planos de Telefonia

Este projeto é um sistema **Front-End** em Angular para gerenciar planos de telefonia e seus clientes, incluindo um **Dashboard** com gráficos e indicadores, funcionalidades de **CRUD** (Create, Read, Update, Delete) e uma interface de **arrastar e soltar (Drag and Drop)** para associar ou desassociar planos aos clientes.

---

## Índice

- [Recursos Principais](#recursos-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Capturas de Tela](#capturas-de-tela)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Contato](#contato)

---

## Recursos Principais

1. **Dashboard Interativo**  
   - Gráfico de Pizza exibindo a proporção de clientes por plano.  
   - Gráfico de Barras exibindo dados de clientes ou estatísticas mensais.  
   - Indicadores numéricos (cards) para:  
     - Total de Clientes  
     - Total de Planos  
     - Média de Planos por Cliente  

2. **Gerenciamento de Planos**  
   - Tabela listando os planos (nome, preço, franquia de dados e minutos).  
   - Função para adicionar, editar e excluir planos (CRUD).  

3. **Gerenciamento de Clientes**  
   - Tabela com dados dos clientes (nome, CPF, telefone, e-mail).  
   - Função para adicionar, editar e excluir clientes (CRUD).  

4. **Associação de Clientes a Planos (Drag and Drop)**  
   - Lista global de planos disponíveis.  
   - Cartões de cada cliente exibindo os planos associados.  
   - Arrastar um plano para o card do cliente para associá-lo.  
   - Desassociar um plano arrastando-o para uma área de "trash" ou para a lista global.  
   - Persistência dos dados no `db.json` via **JSON Server**.

---

## Tecnologias Utilizadas

- **Angular 19** (utilizando componentes standalone)  
- **TypeScript**  
- **Angular Material**  
- **Bootstrap**  
- **Chart.js** via **ng2-charts**  
- **JSON Server** (para simular o backend)  
- **RxJS**  
- **Angular CDK Drag & Drop**

---

## Capturas de Tela

Abaixo, algumas imagens do sistema em funcionamento:

1. **Dashboard**  
![image](https://github.com/user-attachments/assets/2cd629ba-25b1-46b7-a2df-3dc1f40fcaee)

2. **Gerenciamento de Planos**  
![image](https://github.com/user-attachments/assets/c3bdacd3-3164-4464-ad1f-5ee765a1780b)

3. **Gerenciamento de Clientes**  
![image](https://github.com/user-attachments/assets/3da9bcf4-cd06-41b8-a1cc-c427c8cec9be)

4. **Associação de Clientes a Planos**  
![image](https://github.com/user-attachments/assets/3263a1ef-7080-4b4a-91d8-db89cd3d2440)

---

## Configuração do Ambiente

1. **Node.js**  
   - Certifique-se de ter o Node.js (versão 18 ou superior) instalado.

2. **Angular CLI**  
   - Instale globalmente (opcional, mas recomendado):  
     ```bash
     npm install -g @angular/cli
     ```

3. **Instalar Dependências**  
   - Na raiz do projeto, execute:  
     ```bash
     npm install
     ```

4. **Instalar JSON Server**  
   - Se ainda não tiver o JSON Server instalado globalmente, execute:  
     ```bash
     npm install -g json-server
     ```

---

## Executando o Projeto

1. **Inicie o JSON Server**  
   - Na raiz do projeto (onde está o `db.json`), rode:  
     ```bash
     json-server --watch db.json --port 3000
     ```
   - Isso disponibiliza as seguintes rotas:
     - `http://localhost:3000/clients`
     - `http://localhost:3000/plans`
     - `http://localhost:3000/clientPlans`

2. **Inicie a Aplicação Angular**  
   - Em outro terminal, dentro da pasta do projeto, execute:  
     ```bash
     ng serve
     ```
   - Acesse a aplicação em:  
     ```
     http://localhost:4200
     ```

---

## Funcionalidades

1. **Dashboard**  
   - Exibe o total de clientes, total de planos e a média de planos por cliente.
   - Gráficos (pizza e barras) para análise dos dados.

2. **Gerenciamento de Planos**  
   - Criação, edição e exclusão de planos.
   - Visualização dos planos em uma tabela com detalhes como nome, preço, franquia de dados e minutos.

3. **Gerenciamento de Clientes**  
   - Criação, edição e exclusão de clientes.
   - Visualização dos clientes em uma tabela com informações como nome, CPF, telefone e e-mail.

4. **Associação de Clientes a Planos (Drag and Drop)**  
   - Lista global de planos disponíveis.
   - Cada cliente possui um card que exibe os planos associados.
   - Arrastar um plano para o card do cliente para associá-lo.
   - Desassociar um plano arrastando-o para a área "trash" ou para a lista global.
   - Atualização dos dados no `db.json` via JSON Server.

---

## Contato

Em caso de dúvidas, sugestões ou problemas:

- **Email:** luluiz21@hotmail.com  
- **LinkedIn:** https://www.linkedin.com/in/luiz-frederico/
- **GitHub:** https://github.com/luluiz21
