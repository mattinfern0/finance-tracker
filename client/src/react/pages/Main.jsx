import React from 'react';
import { TransactionsView, Sidebar } from '../layouts';

import { connect } from 'react-redux';
import { transactionActions, transViewActions } from '../../redux/actions';


class Main extends React.Component {
  componentDidMount() {
    console.log("Main component mounted")

    const today = new Date();
    const newFilter = {
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };

    this.props.changeFilter(newFilter);

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
  changeFilter: transViewActions.changeFilter,
}



export default connect(null, mapDispatch)(Main);