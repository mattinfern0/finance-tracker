import React from 'react';
import { connect } from 'react-redux';

function ConnectedTotalSpendings(props) {
  const total = props.transactions.reduce((total, t) => {
    return total + t.amount;
  }, 0);

  return (
    <h3>Total Spendings: ${total.toFixed(2)}</h3>
  );
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
  }
}

const TotalSpendings = connect(mapStateToProps)(ConnectedTotalSpendings);
export default TotalSpendings;