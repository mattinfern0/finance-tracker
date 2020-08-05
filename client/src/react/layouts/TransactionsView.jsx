import React from 'react';
import { TotalSpendings, TransactionSortControl, TimeFilterControl } from '../components/misc';
import { NewTransactionForm } from '../components/forms';
import { TransactionList } from '../components/lists';
import './TransactionsView.css';

function TransactionsView(){
  return (
    <section className="container-transactions">
      <TotalSpendings />
      <div className="container-view-control">
        <span>From: </span>
        <TimeFilterControl />
        <TransactionSortControl />
      </div>
      <div>
        <NewTransactionForm />
      </div>
      <TransactionList />
    </section>
  )
}

export default TransactionsView;