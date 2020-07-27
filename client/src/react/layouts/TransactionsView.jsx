import React from 'react';
import { TotalSpendings, TransactionSortControl, TimeFilterControl } from '../misc';
import { NewTransactionForm } from '../forms';
import { TransactionList } from '../lists';

function TransactionsView(){
  return (
    <section className="container-transactions">
      <TotalSpendings />
      <span>
        <NewTransactionForm />
        <TransactionSortControl />
        <TimeFilterControl />

      </span>
      <TransactionList />
    </section>
  )
}

export default TransactionsView;