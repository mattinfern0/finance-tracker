import React from 'react';
import { Link } from 'react-router-dom';


function Main(){
  return (
    <div>
      <p>The app page</p>
      <Link to="/logout">Log Out</Link>
    </div>
    
  )
}

export default Main;