import React from 'react';
import { TotalSpendings, TransactionSortControl, TimeFilterControl } from '../components/misc';
import { NewTransactionForm } from '../components/forms';
import { TransactionList } from '../components/lists';

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