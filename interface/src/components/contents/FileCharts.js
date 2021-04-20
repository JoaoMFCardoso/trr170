import React, {useState} from 'react';

import '../../styles/contents.css';
import "../../styles/chart.css";

import DoughnutChart from "../charts/DoughnutChart";
import TotalBarChart from "../charts/TotalBarChart";

/* Dummy Data */
const topics = ["Astronomy", "Planetary materials", "Titan", "Planetary surface data", "Late heavy bombardment"];
const dataset_ids = ["doi:10.35003/SMHEIM", "doi:10.35003/IDUP4R", "doi:10.35003/UFXL7B", "doi:10.35003/WPRF5U", "doi:10.35003/MR6ZDS"];

const datasets_per_topic = [{q1: [2,4,7,2,5]}, {q2: [6,7,7,10,5]},{q3: [8,4,5,10,5]},{q4: [11,5,6,4,5]}];
const dataset_size = [{q1: [1027085,603391,53293,41722,102535]}, {q2: [1027095,670391,583293,42722,1002535]},{q3: [1023095,740391,60293,41722,1002535]},{q4: [1023095,803391,63293,43722,1005535]}];
const file_count = [{q1: [18,1,1,1,1]}, {q2: [17,1,2,1,3]},{q3: [20,1,2,2,4]},{q4: [23,1,3,2,6]}];



export default function FileCharts() {
    const [active, setActive] = useState("content_type");

    return(
        <div className="metrics">
            <div id="categories">
                <button className="chart-button" onClick={() => setActive("content_type")}>Total Files per Content Type</button>

            </div>
            <div id="charts">
                {active === "content_type" &&  <DoughnutChart chart_data={datasets_per_topic} chart_labels={topics}/>}
            </div>
        </div>
    )
};