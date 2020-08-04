import React from 'react';
import { useSelector } from 'react-redux';
import TransactionElement from './TransactionElement';

function TransactionList() {
  let transactions = useSelector(state => state.transactions.transactions);
  const sortFunc = useSelector(state => state.transView.sortFunc);

  transactions = [...transactions];
  transactions.sort(sortFunc);
  const viewList = transactions.map((t) => {
    return (
      <li
        className="element-transaction"
        key={t.id}
      >
        <TransactionElement transaction={t}/>
      </li>
    )
  });

  return (
  <ul>
    {viewList}
  </ul>    
  );
}

export default TransactionList;