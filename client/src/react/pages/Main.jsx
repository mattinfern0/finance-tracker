import React from 'react';
import { Link } from 'react-router-dom';
import { TransactionList } from '../lists';


function Main(){
  return (
    <div className="main-wrapper">
      <aside className="sidebar">
        <p>Test</p>
        <Link to="/logout">Log Out</Link>
      </aside>
      <section>
        <p>The app page</p>
        <TransactionList />
      </section>
      
      
    </div>
  )
}

export default Main;