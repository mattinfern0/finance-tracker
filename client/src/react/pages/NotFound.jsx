import React from 'react';
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="container-login">
            <h1>Wait... how did you get here?</h1>
            <Link to='/tracker'>Click Here To Go Back To Safety</Link>
        </div>
    )
}

export default NotFound;