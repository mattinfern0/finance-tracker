import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';
import TransactionElement from './TransactionElement';
import { sortFuncs } from '../../utils';

class ConnectedTransactionList extends React.Component {
  componentDidMount() {
    console.log('Mounted');
    this.props.getTransactions();
  }

  render(){
    const transactions = [...this.props.transactions];
    transactions.sort(this.props.sortFunc);
    const viewList = transactions.map((t) => {
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
        {viewList}
      </ul>    
    );
  }
}
function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions,
    sortFunc: state.transView.sortFunc,
  }
}

const mapToDispatch = {
  getTransactions: transactionActions.getTransactions
}

const TransactionList = connect(mapStateToProps, mapToDispatch)(ConnectedTransactionList);

export default TransactionList;