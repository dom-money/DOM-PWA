// src/bot.js
const {Telegraf} = require('telegraf');
const { Markup } = require('telegraf');
const {QrCodePix} = require('qrcode-pix');
const {
  saveOrder,
  getOrderById,
  updateOrder,
  saveProvider,
  getProviders,
  updateProvider,
  getProvider,
} = require('./database');

const axios = require('axios');

const { sendCreateOrderNotification } = require('./helpers');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
  const providerId = ctx.chat.id;
  const polygonAddress = await getProvider(providerId);

  if (polygonAddress) {
    ctx.reply(
      `Hi, ${ctx.from.username}! \nYour address is: ${polygonAddress}`
    );
  } else {
    await ctx.reply(
      'Welcome! To start, please provide your Polygon address.',
      Markup.keyboard([
        ["✅ Set address"] // Row1 with 2 buttons
      ])
        .oneTime()
        .resize(),
      // Markup.inlineKeyboard([
      //   Markup.button.callback('Input your Polygon address', 'input_polygon_address'),
      // ])
    );
  }
});

bot.hears('✅ Set address', (ctx) => {
  ctx.reply('Please input your Polygon address:');
  bot.on('text', async (ctx) => {
    const polygonAddress = ctx.message.text;
    const providerId = ctx.chat.id;
    await saveProvider(providerId, polygonAddress);
    ctx.reply(`Polygon address saved: ${polygonAddress}`);
  });
} )
// bot.action('input_polygon_address', (ctx) => {
//   ctx.reply('Please input your Polygon address:');
//   bot.on('text', async (ctx) => {
//     const polygonAddress = ctx.message.text;
//     const providerId = ctx.chat.id;
//     await saveProvider(providerId, polygonAddress);
//     ctx.reply(`Polygon address saved: ${polygonAddress}`);
//   });
// });

bot.action(/accept_order:(\d+)/, async (ctx) => {
    const orderId = Number(ctx.match[1]);
    const order = await getOrderById(orderId);

    console.log('order_id: ', orderId);
    if (!order.provider_id) {
      await updateProvider(ctx.chat.id, orderId);
      await updateOrder(orderId, ctx.chat.id, "fileLink", "accepted_by_provider");

      const qrCodePix = QrCodePix({
        version: '01',
        key: order.pix_address, //or any PIX key
        name: 'Fulano de Tal',
        city: 'SAO PAULO',
        transactionId: 'YOUR_TRANSACTION_ID', //max 25 characters
        message: 'Pay me :)',
        cep: '99999999',
        value: order.amount,
    });

    console.log(qrCodePix);
      const qrCodeImage = await qrCodePix.base64();
      ctx.replyWithPhoto({ source: Buffer.from(qrCodeImage.split(',')[1], 'base64') });
      ctx.reply(
        'Order accepted. Please pay the transaction and upload the receipt.',
        Markup.inlineKeyboard([
          Markup.button.callback('Transaction paid, upload receipt photo', `upload_receipt:${orderId}`),
        ])
      );
    } else {
      ctx.reply('Sorry, this order has already been accepted by another provider.');
    }
  });
  
  bot.action(/upload_receipt:(\d+)/, async (ctx) => {
    const orderId = Number(ctx.match[1]);
    const order = await getOrderById(orderId);
  
    if (order.provider_id === ctx.chat.id) {
      ctx.reply('Please upload the receipt photo.');
      bot.on('photo', async (ctx) => {
        const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        const fileLink = await ctx.telegram.getFileLink(fileId);
        const polygonAddress = await getProvider(order.provider_id);
        // mock data
    
        const response = {
          data: {
            success: true,
            polygonAddress: polygonAddress,
            usdtBalance: order.usdt_amount
          }
        }
  
        if (response.data.success) {
          ctx.reply(`Success! Your Polygon address: ${response.data.polygonAddress}, USDt balance: ${response.data.usdtBalance}`);
          await updateOrder(orderId, null, fileLink.href, "paid");
          await updateProvider(order.provider_id, null);
        } else {
          ctx.reply('An error occurred while processing your payment. Please contact support.');
        }
      });
    } else {
      ctx.reply("This order doesn't belong to you.");
    }
  });
  

bot.launch();

async function sendOrderToProviders(orderData) {
  const providers = await getProviders();
  for (const provider of providers) {
    await bot.telegram.sendMessage(
      provider.telegram_id,
      `New order: ${orderData.amount} BRL to ${orderData.pix_address}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Accept order', `accept_order:${provider.id}`),
      ])
    );
  }
}

module.exports = {
  sendOrderToProviders,
};
