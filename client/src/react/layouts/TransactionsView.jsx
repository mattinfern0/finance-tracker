import React from 'react';
import { TotalSpendings, TransactionSortControl } from '../misc';
import { NewTransactionForm } from '../forms';
import { TransactionList } from '../lists';

function TransactionsView(){
  return (
    <section className="container-transactions">
      <TotalSpendings />
      <span>
        <NewTransactionForm />
        <TransactionSortControl />
      </span>
      <TransactionList />
    </section>
  )
}

export default TransactionsView;