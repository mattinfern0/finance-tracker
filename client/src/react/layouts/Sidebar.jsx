import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <p>The Sidebar</p>
      <Link to="/logout">Log Out</Link>
    </aside>
  )
}