import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <React.Fragment>
            <header>
                <nav className="navbar sticky-top navbar-dark bg-dark">
                    <div className="container-fluid">
                        <h2><span class="badge bg-secondary">Hello {props.user.firstName + " " + props.user.lastName}</span></h2>
                        <button className="btn btn-primary" onClick={props.onLogout}> logout </button>
                    </div>
                </nav>
            </header>
        </React.Fragment>
    );
}

export default Navbar;