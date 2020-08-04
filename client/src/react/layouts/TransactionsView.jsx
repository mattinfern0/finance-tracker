import React from 'react';
import { TotalSpendings, TransactionSortControl, TimeFilterControl } from '../misc';
import { NewTransactionForm } from '../forms';
import { TransactionList } from '../lists';

function TransactionsView(){
  return (
    <section className="container-transactions">
      <TotalSpendings />
      <div>
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