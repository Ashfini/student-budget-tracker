import { useState } from "react";
import type { Transaction, Category } from "../types";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction:(id:number) => void;
}
const categoryFilters: ("All" | Category)[] = [
  "All",
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Income",
  "Other",
];

function TransactionList({transactions, onDeleteTransaction}: TransactionListProps) {

const [activeFilter, setActiveFilter] =useState<"All" | Category>("All");

const filteredTransactions = activeFilter === "All" ? transactions : transactions.filter((t) => t.category === activeFilter);

  return (
    <div className="transactions-card">
      <div className="transactions-header">
        <h2>📋 Transactions</h2>
        {
            <span className="transaction-count">
              {filteredTransactions.length}{" "}
              {filteredTransactions.length === 1 ? "item" : "items"}
            </span>
        }
      </div>

      {/* Filter Buttons */}
      <div className="filter-bar">
            {categoryFilters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
      </div>

      {/* Transaction Items */}
      <div className="transaction-list">
        
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💰</div>
            <p>No transactions yet</p>
            <p className="hint">Add your first transaction to get started</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDeleteTransaction}
              />
          ))
        )}


      </div>
    </div>
  );
}

export default TransactionList;