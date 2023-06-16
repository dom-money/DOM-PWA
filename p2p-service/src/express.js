const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ordersRouter = require('./routes/orders');
const jwtVerifyMiddleware = require('./middlewares/jwtVerifyMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors({ exposedHeaders: ['Authorization'] }));
app.use(bodyParser.json());

app.use('/orders', jwtVerifyMiddleware, ordersRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
