require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Create an expense
app.post("/expenses", async (req, res) => {
    try {
      const { amount, category, expense_date, payment_method, note } = req.body;
  
      if (!amount || !category || !expense_date || !payment_method) {
        return res.status(400).json({
          error: "amount, category, expense_date, and payment_method are required",
        });
      }
  
      const result = await pool.query(
        `INSERT INTO expenses (amount, category, expense_date, payment_method, note)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *;`,
        [amount, category, expense_date, payment_method, note || null]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // List expenses (optionally filter by month: ?month=YYYY-MM)
  app.get("/expenses", async (req, res) => {
    try {
      const { month } = req.query;
  
      let query = "SELECT * FROM expenses ORDER BY expense_date DESC, id DESC;";
      let params = [];
  
      if (month) {
        // month format: YYYY-MM
        query = `
          SELECT * FROM expenses
          WHERE to_char(expense_date, 'YYYY-MM') = $1
          ORDER BY expense_date DESC, id DESC;
        `;
        params = [month];
      }
  
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

app.get("/", (req, res) => {
  res.send("SpendWise API is running ✅");
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
