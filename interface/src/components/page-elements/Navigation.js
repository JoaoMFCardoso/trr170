import React from 'react';
import {Link} from "react-router-dom";

import '../../styles/navigation.css';
import '../../styles/general.css';

import logo from "../../images/logo.png";

const Navigation = () => {
    return (
        <nav className="navbar">
            <div id="navbar-contents" className="container">
                <Link to="/">
                    <img src={logo} alt="TRR 170-DB homepage"/>
                </Link>
                <ul id="navbar-menu">
                    <li className="active"><Link to="/">Overview</Link></li>
                    <li><Link to="/dataverses">Dataverses</Link></li>
                    <li><Link to="/datasets">Datasets</Link></li>
                    <li><Link to="/files">Files</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation