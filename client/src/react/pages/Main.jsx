import React from 'react';
import { TransactionsView, Sidebar } from '../layouts';

import { connect } from 'react-redux';
import { transactionActions } from '../../redux/actions';


class Main extends React.Component {
  componentDidMount() {
    console.log("Main component mounted")

    const today = new Date();
    const newFilter = {
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };

    this.props.getTransactions(newFilter);

  }

  render() {
    return (
      <div className="main-wrapper">
        <Sidebar />
        <TransactionsView />
      </div>
    );
  }
}

const mapDispatch = {
  getTransactions: transactionActions.getTransactions,
}



export default connect(null, mapDispatch)(Main);