import React from 'react';
import { connect } from 'react-redux';

function ConnectedTotalSpendings(props) {
  const total = props.transactions.reduce((total, t) => {
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

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
  }
}

const TotalSpendings = connect(mapStateToProps)(ConnectedTotalSpendings);
export default TotalSpendings;