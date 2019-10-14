import React from 'react';
import { TransactionsView, Sidebar } from '../layouts';

function Main(){
  return (
    <div className="main-wrapper">
      <Sidebar />
      <TransactionsView />
    </div>
  )
}

export default Main;