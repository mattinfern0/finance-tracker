import React from 'react';
import { TotalSpendings } from '../misc';
import { NewTransactionForm } from '../forms';
import { TransactionList } from '../lists';

function TransactionsView(){
  return (
    <section className="container-transactions">
      <TotalSpendings />
      <NewTransactionForm />
      <TransactionList />
    </section>
  )
}

export default TransactionsView;