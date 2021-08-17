import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveDatasets} from "../../actions/datasets";
import {retrieveTopics} from "../../actions/topics";
import TotalBarChart from "../charts/TotalBarChart";
import DoughnutChart from "../charts/DoughnutChart";
import {getDatasetIds, getTopics, getYears, getQuarter, getRecordsByTopic, getRecordsByDatasetId, buildDataTotalBarChart, buildDataDoughnutChart} from "../../utils/record.handling.methods";
import {chartPaletteGenerator} from "../../utils/palette.generator";

import '../../styles/contents.css';
import '../../styles/general.css';


class DatasetContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getTopics = getTopics.bind(this);
        this.getDatasetIds = getDatasetIds.bind(this);
        this.getYears = getYears.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.getRecordsByTopic = getRecordsByTopic.bind(this);
        this.getRecordsByDatasetId = getRecordsByDatasetId.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);
        this.buildDataDoughnutChart = buildDataDoughnutChart.bind(this);
        this.chartPaletteGenerator = chartPaletteGenerator.bind(this);

        this.state = {
            activeCategory : "",
            activeTopic : "",
            activeDataset : "",
            activeYears : [],
            singleYearMode : false,
            activeQuarters : [1,2,3,4],
            topicList : [],
            datasetList : [],
            categories : [
                {
                    id : 'n_datasets',
                    value : 'Datasets per Topic'
                },
                {
                    id : 'n_size',
                    value : 'Dataset Size'
                },
                {
                    id : 'n_filecount',
                    value : 'Files per Dataset'
                },
                {
                    id : 'n_views',
                    value : 'Views per Dataset'
                }
            ],
            labels: [new Date().getFullYear()],
            quarters: [1,2,3,4],
            data : [],
            backgroundColor : [],
            borderColor : [],
        };
    }

    componentDidMount() {
        this.props.retrieveDatasets();
        this.props.retrieveTopics();
    }

    refreshData() {
        let chartData = null;
        let yearData = null;
        let records = null;

        switch (this.state.activeCategory){
            case 'n_datasets':
                yearData = this.getYears(this.props.topics);

                /* Type of chart selection */
                if(this.state.activeTopic === 'allTopics'){ /* Doughnut Chart just showcasing one year */
                    chartData = this.buildDataDoughnutChart(this.props.topics, this.state.activeYears, this.state.topicList, 'topic', this.state.activeCategory);
                }else{ /* Total Bar Chart showcasing all active years */
                    records = this.getRecordsByTopic(this.props.topics, this.state.activeTopic);
                    chartData = this.buildDataTotalBarChart(records, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory);
                }

                break;
            case 'n_views':
                yearData = this.getYears(this.props.datasets);

                /* Type of chart selection */
                if(this.state.activeDataset === 'allDatasets'){ /* Doughnut Chart just showcasing one year */
                    chartData = this.buildDataDoughnutChart(this.props.datasets, this.state.activeYears, this.state.datasetList, 'dataset_id', this.state.activeCategory);
                }else{ /* Total Bar Chart showcasing all active years */
                    records = this.getRecordsByDatasetId(this.props.datasets, this.state.activeDataset);
                    chartData = this.buildDataTotalBarChart(records, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory);
                }

                break;
            default:
                yearData = this.getYears(this.props.datasets);
                records = this.getRecordsByDatasetId(this.props.datasets, this.state.activeDataset);
                chartData = this.buildDataTotalBarChart(records, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory);
                break;
        }

        const palette = this.chartPaletteGenerator(chartData.length);

        this.setState({
            topicList : this.getTopics(this.props.topics),
            datasetList : this.getDatasetIds(this.props.datasets),
            labels : yearData,
            data : chartData,
            backgroundColor : palette.backgroundColor,
            borderColor : palette.borderColor,
        });

        this.checkQuarters();
    }

    handleOnChange(id, type){

        /* Differentiate based on type
        * 0 - category
        * 1 - topic
        * 2 - datasets
        * */
        switch (type) {
            case 1: /* topic */
                /* Add to active Topic and uncheck all others */
                this.state.activeTopic = id;
                if(id === 'allTopics'){
                    this.state.singleYearMode = true;
                }else{
                    this.state.singleYearMode = false;
                }
                break;
            case 2: /* datasets */
                /* Add to active Topic and uncheck all others */
                this.state.activeDataset = id;
                if(id === 'allDatasets'){
                    this.state.singleYearMode = true;
                }else{
                    this.state.singleYearMode = false;
                }
                break;
            default: /* category */
                /* Change active category and uncheck all others */
                this.state.activeCategory = id;
                break;
        }
        this.uncheck(id, type);
        this.refreshData();
    }

    handleOnChangeYear(year){
        if(this.state.singleYearMode){
            /* The single year mode behaviour
        * When certain categories and topics or datasets are selected only the selected year should be added to the active years.
        * The remainder should be removed. */

            // Uncheck all other years in the active years
            this.uncheck(year, 3);

            // Add to active years
            this.state.activeYears = [year];

        }else{
            /* The standard behaviour
        * Adding or removing years to the active years state according to selection */

            if(document.getElementById(year).checked){

                /* Add to active years */
                this.state.activeYears.push(year);

            } else{
                /* Remove from active years */
                const index = this.state.activeYears.indexOf(year);
                if (index > -1) {
                    this.state.activeYears.splice(index, 1);
                }
            }
        }

        this.refreshData();
    }

    handleOnChangeQuarter(quarter){

        if(document.getElementById(quarter).checked){

            /* Add to active quarters */
            this.state.activeQuarters.push(quarter);
            this.state.activeQuarters.sort();

        } else{
            /* Remove from active quarters */
            const index = this.state.activeQuarters.indexOf(quarter);
            if (index > -1) {
                this.state.activeQuarters.splice(index, 1);
            }
        }

        this.refreshData();
    }

    uncheck(activeId, type) {
        /* Differentiate based on type
        * 0 - category
        * 1 - topic
        * 2 - datasets
        * 3 - years
        * */
        switch (type){
            case 1: // topic
                /* Uncheck the allTopics if checked */
                if(activeId !== 'allTopics'){
                    document.getElementById('allTopics').checked = false;
                }

                /* Uncheck all other topics if checked */
                this.state.topicList.map(id => {
                    if(activeId !== id) {
                        document.getElementById(id).checked = false;
                    }
                })
                break;
            case 2: //dataset
                /* Uncheck the allDatasets if checked */
                if(activeId !== 'allDatasets' && this.state.activeCategory === 'n_views'){
                    document.getElementById('allDatasets').checked = false;
                }

                /* Uncheck all other topics if checked */
                this.state.datasetList.map( id => {
                    if(activeId !== id) {
                        document.getElementById(id).checked = false;
                    }
                })
                break;
            case 3: // years
                this.state.activeYears.map(id => {
                    if(activeId !== id && document.getElementById(id) !== null ) {
                        document.getElementById(id).checked = false;
                    }
                })
                break;
            default: // category
                this.state.categories.map(({id}) => {
                    if(activeId !== id) {
                        document.getElementById(id).checked = false;
                    }
                })
                break;
        }
    }

    checkQuarters() {
        for (let quarter = 1; quarter <= this.state.activeQuarters.length; quarter++){
            if(!this.state.activeQuarters.includes(quarter)){
                document.getElementById(quarter.toString()).checked = false;
            }else{
                document.getElementById(quarter.toString()).checked = true;
            }
        }
    }

    getChartMessage(){
        let message = "";
        switch(this.state.activeCategory){
            case "n_size":
                message = "Total Size in Bytes of a Dataset over the selected year, and selected quarters.";
                break;
            case "n_filecount":
                message = "Total number of Files of a Dataset over the selected year, and selected quarters.";
                break;
            case "n_views":
                message = "Total number of Views of a Dataset over the selected year, and selected quarters.";
                break;
            default:
                message = "Total number of Datasets per Topic over the selected year, and selected quarters.";
                break;
        }

        return message;
    }

    getChart() {
        switch(this.state.activeCategory){
            case "n_datasets":
                if(this.state.activeTopic === 'allTopics'){
                    return <DoughnutChart data={this.state.data} labels={this.state.topicList} backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>;
                }else{
                    return <TotalBarChart data={this.state.data} labels={this.state.activeYears}  backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>;
                }
            case "n_views":
                if(this.state.activeDataset === 'allDatasets'){
                    return <DoughnutChart data={this.state.data} labels={this.state.datasetList} backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>;
                }else{
                    return <TotalBarChart data={this.state.data} labels={this.state.activeYears}  backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>;
                }
            default:
                return <TotalBarChart data={this.state.data} labels={this.state.activeYears}  backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>;
        }
    }

    render() {

        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In this page you can visualise metrics related to the Datasets stored in the TRR-170 Planetary Data Portal.</p>
                </div>
                <div className="metrics">
                    <div className="sidebar">
                        <div className='categories'>
                            <p>Categories</p>
                            {this.state.categories.map(({ id, value }) => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={id}
                                            name={id}
                                            value={value}
                                            onChange={() => this.handleOnChange(id, 0)}
                                        />
                                        <label htmlFor={id}>{value}</label>
                                    </div>
                                );
                            })}
                        </div>
                        {this.state.activeCategory === 'n_datasets' &&
                            <div className='topics'>
                            <p>Topics</p>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    id='allTopics'
                                    name='allTopics'
                                    value='All'
                                    onChange={() => this.handleOnChange('allTopics', 1)}
                                />
                                <label htmlFor='allTopics'>All</label>
                            </div>
                            {this.state.topicList.map(topic => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={topic}
                                            name={topic}
                                            value={topic}
                                            onChange={() => this.handleOnChange(topic, 1)}
                                        />
                                        <label htmlFor={topic}>{topic}</label>
                                    </div>
                                );
                            })}
                        </div>}
                        {this.state.activeCategory !== 'n_datasets' && this.state.activeCategory !== '' &&
                        <div className='datasets'>
                            <p>Datasets</p>
                            {this.state.activeCategory === 'n_views' &&
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        id='allDatasets'
                                        name='allDatasets'
                                        value='All'
                                        onChange={() => this.handleOnChange('allDatasets', 2)}
                                    />
                                    <label htmlFor='allDatasets'>All</label>
                                </div>
                                }
                            {this.state.datasetList.map(datasetId => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={datasetId}
                                            name={datasetId}
                                            value={datasetId}
                                            onChange={() => this.handleOnChange(datasetId, 2)}
                                        />
                                        <label htmlFor={datasetId}>{datasetId}</label>
                                    </div>
                                );
                            })}
                        </div>}
                        <div className='years'>
                            <p>Years</p>
                            {this.state.labels.map(year => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={year}
                                            name={year}
                                            value={year}
                                            onChange={() => this.handleOnChangeYear(year)}
                                        />
                                        <label htmlFor={year}>{year}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='quarters'>
                            <p>Quarters</p>
                            {this.state.quarters.map(quarter => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={quarter}
                                            name={quarter}
                                            value={'Q' + quarter}
                                            onChange={() => this.handleOnChangeQuarter(quarter)}
                                        />
                                        <label htmlFor={quarter}>{'Q' + quarter}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div id="charts">
                        <p>{this.getChartMessage()}</p>
                        {this.getChart()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        datasets: state.datasets,
        topics: state.topics,
    };
};

export default connect(mapStateToProps, { retrieveDatasets, retrieveTopics})(DatasetContents);

