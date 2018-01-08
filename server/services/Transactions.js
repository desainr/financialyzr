const Connection = require('../db/DbConnection');

const dbConnector = new Connection();

const RETRIEVE_TRANSACTIONS_BY_USER = 'SELECT * FROM transactions WHERE userId = ?';

class TransactionService {

    /**
      * Gets the transactions by user 
      * @param {int} userId 
      */
    static async getTransactionByUser(userId) {
        const transactions = await dbConnector.query(RETRIEVE_TRANSACTIONS_BY_USER, [userId]);
        return transactions;
    }
}

module.exports = TransactionService;