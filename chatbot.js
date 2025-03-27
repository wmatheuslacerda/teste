// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + '\n\n\Sou o assistente virtual do Reclame Aqui Nova Fátima.\n\n\Como posso ajudá-lo hoje?\n\n\ Por favor, digite uma das opções abaixo:\n\n1 - Tenho uma Reclamação.\n2 - Tenho uma Sugestão\n3 - Outras perguntas'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000); //Delay de 5 segundos
    
        
    }

    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Digite sua reclamação*.\n\- Coloque seu nome completo\n\- Seu documento\n\- Seu endereço\n\n\Nos envie fotos e vídeos para que possamos enviar aos responáveis e quem realmente pode resolver seu problema.');

 

        await delay(5000); //delay de 5 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Como funciona?*\n\n\É muito simples.\n\n1º Passo\nApós sua reclamação registrada aguarde que um de nossos administradores irá entrar em contato com você.\n\n2º Passo\nUm de nossos adms irá explicar como você deve formalizar sua reclamação nos canais oficiais da prefeitua.\n\n\*Agradecemos por confiar em nosso trabalho que é totalmente voluntário, mas em prol de uma cidade cada vez melhor*');

            // Aguarda a resposta do usuário antes de continuar
    const resposta = await new Promise((resolve) => {
        const mensagemHandler = (mensagem) => {
            if (mensagem.from === msg.from) { 
                client.removeListener('message', mensagemHandler); // Remove o listener após resposta
                resolve(mensagem.body); // Retorna a resposta
            }
        };
        client.on('message', mensagemHandler); // Adiciona listener para esperar a resposta
    });
    console.log("Usuário enviou:", resposta);


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela mensagem!\n\Já Já vamos lhe responder.');


    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Digite sua sugestão*.\n\Coloque seu nome completo, seu documento e sua sugestão.');

            // Aguarda a resposta do usuário antes de continuar
            const resposta = await new Promise((resolve) => {
                const mensagemHandler = (mensagem) => {
                    if (mensagem.from === msg.from) { 
                        client.removeListener('message', mensagemHandler); // Remove o listener após resposta
                        resolve(mensagem.body); // Retorna a resposta
                    }
                };
                client.on('message', mensagemHandler); // Adiciona listener para esperar a resposta
            });
            console.log("Usuário enviou:", resposta);

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Agradecemos sua sugestão*.\n\Iremos analisar e assim que aprovado por um de nossos Adms iremos encaminhar para o setor pertinente.');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Pois não, qual sua dúvida?');
        
            // Aguarda a resposta do usuário antes de continuar
            const resposta = await new Promise((resolve) => {
                const mensagemHandler = (mensagem) => {
                    if (mensagem.from === msg.from) { 
                        client.removeListener('message', mensagemHandler); // Remove o listener após resposta
                        resolve(mensagem.body); // Retorna a resposta
                    }
                };
                client.on('message', mensagemHandler); // Adiciona listener para esperar a resposta
            });
            console.log("Usuário enviou:", resposta);

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Ok, recebemos sua dúvida.\n\Analisaremos e um de nossos adms irá te retornar assim que possível.');

    }









});