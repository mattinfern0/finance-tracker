import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 

class LinkInfo {
  constructor(link, displayName) {
    this.link = link;
    this.displayName = displayName;
  }
}

export default function Sidebar(){

  const linkInfo = [
    new LinkInfo('/tracker', 'Tracker'),
    new LinkInfo('/planner', 'Planner'),
    new LinkInfo('/tags', 'Your Tags'),
  ];

  const navList = linkInfo.map((info) => {
    return (
    <li><NavLink to={info.link}>{info.displayName}</NavLink></li>
    )})

  return (
    <aside className="sidebar">
      <ul>
        {navList}
      </ul>
    </aside>
  )
}