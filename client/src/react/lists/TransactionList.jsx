import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';

function TransactionElement(props) {
  const transaction = props.transaction;
  return (
    <div>
      <span>
        ${transaction.amount}
      </span>
      <span>
        {transaction.title}
      </span>
      <span>
        {transaction.date}
      </span>
    </div>
  )
}

class ConnectedTransactionList extends React.Component {
  componentDidMount() {
    console.log('Mounted');
    this.props.getTransactions();
  }

  render(){
    const transactions = this.props.transactions.map((t, index) => {
      return (
        <li key={index}>
          <TransactionElement transaction={t}/>
        </li>
      )
    });
    return (
      <ul>
        {transactions}
      </ul>
    );
  }
}
function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
  }
}

const mapToDispatch = {
  getTransactions: transactionActions.getTransactions
}

const TransactionList = connect(mapStateToProps, mapToDispatch)(ConnectedTransactionList);

export default TransactionList;