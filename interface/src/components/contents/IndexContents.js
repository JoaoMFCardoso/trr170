import React from 'react';

import '../../styles/contents.css';
import '../../styles/general.css';

import OverviewCharts from "./OverviewCharts";

const IndexContents = () => {
    return (
        <div id="content" className="container">
            <div id="introduction">
                <p>The TRR 170 Dataverse Metrics</p>
                <p>In this page you can visualise the total numbers of Dataverses, Datasets, Files and Users in the TRR 170 Dataverse Repository.</p>
            </div>
            <OverviewCharts/>
        </div>
    )
};

export default IndexContents;