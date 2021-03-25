import React from 'react';

import '../../styles/contents.css';
import '../../styles/general.css';
import DataverseCharts from "./DataverseCharts";

const DataverseContents = () => {
    return (
        <div id="content" className="container">
            <div id="introduction">
                <p>The TRR 170 Dataverse Metrics</p>
                <p>In here we showcase Dataverse specific metrics.</p>
            </div>
            <DataverseCharts />
        </div>
    )
};

export default DataverseContents;