CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  amount NUMERIC(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  expense_date DATE NOT NULL,
  payment_method VARCHAR(30) NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);