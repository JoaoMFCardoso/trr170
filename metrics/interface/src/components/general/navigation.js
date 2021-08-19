import React from 'react';
import {Link} from "react-router-dom";

import '../../styles/navigation.css';
import '../../styles/general.css';

import logo from "../../images/logo.png";

const Navigation = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="TRR 170-DB homepage"/>
            </Link>
            <ul id="navbar-menu">
                <li className="active" key="overview"><Link to="/">Overview</Link></li>
                <li key="dataverses"><Link to="/dataverses">Dataverses</Link></li>
                <li key="datasets"><Link to="/datasets">Datasets</Link></li>
                <li key="files"><Link to="/files">Files</Link></li>
                <li key="users"><Link to="/users">Users</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation