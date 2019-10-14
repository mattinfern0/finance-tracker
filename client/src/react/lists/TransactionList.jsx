import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';
import { TotalSpendings } from '../misc';
import { NewTransactionForm } from '../forms';
import TransactionElement from './TransactionElement';

class ConnectedTransactionList extends React.Component {
  componentDidMount() {
    console.log('Mounted');
    this.props.getTransactions();
  }

  render(){
    const transactions = this.props.transactions.map((t, index) => {
      return (
        <li
          className="element-transaction"
          key={t.id}
        >
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