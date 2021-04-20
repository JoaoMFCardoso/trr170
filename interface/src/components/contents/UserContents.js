import React from 'react';

import '../../styles/contents.css';
import '../../styles/general.css';
import UserCharts from "./UserCharts";

const UserContents = () => {
    return (
        <div id="content" className="container">
            <div id="introduction">
                <p>The TRR 170 Dataverse Metrics</p>
                <p>In here we showcase User specific metrics.</p>
            </div>
            <UserCharts />
        </div>
    )
};

export default UserContents;