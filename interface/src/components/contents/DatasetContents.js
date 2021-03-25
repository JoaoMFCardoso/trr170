import React from 'react';

import '../../styles/contents.css';
import '../../styles/general.css';
import DatasetCharts from "./DatasetCharts";

const DatasetContents = () => {
    return (
        <div id="content" className="container">
            <div id="introduction">
                <p>The TRR 170 Dataverse Metrics</p>
                <p>In here we showcase Dataset specific metrics.</p>
            </div>
            <DatasetCharts/>
        </div>
    )
};

export default DatasetContents;