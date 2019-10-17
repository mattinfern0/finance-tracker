import React from 'react';
import { connect } from 'react-redux';
import { transactionActions, transViewActions } from '../../redux/actions';
import { EditTransaction } from '../forms'

class ConnectedTransactionElement extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showButtons: false,
      showEditForm: false,
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editRevertFunc = this.editRevertFunc.bind(this);
  }

  handleEdit(){
    this.setState({showEditForm: true});
    this.props.editingOn();
  }

  handleDelete(){
    console.log('Deleting transaction');
    this.props.deleteTransaction(this.props.transaction.id);
  }

  editRevertFunc(){
    this.setState({showEditForm: false});
    this.props.editingOff();
  }

  render() {
    const transaction = this.props.transaction;
    const showButtons = this.state.showButtons && !this.props.isEditing;

    if (this.state.showEditForm) {
      return (
        <div>
          <EditTransaction 
            initialTransInfo={transaction}
            revertFunc={this.editRevertFunc}
          />
        </div>
      )
    }
    

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
        <span className="transaction-date">
          {transaction.date.format('M/D/YYYY')}
        </span>
        {showButtons && (
          <span>
            <button 
              type="button"
              className="button-edit"
              onClick={this.handleEdit}
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

function mapState(state) {
  return {
    isEditing: state.transView.editing,
  }
}

const mapToDispatch = {
  deleteTransaction: transactionActions.deleteTransaction,
  editingOn: transViewActions.editingOn,
  editingOff: transViewActions.editingOff,
}

const TransactionElement = connect(mapState, mapToDispatch)(ConnectedTransactionElement);

export default TransactionElement;