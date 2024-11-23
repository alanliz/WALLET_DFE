CREATE TABLE transactions (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `concept` varchar(64) NOT NULL,
  `amount` double NOT NULL,
  `type` ENUM ('income', 'expense') NOT NULL,
  `label` ENUM ('food_n_drinks', 'shopping', 'transportation', 'life_n_entertainment', 'financial_expenses'),
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP
);