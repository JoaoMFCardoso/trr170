import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveDatasets} from "../../actions/datasets";
import {retrieveTopics} from "../../actions/topics";
import TotalBarChart from "../charts/TotalBarChart";
import DoughnutChart from "../charts/DoughnutChart";
import {
    getActiveYearIndex,
    getDatasetIds,
    getTopics,
    getYears,
    getQuarter,
    getRecordsByTopic,
    getRecordsByDatasetId,
    buildDataTotalBarChart,
    buildDataDoughnutChart
} from "../../utils/record.handling.methods";
import {checkQuarters, handleOnChange} from "../../utils/handlers";
import {chartPaletteGenerator} from "../../utils/palette.generator";

import '../../styles/contents.css';
import '../../styles/general.css';


class DatasetContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getActiveYearIndex = getActiveYearIndex.bind(this);
        this.getTopics = getTopics.bind(this);
        this.getDatasetIds = getDatasetIds.bind(this);
        this.getYears = getYears.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.getRecordsByTopic = getRecordsByTopic.bind(this);
        this.getRecordsByDatasetId = getRecordsByDatasetId.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);
        this.buildDataDoughnutChart = buildDataDoughnutChart.bind(this);
        this.chartPaletteGenerator = chartPaletteGenerator.bind(this);
        this.handleOnChange = handleOnChange.bind(this);
        this.checkQuarters = checkQuarters.bind(this);

        this.state = {
            activeCategory : "",
            activeTopic : "",
            activeDataset : "",
            activeYears : [],
            singleYearMode : false,
            activeQuarters : [1,2,3,4],
            topicList : [],
            datasetList : [],
            categoryList : [
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

        this.checkQuarters(document, this.state);
    }

    handleOnChangeLocal(id, type){
        this.handleOnChange(id, type, document, this.state);

        this.refreshData();
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
                            {this.state.categoryList.map(({ id, value }) => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={id}
                                            name={id}
                                            value={value}
                                            onChange={() => this.handleOnChangeLocal(id, 0)}
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
                                    onChange={() => this.handleOnChangeLocal('allTopics', 3)}
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
                                            onChange={() => this.handleOnChangeLocal(topic, 3)}
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
                                        onChange={() => this.handleOnChangeLocal('allDatasets', 4)}
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
                                            onChange={() => this.handleOnChangeLocal(datasetId, 4)}
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
                                            onChange={() => this.handleOnChangeLocal(year, 1)}
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
                                            onChange={() => this.handleOnChangeLocal(quarter, 2)}
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

