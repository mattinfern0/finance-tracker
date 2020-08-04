import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <p>The Sidebar</p>
      <ul>
        <li><Link to="/logout">Log Out</Link></li>
        <li>Tracker</li>
        <li>Planner</li>
      </ul>
    </aside>
  )
}