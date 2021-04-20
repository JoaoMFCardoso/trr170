import React from 'react';

import '../../styles/contents.css';
import '../../styles/general.css';
import FileCharts from "./FileCharts";

const FileContents = () => {
    return (
        <div id="content" className="container">
            <div id="introduction">
                <p>The TRR 170 Dataverse Metrics</p>
                <p>In here we showcase File specific metrics.</p>
            </div>
            <FileCharts />
        </div>
    )
};

export default FileContents;