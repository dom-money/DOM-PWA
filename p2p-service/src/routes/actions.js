const express = require("express");
const actionsRouter = express.Router();
const {
  updateOrderStatus,
  getProviderTelegramIdByOrderId,
  updateOrderRelayTransaction
} = require("../database");
const { sendOrderToProviders, sendConfirmedOrderToProvider } = require("../bot");
const { getSafeSingletonDeployment } = require("@safe-global/safe-deployments");
const { ethers } = require("ethers");

actionsRouter.post("/", async (req, res) => {
  const actionType = req.body?.type;
  const order = req.order;

  // Validate the action type
  if (
    actionType !== "user_payment_confirm" &&
    actionType !== "user_price_confirm"
  ) {
    return res.status(400).json({
      message:
        'Invalid action type. Only "user_price_confirm" and "user_payment_confirm" types are possible.',
    });
  }

  // "user_price_confirm" action
  if (actionType === "user_price_confirm") {
    await sendOrderToProviders(order);

    await updateOrderStatus(order.id, "price_confirmed");
    return res.status(201).end();
  }

  // "user_payment_confirm" action
  // Validate the relay transaction
  const transaction = req.body?.relay_transaction;
  if (
    !transaction ||
    !transaction.target ||
    !transaction.encodedTransaction ||
    !transaction.chainId
  ) {
    return res
      .status(400)
      .json({ message: "Invalid or incomplete relay transaction" });
  }

  const safeSingleton = getSafeSingletonDeployment();
  const abi = safeSingleton.abi;
  const contractInterface = new ethers.Interface(abi);
  //const decodedArgs = contractInterface.parseTransaction(transaction.encodedTransaction);

  await updateOrderRelayTransaction(order.id, JSON.stringify(transaction));

  await updateOrderStatus(order.id, "user_completed");

  // Verifying the validity of order price
  // Save dispatched action to DB
  // Send to relay and verify
  // Update order status in DB
  const providerTelegramId = await getProviderTelegramIdByOrderId(order.id);
  await sendConfirmedOrderToProvider(order, providerTelegramId);

  await updateOrderStatus(order.id, "sent_to_provider");

  res.status(201).end();
});

actionsRouter.get("/", (req, res) => {
  const order = req.order;
  res.json({ actions: [] });
});

actionsRouter.get("/:actionId", (req, res) => {
  const order = req.order;

  res.status(404).json({ message: "Action not found" });
});

module.exports = actionsRouter;
