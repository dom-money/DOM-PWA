const express = require("express");
const axios = require("axios");
const ordersRouter = express.Router();
const actionsRouter = require("./actions");
const { ethers } = require("ethers");
const { parse } = require("pixcode");
const {
  getOrdersByUserAddress,
  getOrderById,
  createOrder,
  updateOrderPrice,
} = require("../database");

ordersRouter.post("/", async (req, res) => {
  const qrData = req.body?.qr_data;

  if (!qrData) return res.status(400).json({ message: "qr_data is required" });

  const userPublicKey = req.user.wallets[0].public_key;

  const publicKeyWithPrefix = "0x" + userPublicKey;
  const userAddress = ethers.computeAddress(publicKeyWithPrefix);

  const parsedQrData = parse(qrData);
  const pixAddress = parsedQrData.merchantAccountInformation.value;
  const amount = parsedQrData.transactionAmount.value;

  // Getting order amount in usdt
  const response = await axios.get("https://api.huobi.pro/market/trade", {
    params: { symbol: "usdtbrl" },
    // headers: { 'Access-Key': process.env.HUOBI_API_KEY }
  });
  const rate = response.data.tick.data[0].price;

  // Calculate the amount in USDT
  const usdtAmount = amount / rate;

  const priceValidUntil = new Date(Date.now() + 15000).toISOString();

  const orderFromDB = await createOrder(
    userAddress,
    pixAddress,
    amount,
    usdtAmount,
    priceValidUntil,
    qrData
  );

  res.status(201).json({ order: orderFromDB });
});

ordersRouter.get("/", async (req, res) => {
  const userPublicKey = req.user.wallets[0].public_key;

  const publicKeyWithPrefix = "0x" + userPublicKey;
  const userAddress = ethers.computeAddress(publicKeyWithPrefix);
  const orders = await getOrdersByUserAddress(userAddress);

  if (!orders) {
    return res.json({ orders: [] });
  }

  res.json({ orders });
});

ordersRouter.get("/:orderId", async (req, res) => {
  const userPublicKey = req.user.wallets[0].public_key;
  const publicKeyWithPrefix = "0x" + userPublicKey;
  const userAddress = ethers.computeAddress(publicKeyWithPrefix);

  const orderId = parseInt(req.params.orderId, 10);
  if (isNaN(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  let order = await getOrderById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order?.user_address !== userAddress) {
    return res.status(403).json({ message: "You cannot access this order" });
  }

  // If the price is not valid, fetching a new price
  if (new Date(order.price_valid_until) < new Date()) {
    const response = await axios.get("https://api.huobi.pro/market/trade", {
      params: { symbol: "usdtbrl" },
      // headers: { 'Access-Key': process.env.HUOBI_API_KEY }
    });
    const rate = response.data.tick.data[0].price;

    // Calculate the amount in USDT
    const usdtAmount = order.amount / rate;
    const priceValidUntil = new Date(Date.now() + 15000).toISOString();

    // Update order with new price and validity
    order = await updateOrderPrice(orderId, usdtAmount, priceValidUntil);
  }

  res.json({ order });
});

ordersRouter.use(
  "/:orderId/actions",
  async (req, res, next) => {
    const userPublicKey = req.user.wallets[0].public_key;
    const publicKeyWithPrefix = "0x" + userPublicKey;
    const userAddress = ethers.computeAddress(publicKeyWithPrefix);

    const orderId = parseInt(req.params.orderId, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order?.user_address !== userAddress) {
      return res.status(403).json({ message: "You cannot access this order" });
    }

    req.order = order;
    next();
  },
  actionsRouter
);

module.exports = ordersRouter;
