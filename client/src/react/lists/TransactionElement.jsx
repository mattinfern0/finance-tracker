import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';

class ConnectedTransactionElement extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showButtons: false,
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(){
    console.log('Deleting transaction');
    this.props.deleteTransaction(this.props.transaction.id);
  }

  render() {
    const transaction = this.props.transaction;
    const showButtons = this.state.showButtons;
    return (
      <div
        onMouseEnter={() => this.setState({showButtons: true})}
        onMouseLeave={() => this.setState({showButtons: false})}
      >
        <span className="transaction-amount">
          ${transaction.amount.toFixed(2)}
        </span>
        <span className="transaction-title">
          {transaction.title}
        </span>
        <span className="transaction-date align-right">
          {transaction.date.format('M/D/YYYY')}
        </span>
        {showButtons && (
          <span>
            <button 
              type="button"
              className="button-edit"
            >
              Edit
            </button>
            <button 
              type="button"
              className="button-delete"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </span>
        )}
      </div>
    )
  }
}

const mapToDispatch = {
  deleteTransaction: transactionActions.deleteTransaction,
}

const TransactionElement = connect(null, mapToDispatch)(ConnectedTransactionElement);

export default TransactionElement;