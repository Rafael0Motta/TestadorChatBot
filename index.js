/* ESTAMOS USANDO O 619626-9545 COMO TESTER E MENSAGEIRO */

const wppconnect = require("@wppconnect-team/wppconnect");

// Números para testar
const testedNumbers = ["552140037930", "5521993470555", "5521993087477"]; /* , "551140037930" caiu */

// Números para enviar mensagens de erro em caso de falha
const errorNotificationNumbers = ["5521964190452", "5521981565855"];  

// Resposta esperada das mensagens enviadas
const expectedResponse = "Consulta bem-sucedida! 😎";

/**
 * Verifica as respostas recebidas para os números testados
 * e notifica os números de erro se a resposta esperada não for encontrada.
 *
 * @param {Object} client - O cliente WPPConnect.
 */
async function checkResponses(client) {
  try {
    // Obtém todas as mensagens não lidas
    const messages = await client.getAllUnreadMessages();

    // Verifica cada número testado
    for (const number of testedNumbers) {
      console.log(`Verificando mensagens para ${number}\n`);

      // Filtra as mensagens recebidas do número testado
      const responses = messages.filter((msg) => msg.from === `${number}@c.us`);
      const hasExpectedResponse = responses.some(
        (msg) => msg.body === expectedResponse
      );

      if (!hasExpectedResponse) {
        console.log(`${number} - OFFLINE\n`);
        await notifyOffline(client, number);
      } else {
        console.log(`${number} - ONLINE\n`);
      }
    }
  } catch (error) {
    console.error("Falha ao verificar as respostas:\n", error);
  }
}

/**
 * Envia uma mensagem para um número especificado.
 *
 * @param {Object} client - O cliente WPPConnect.
 * @param {string} number - O número de telefone para o qual enviar a mensagem.
 * @param {string} message - A mensagem a ser enviada.
 */
async function sendMessage(client, number, message) {
  try {
    await client.sendText(number, message);
    console.log(`Mensagem enviada para ${number} \n`);
  } catch (error) {
    console.error(`Falha ao enviar mensagem para ${number}:\n`, error);
  }
}

/**
 * Envia uma mensagem de erro para um número especificado.
 *
 * @param {Object} client - O cliente WPPConnect.
 * @param {string} number - O número de telefone para o qual enviar a mensagem de erro.
 * @param {string} failedNumber - O número de telefone que falhou na verificação.
 */
async function sendErrorMessage(client, number, failedNumber) {
  const message = `${failedNumber} caiu.`;
  try {
    await client.sendText(number, message);
    console.log(`Mensagem de erro enviada para ${number} \n`);
  } catch (error) {
    console.error(`Falha ao enviar mensagem de erro para ${number}:\n`, error);
  }
}

/**
 * Notifica todos os números de erro que um número específico está offline.
 *
 * @param {Object} client - O cliente WPPConnect.
 * @param {string} offlineNumber - O número de telefone que está offline.
 */
async function notifyOffline(client, offlineNumber) {
  for (const errorNumber of errorNotificationNumbers) {
    await sendErrorMessage(client, errorNumber, offlineNumber);
  }
}

/**
 * Inicia o processo de envio de mensagens e verificação de respostas.
 */
async function start() {
  try {
    // Cria o cliente WPPConnect
    const client = await wppconnect.create({
      session: "BOTS-DE-ENVIO",
      deviceName: "BOTS-DE-ENVIO",
      autoClose: false,
      headless: true,
    });

    console.log("Cliente criado com sucesso\n");

    // Define um intervalo para enviar mensagens e verificar respostas
    setInterval(async () => {
      for (const number of testedNumbers) {
        await sendMessage(client, number, "/dev");
      }

      // Espera 30 segundos antes de verificar as respostas
      setTimeout(async () => {
        await checkResponses(client);
      }, 20000); // Tempo de espera de 30 segundos
    }, 300000); // Intervalo de 5 minutos (300.000 milissegundos)
  } catch (error) {
    console.error("Falha ao criar cliente:\n", error);
  }
}

// Inicia o script
start();
