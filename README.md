# Encomendas API Frontend

Este é um frontend simples para consumir a `encomendas_api` e a `distancia_api`. Ele permite cadastrar encomendas, consultar detalhes de encomendas, e calcular a distância entre dois endereços.

## Requisitos

- Um servidor backend rodando a `encomendas_api` na porta `5000`.
- Um servidor backend rodando a `distancia_api` na porta `5001`.

## Estrutura do Projeto

- `index.html`: Arquivo principal HTML contendo a estrutura da página.
- `style.css`: Arquivo opcional para estilos customizados.
- `script.js`: Arquivo JavaScript contendo a lógica para consumir as APIs.
- `README.md`: Documentação do projeto.

## Como Usar

1. Clone o repositório.
2. Certifique-se de que as APIs `encomendas_api` e `distancia_api` estão rodando nas portas corretas.
3. Abra o `index.html` no seu navegador.

## Funcionalidades

### Cadastrar Encomenda

- Preencha o formulário com o código de rastreamento, descrição, endereço de origem, e endereço de destino.
- Clique em "Cadastrar" para enviar a encomenda.

### Consultar Encomenda

- Insira o ID da encomenda no formulário de consulta.
- Clique em "Consultar" para buscar os detalhes da encomenda.

### Calcular Distância

- Preencha os endereços de origem e destino no formulário de distância.
- Clique em "Calcular" para obter a distância entre os endereços.

## Tecnologias Usadas

- HTML
- CSS
- JavaScript
- jQuery
- Bootstrap 4.5

## Contato

Para mais informações, entre em contato com [seu_email@dominio.com].
