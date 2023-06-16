const express = require("express");
const actionsRouter = express.Router();
const { getSafeSingletonDeployment } = require('@safe-global/safe-deployments');
const { ethers } = require("ethers");
const { GelatoRelayPack } = require('@safe-global/relay-kit');
const pollRelayTaskStatus = require('../utils/pollRelayTaskStatus');
const { updateOrderStatus } = require("../database");
const { sendOrderToProviders } = require('../bot')

actionsRouter.post("/", async (req, res) => {
  // Validate the action type
  if (req.body?.type !== "user_confirm") {
    return res.status(400).json({
      message: 'Invalid action type. Only "user_confirm" type is possible.'
    });
  }

  // Validate the relay transaction
  const transaction = req.body?.relay_transaction;
  if (
    !transaction || 
    !transaction.target ||
    !transaction.encodedTransaction ||
    !transaction.chainId
  ) {
    return res.status(400).json({ message: 'Invalid or incomplete relay transaction' });
  }
  
  const order = req.order;

  const safeSingleton = getSafeSingletonDeployment();
  const abi = safeSingleton.abi;
  const contractInterface = new ethers.Interface(abi);
  //const decodedArgs = contractInterface.parseTransaction(transaction.encodedTransaction);

  const provider = new ethers.JsonRpcProvider(process.env.RPC_TARGET);

  const relayAdapter = new GelatoRelayPack();

  const { taskId } = await relayAdapter.relayTransaction(transaction);
  console.log(taskId);

  const { transactionHash } = await pollRelayTaskStatus(taskId, relayAdapter);

  console.log(transactionHash)

  // await provider.waitForTransaction(transactionHash, 5);

  await updateOrderStatus(order.id, 'user_completed');

  // Verifying the validity of order price
  // Save dispatched action to DB
  // Send to relay and verify
  // Update order status in DB
  await sendOrderToProviders(order);

  await updateOrderStatus(order.id, 'sent_to_providers');

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
