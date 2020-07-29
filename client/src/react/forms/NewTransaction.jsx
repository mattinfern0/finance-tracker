import React from 'react';
import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';
import moment from 'moment';

class ConnectedNewTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      amount: '',
      date: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let rawDate = this.state.date;
    if (!rawDate) {
      rawDate = moment().format();
    }
    const newTransaction = {
      title: this.state.title,
      amount: parseFloat(parseFloat(this.state.amount).toFixed(2)),
      date: moment(rawDate).format('YYYY-MM-DD'),
    }
    if (newTransaction.title.length !== 0 
      && newTransaction.amount.length !== 0 
      && newTransaction.date.length !== 0
    ) {
      console.log(newTransaction);
      this.props.createTransaction(newTransaction);
      this.resetForm();
    }
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
          value="Add Transaction"
        />

      </form>
    );
  }
}

const mapDispatch = {
  createTransaction: transactionActions.createTransaction,
}

const NewTransactionForm = connect(null, mapDispatch)(ConnectedNewTransactionForm);

export default NewTransactionForm;