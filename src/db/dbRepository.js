const pool = require('./dbConfig');

/**
 * @typedef {Object} Transaction
 * @property {number} id - The unique identifier of the transaction.
 * @property {string} concept - The concept or description of the transaction.
 * @property {number} amount - The amount of money for the transaction.
 * @property {'income'|'expense'} type - The type of the transaction.
 * @property {'food_n_drinks'|'shopping'|'transportation'|'life_n_entertainment'|'financial_expenses'} label - The category label of the transaction.
 */
/**
 * Gets all transactions from the database.
 * @returns {Promise<Transaction[]>} A promise that resolves to an array of transactions.
 */
async function getAllTransactions() {
    const [rows] = await pool.query('SELECT * FROM transactions');
    return rows;
  }
  
  /**
   * Gets a single transaction by ID.
   * @param {number} id - The ID of the transaction.
   * @returns {Promise<Transaction|null>} A promise that resolves to the transaction or null if not found.
   */
  async function getTransactionById(id) {
    const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [id]);
    return rows[0] || null;
  }
  
  /**
   * Inserts a new transaction into the database.
   * @param {Omit<Transaction, 'id'>} transaction - The transaction data, excluding the ID.
   * @returns {Promise<Transaction>} A promise that resolves to the inserted transaction with the generated ID.
   */
  async function createTransaction({ concept, amount, type, label }) {
    const [result] = await pool.query(
      'INSERT INTO transactions (concept, amount, type, label) VALUES (?, ?, ?, ?)',
      [concept, amount, type, label]
    );
    return { id: result.insertId, concept, amount, type, label };
  }
  
  /**
   * Updates an existing transaction by ID.
   * @param {number} id - The ID of the transaction to update.
   * @param {Partial<Omit<Transaction, 'id'>>} updates - The fields to update.
   * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
   */
  async function updateTransactionById(id, updates) {
    const fields = Object.keys(updates).map((field) => `${field} = ?`).join(', ');
    const values = [...Object.values(updates), id];
  
    const [result] = await pool.query(
      `UPDATE transactions SET ${fields} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }
  
  /**
   * Deletes a transaction by ID.
   * @param {number} id - The ID of the transaction to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful, false otherwise.
   */
  async function deleteTransactionById(id) {
    const [result] = await pool.query('DELETE FROM transactions WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
  
  module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransactionById,
    deleteTransactionById
  };