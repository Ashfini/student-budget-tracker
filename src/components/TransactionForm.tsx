import { useState } from "react";
import type { Category } from "../types";

interface TransactionFormProps {
  onAddTransaction: (
    description: string,
    amount: number,
    category: Category,
    type: "income" | "expense"
  ) => void;
}

const expenseCategories: Category[] = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  
const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState<Category>("Food");
const [type, setType] = useState<"income" | "expense">("expense");
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const parsedAmount = parseFloat(amount);

  // Validate inputs
  if (!description.trim()) return;
  if (isNaN(parsedAmount) || parsedAmount <= 0) return;

  onAddTransaction(description.trim(), parsedAmount, category, type);

  //Reset form
  setDescription("");
  setAmount("");
  setCategory("Food");
};

  return (
    <div className="form-card">
      <h2>➕ Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        {/* Income / Expense Toggle */}
            <button
              type="button"
              className={`type-btn ${type === "expense" ? "active-expense" : ""}`}
              onClick={() => {
                setType("expense");
                setCategory("Food");
              }}
            >
  Expense
</button>
<button type="button" className={`type-btn ${type === "income" ? "active-income" : ""}`}
  onClick={() => {
    setType("income");
    setCategory("Income");
  }}
>
  Income
</button>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="e.g., Grocery shopping"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"

            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Category Dropdown (only shown for expenses) */}
        {type === "expense" && (
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">
          Add {type === "income" ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;