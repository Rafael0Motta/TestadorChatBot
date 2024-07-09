# CHATBOT TESTADOR

Este projeto tem como objetivo verificar automaticamente o status de números de telefone específicos no WhatsApp utilizando a biblioteca @wppconnect-team/wppconnect. O sistema envia mensagens periódicas para números de teste e verifica se a resposta esperada foi recebida. Em caso de falha, ele notifica outros números pré-definidos sobre a queda.

## Funcionalidades

 - **Envio de Mensagens Automáticas:** Envia mensagens de teste para números específicos em intervalos regulares.

- **Verificação de Respostas:** Verifica se a resposta esperada foi recebida dos números de teste.

- **Notificação de Erros:** Notifica números específicos em caso de falha na verificação.

## Configuração / Clonagem

1. Clone o repositório:
```sh
git clone https://github.com/seu-usuario/projeto-verificacao-wpp.git
cd projeto-verificacao-wpp 
```
    
2. Instale as dependências:
```sh
npm install
```

## Execução

1. Inicie o script:

```sh
node index.js
```

## Documentação do Código

Para que funcione, altere os seguintes campos, **testedNumbers** e **errorNotificationNumbers** inserindo os números desejados.

- **Números de Teste:** Números de telefone para os quais as mensagens de teste são enviadas.

```js
const testedNumbers = ["5521999999999", "5521999999999", "5521999999999"];
```
- **Números de Notificação de Erro:** Números que serão notificados em caso de falha na verificação.

```js
const errorNotificationNumbers = ["5521999999999", "5521999999999"];
```

- **Resposta Esperada:** A resposta que o script espera receber dos números de teste.

```js
const expectedResponse = "Consulta bem-sucedida! 😎";
```
