import React, {useState} from 'react';

import '../../styles/contents.css';
import "../../styles/chart.css";

import TotalBarChart from "../charts/TotalBarChart";

/* Dummy Data */
const labels = ["2020", "2021", "2022", "2023"];
const dataverses = [{q1: [5,9,8,5]}, {q2: [6,7,7,10]},{q3: [8,4,5,10]},{q4: [11,5,6,4]}];
const datasets = [{q1: [1,7,3,9]}, {q2: [5,15,8,14]},{q3: [1,2,3,4]},{q4: [4,14,7,5]}];
const files = [{q1: [2,2,4,14]}, {q2: [5,18,4,8]},{q3: [18,6,11,8]},{q4: [11,2,3,9]}];
const users = [{q1: [7,20,48,21]}, {q2: [11,6,21,5]},{q3: [8,11,3,21]},{q4: [18,12,14,19]}];

export default function OverviewCharts() {
    const [active, setActive] = useState("Dataverses");

    return(
        <div className="metrics">
            <div id="categories">
                <button className="chart-button" onClick={() => setActive("Dataverses")}>Total Dataverses</button>
                <button className="chart-button" onClick={() => setActive("Datasets")}>Total Datasets</button>
                <button className="chart-button" onClick={() => setActive("Files")}>Total Files</button>
                <button className="chart-button" onClick={() => setActive("Users")}>Total Users</button>
            </div>
            <div id="charts">
                {active === "Dataverses" && <TotalBarChart chart_data={dataverses} chart_labels={labels}/>}
                {active === "Datasets" &&  <TotalBarChart chart_data={datasets} chart_labels={labels}/>}
                {active === "Files" && <TotalBarChart chart_data={files} chart_labels={labels}/>}
                {active === "Users" && <TotalBarChart chart_data={users} chart_labels={labels}/>}
            </div>
        </div>
    )
};
