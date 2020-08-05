import React from 'react';
import { DropDownContainer } from '../components/misc';
import { Link } from 'react-router-dom';


function HeaderMenuButton(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="drop-down-button"
    >
      Menu
    </button>
  );
}

function HeaderMenuContent() {
  return (
    <ul>
      <li><Link to="/logout">Log Out</Link></li>
    </ul>
  );
}

export default function Header(){
    return (
      <header className="header-main">
        <h1 className="logo">Untitled Finance Tracker</h1>
        <DropDownContainer
          className="menu-header"
          buttonComponent={<HeaderMenuButton />}
          contentComponent={<HeaderMenuContent />}
        />
      </header>
    )
  }