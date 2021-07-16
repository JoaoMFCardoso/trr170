import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveTotals} from "../../actions/totals";
import TotalBarChart from "../charts/TotalBarChart";

import '../../styles/contents.css';
import '../../styles/general.css';

class DataverseContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);

        this.state = {
            active: "datasets",
            labels: [],
            dataverses : [{1: []}, {2: []},{3: []},{4: []}],
            datasets : [{1: []}, {2: []},{3: []},{4: []}],
            files : [{1: []}, {2: []},{3: []},{4: []}],
            users : [{1: []}, {2: []},{3: []},{4: []}],
        };
    }

    componentDidMount() {
        this.props.retrieveTotals();
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
        const datasets = [{1: []}, {2: []},{3: []},{4: []}];
        const sizes = [{1: []}, {2: []},{3: []},{4: []}];
        const dataverses = [];

        const totals = this.props.totals;

        this.getData(totals);

        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In here we showcase Dataverse specific metrics.</p>
                </div>
                <div className="metrics">
                    <div id="categories">
                        <button className="chart-button" onClick={() => this.setState({ active: "datasets"})}>Total Datasets per Dataverse</button>
                        <button className="chart-button" onClick={() => this.setState({ active: "size"})}>Total Dataverse size in Bytes</button>
                    </div>
                    <div id="charts">
                        {this.state.active === "datasets" &&
                        <div>
                            <p>This chart displays the total number of Datasets of each of the existing Dataverses. The information is organised by quarter.</p>
                            <TotalBarChart chart_data={datasets} chart_labels={dataverses}/>
                        </div>
                        }
                        {this.state.active === "size" &&
                        <div>
                            <p>This chart displays the total size in Bytes for each of the existing Dataversses. The information is organised by quarter.</p>
                            <TotalBarChart chart_data={sizes} chart_labels={dataverses}/>
                        </div>
                        }
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

export default connect(mapStateToProps, { retrieveTotals})(DataverseContents);