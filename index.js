const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.static(__dirname + '/frontend/dist'));
app.get('*', (_, res) => { res.sendFile(__dirname + '/frontend/dist/index.html'); });

const transactionsRouter = require('./routers/transactions.router');

app.use('/api/transactions', transactionsRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});