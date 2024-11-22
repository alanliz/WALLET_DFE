const express = require('express');
const cors = require('cors')

require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json())
app.use(express.static(__dirname + '/frontend/dist'));

const transactionsRouter = require('./src/routers/transactions.router.js');

app.use('/api/transactions', transactionsRouter);


app.get('*', (_, res) => { res.sendFile(__dirname + '/frontend/dist/index.html'); });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});