import React from 'react';
import { useSelector } from 'react-redux';

function TotalSpendings() {
  const transactions = useSelector(state => state.transactions.transactions);
  const total = transactions.reduce((total, t) => {
    return total + t.amount;
  }, 0);

  return (
    <div>
      <h3>Total Spendings: </h3>
      <span className="transaction-total">
        ${total.toFixed(2)}
      </span>
    </div>
  );
}

export default TotalSpendings;