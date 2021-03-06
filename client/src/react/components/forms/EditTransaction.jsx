import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../../redux/actions';
import moment from 'moment';

class ConnectedEditTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.initialTransInfo.title,
      amount: props.initialTransInfo.amount,
      date: props.initialTransInfo.date.format('YYYY-MM-DD'),
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const editedTransaction = {
      id: this.props.initialTransInfo.id,
      title: this.state.title,
      amount: parseFloat(parseFloat(this.state.amount).toFixed(2)),
      date: moment(this.state.date).format('YYYY-MM-DD'),
    }
    if (
      editedTransaction.title !== this.props.initialTransInfo.title
      || editedTransaction.amount !== this.props.initialTransInfo.amount
      || editedTransaction.date !== this.props.initialTransInfo.date.format("YYYY-MM-DD")
    ) {
      this.props.editTransaction(editedTransaction);
    }
    this.props.revertFunc();
  }

  resetForm() {
    this.setState({
      title: '',
      amount: '',
      date: ''
    });
  }

  render() {
    return (
      <form className="form-new-transaction" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={(e) => this.setState({title: e.target.value})}
          placeholder='Description'
        />
        <input
          type="number"
          step="0.01"
          min="0"
          
          name="amount"
          value={this.state.amount}
          onChange={(e) => this.setState({amount: e.target.value})}
          placeholder='Amount'
        />
        <input
          type="date"
          name="date"
          value={this.state.date}
          onChange={(e) => this.setState({date: e.target.value})}
          placeholder='Date'
        />
        <input
          type="submit"
          value="Save"
        />
      </form>
    );
  }
}

const mapDispatch = {
  editTransaction: transactionActions.editTransaction,
}

const EditTransactionForm = connect(null, mapDispatch)(ConnectedEditTransactionForm);

export default EditTransactionForm;