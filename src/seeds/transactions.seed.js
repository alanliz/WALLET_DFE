const { createTransaction } = require('../db/dbRepository');
const transactions = require('../mocks/transactions.mock.json')

function runSeed(){
    for (const transaction of transactions){
        if (transaction.type == 'income')
            transaction.label = null
        
        createTransaction(transaction)
    }
}

runSeed();
