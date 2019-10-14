import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';
import { TotalSpendings } from '../misc';
import { NewTransactionForm } from '../forms';

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
        {transaction.date.format('M/D/YYYY')}
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
      <div>
        <TotalSpendings />
        <NewTransactionForm />
        <ul>
        {transactions}
        </ul>
      </div>
      
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