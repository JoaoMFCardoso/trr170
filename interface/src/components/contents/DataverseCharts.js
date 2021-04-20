import React, {useState} from 'react';

import '../../styles/contents.css';
import "../../styles/chart.css";

import DoughnutChart from "../charts/DoughnutChart";
import TotalBarChart from "../charts/TotalBarChart";

/* Dummy Data */
const sizes = [{q1: [1024,2024,10004,2145]}, {q2: [1084,2604,8004,2445]},{q3: [1724,2524,9004,1245]},{q4: [2024,5024,12005,1445]}];
const datasets = [{q1: [1,4,2,4]}, {q2: [4,2,8,4]},{q3: [5,3,9,6]},{q4: [21,24,56,42]}];
const dataverses = ["global_planetary_sciences", "gleissner_philipp", "TRR_170-DB", "trr170"];

const category_data = [{q1: [2, 1, 1, 1]}];
const category_label = ["Uncategorized", "Organizations_Institutions", "Researchers", "Research_Group"];



export default function DataverseCharts() {
    const [active, setActive] = useState("datasets");

    return(
        <div className="metrics">
            <div id="categories">
                <button className="chart-button" onClick={() => setActive("datasets")}>Total Datasets per Dataverse</button>
                <button className="chart-button" onClick={() => setActive("size")}>Total Dataverse size in Bytes</button>
            </div>
            <div id="charts">
                {active === "datasets" &&
                    <div>
                        <p>This chart displays the total number of Datasets of each of the existing Dataverses. The information is organised by quarter.</p>
                        <p></p>
                        <TotalBarChart chart_data={datasets} chart_labels={dataverses}/>
                    </div>
                }
                {active === "size" &&
                <div>
                    <p>This chart displays the total size in Bytes for each of the existing Dataversses. The information is organised by quarter.</p>
                    <p></p>
                    <TotalBarChart chart_data={sizes} chart_labels={dataverses}/>
                </div>
                }
            </div>
        </div>
    )
};
