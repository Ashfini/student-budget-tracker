import { useState } from "react";
import type { Transaction, Category, BudgetSummary } from "./types";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  // TODO 1: Create a state variable called "transactions" to hold an array of Transaction objects.
  //         Initialize it with an empty array.
  //         Also create a state variable called "nextId" starting at 1 (for generating unique IDs).
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [nextId, setNextId] = useState(1);
  // TODO 2: Write a function called "calculateSummary" that takes the transactions array
  //         and returns a BudgetSummary object with:
  //         - totalIncome: sum of all transactions where type === "income"
  //         - totalExpenses: sum of all transactions where type === "expense"
  //         - balance: totalIncome - totalExpenses
  //         Hint: Use .filter() and .reduce()
  const calculateSummary = (txns: Transaction[]): BudgetSummary => {
  const totalIncome = txns
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = txns
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses
  };
};

  // TODO 3: Write a function called "handleAddTransaction" that:
  //         - Takes description (string), amount (number), category (Category), type ("income" | "expense")
  //         - Creates a new Transaction object with a unique id, today's date, and the given values
  //         - Adds it to the beginning of the transactions array using setTransactions
  //         - Increments nextId
  //         Hint: For today's date use: new Date().toISOString().split("T")[0]
const handleAddTransaction = (
  description: string,
  amount: number,
  category: Category,
  type: "income" | "expense"
    ) => {
      const newTransaction: Transaction = {
        id: nextId,
        description,
        amount,
        category,
        type,
        date: new Date().toISOString().split("T")[0]
      };

  setTransactions([newTransaction, ...transactions]);
  setNextId(nextId + 1);
};

  // TODO 4: Write a function called "handleDeleteTransaction" that:
  //         - Takes an id (number)
  //         - Removes the transaction with that id from the array
  //         Hint: Use .filter()
  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  // TODO 5: Call calculateSummary to get the current summary
  const summary = calculateSummary(transactions);

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          💰 Student <span>Budget Tracker</span>
        </h1>
        <p>Track your income and expenses in one place</p>
      </header>

      {/*
      TODO 6: Render the SummaryCards component and pass the summary as a prop */}
      <SummaryCards summary={summary} />
      <div className="main-content">
        {/* TODO 7: Render the TransactionForm component and pass handleAddTransaction as a prop */}
        <TransactionForm onAddTransaction={handleAddTransaction} />
        {/* TODO 8: Render the TransactionList component and pass transactions and handleDeleteTransaction as props 
        Completed from slide 31 and down in the Project Walkthrough */}
        <TransactionList
           transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          />
      </div>

      <footer className="app-footer">
        Built with React + TypeScript — IT 431 Advanced Web Development
      </footer>
    </div>
  );
}

export default App;
