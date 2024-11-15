const express = require('express');
const { body, param, validationResult } = require('express-validator');
const transactionsRepo = require('../db/transactionsRepository');

const router = express.Router();


function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}


router.get('/', async (req, res) => {
  try {
    const transactions = await transactionsRepo.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});


router.get(
  '/:id',
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const transaction = await transactionsRepo.getTransactionById(id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch transaction' });
    }
  }
);


router.post(
  '/',
  body('concept').isString().isLength({ max: 64 }).withMessage('Concept must be a string with a maximum length of 64 characters'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('type').isIn(['income', 'expense']).withMessage("Type must be 'income' or 'expense'"),
  body('label').isIn(['food_n_drinks', 'shopping', 'transportation', 'life_n_entertainment', 'financial_expenses']).withMessage('Invalid label'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { concept, amount, type, label } = req.body;
      const newTransaction = await transactionsRepo.createTransaction({ concept, amount, type, label });
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  }
);


router.put(
  '/:id',
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  body('concept').optional().isString().isLength({ max: 64 }).withMessage('Concept must be a string with a maximum length of 64 characters'),
  body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('type').optional().isIn(['income', 'expense']).withMessage("Type must be 'income' or 'expense'"),
  body('label').optional().isIn(['food_n_drinks', 'shopping', 'transportation', 'life_n_entertainment', 'financial_expenses']).withMessage('Invalid label'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const updates = req.body;

      const updated = await transactionsRepo.updateTransactionById(id, updates);
      if (!updated) {
        return res.status(404).json({ error: 'Transaction not found or no changes made' });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  }
);


router.delete(
  '/:id',
  param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await transactionsRepo.deleteTransactionById(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  }
);

module.exports = router;
