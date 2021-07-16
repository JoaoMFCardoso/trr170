import React, {Component} from 'react';
import {connect} from "react-redux";

import {retrieveTopics} from "../../actions/topics";
import {retrieveDatasets} from "../../actions/datasets";
import TotalBarChart from "../charts/TotalBarChart";
import DoughnutChart from "../charts/DoughnutChart";

import '../../styles/contents.css';
import '../../styles/general.css';

class DatasetContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);

        this.state = {
            active: "topic",
            labels: [],
            dataverses : [{1: []}, {2: []},{3: []},{4: []}],
            datasets : [{1: []}, {2: []},{3: []},{4: []}],
            files : [{1: []}, {2: []},{3: []},{4: []}],
            users : [{1: []}, {2: []},{3: []},{4: []}],
        };
    }

    componentDidMount() {
        this.props.retrieveTopics();
        this.props.retrieveDatasets();
    }

    refreshData() {
        const data = this.getData(this.props.totals);
    }

    getData(totals) {
        const labels = [];

        totals.map(total => {
            const date = new Date(total.createdAt);
            const year = date.getFullYear();

            /* Add year to labels */
            if(!(labels.includes(year))){
                labels.push(year);
            }

            /* Get Quarter */
            const quarter = this.getQuarter(date);

            /* Fill Data */
            this.state.dataverses[quarter-1][quarter].push(total.n_dataverses);
            this.state.datasets[quarter-1][quarter].push(total.n_datasets);
            this.state.files[quarter-1][quarter].push(total.n_files);
            this.state.users[quarter-1][quarter].push(total.n_users);

        })

        /* Sort labels */
        this.state.labels = labels;

    }

    getQuarter(d) {
        d = d || new Date(); // If no date supplied, use today
        var q = [4,1,2,3];
        return q[Math.floor(d.getMonth() / 3)];
    }

    render() {
        const totals = this.props.totals;

        this.getData(totals);

        const topics = ["Astronomy", "Planetary materials", "Titan", "Planetary surface data", "Late heavy bombardment"];
        const dataset_ids = ["doi:10.35003/SMHEIM", "doi:10.35003/IDUP4R", "doi:10.35003/UFXL7B", "doi:10.35003/WPRF5U", "doi:10.35003/MR6ZDS"];
        const datasets_per_topic = [{1: [2,4,7,2,5]}, {2: [6,7,7,10,5]},{3: [8,4,5,10,5]},{4: [11,5,6,4,5]}];
        const dataset_size = [{1: [1027085,603391,53293,41722,102535]}, {2: [1027095,670391,583293,42722,1002535]},{3: [1023095,740391,60293,41722,1002535]},{4: [1023095,803391,63293,43722,1005535]}];
        const file_count = [{1: [18,1,1,1,1]}, {2: [17,1,2,1,3]},{3: [20,1,2,2,4]},{4: [23,1,3,2,6]}];

        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In here we showcase Dataset specific metrics.</p>
                </div>
                <div className="metrics">
                    <div id="categories">
                        <button className="chart-button" onClick={() => this.setState({ active: "topic"})}>Total Datasets per Topic</button>
                        <button className="chart-button" onClick={() => this.setState({ active: "dataset_size"})}>Dataset size in Bytes</button>
                        <button className="chart-button" onClick={() => this.setState({ active: "file_count"})}>Number of Files per Dataset</button>
                        <button className="chart-button" onClick={() => this.setState({ active: "dataset_views"})}>Number of Views per Dataset</button>
                    </div>
                    <div id="charts">
                        {this.state.active === "topic" &&  <DoughnutChart chart_data={datasets_per_topic} chart_labels={topics}/>}
                        {this.state.active === "dataset_size" && <TotalBarChart chart_data={dataset_size} chart_labels={dataset_ids}/>}
                        {this.state.active === "file_count" && <TotalBarChart chart_data={file_count} chart_labels={dataset_ids}/>}
                        {this.state.active === "dataset_views" && <DoughnutChart chart_data={datasets_per_topic} chart_labels={dataset_ids}/>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        totals: state.totals,
    };
};

export default connect(mapStateToProps, { retrieveTopics , retrieveDatasets})(DatasetContents);