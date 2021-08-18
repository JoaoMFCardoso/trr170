import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveDataverses} from "../../actions/dataverses";
import TotalBarChart from "../charts/TotalBarChart";
import {getYears, getDataverseIds, getQuarter, getRecordsByDataverseId, buildDataTotalBarChart} from "../../utils/record.handling.methods";
import {checkQuarters, handleOnChange} from "../../utils/handlers";
import {chartPaletteGenerator} from "../../utils/palette.generator";

import '../../styles/contents.css';
import '../../styles/general.css';



class DataverseContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getYears = getYears.bind(this);
        this.getDataverseIds = getDataverseIds.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.getRecordsByDataverseId = getRecordsByDataverseId.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);
        this.chartPaletteGenerator = chartPaletteGenerator.bind(this);
        this.handleOnChange = handleOnChange.bind(this);
        this.checkQuarters = checkQuarters.bind(this);

        this.state = {
            activeCategory: "",
            activeYears : [],
            singleYearMode : false,
            activeDataverse : "",
            activeQuarters : [1,2,3,4],
            dataverseList : [],
            categoryList : [
                {
                    id : 'n_datasets',
                    value : 'Total Datasets'
                },
                {
                    id : 'n_size',
                    value : 'Dataverse Size'
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
        this.props.retrieveDataverses();
    }

    refreshData() {
        const recordsByDataverseId = this.getRecordsByDataverseId(this.props.dataverses, this.state.activeDataverse);
        const chartData = this.buildDataTotalBarChart(recordsByDataverseId, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory);
        const palette = this.chartPaletteGenerator(chartData.length);

        this.setState({
            dataverseList : this.getDataverseIds(this.props.dataverses),
            labels : this.getYears(this.props.dataverses),
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

    chartDescriptions(){
        switch (this.state.activeCategory) {
            case 'n_size':
                return "Total Dataverse size in Bytes over the selected year, and selected quarters.";
            default:
                return "Total number of Datasets per Dataverse over the selected year, and selected quarters.";
        }
    }

    render() {



        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In this page you can visualise metrics related to the Dataverses stored in the TRR-170 Planetary Data Portal.</p>
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
                        <div className='dataverses'>
                            <p>Dataverses</p>
                            {this.state.dataverseList.map(dataverseId => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={dataverseId}
                                            name={dataverseId}
                                            value={dataverseId}
                                            onChange={() => this.handleOnChangeLocal(dataverseId, 5)}
                                        />
                                        <label htmlFor={dataverseId}>{dataverseId}</label>
                                    </div>
                                );
                            })}
                        </div>
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
                        <p>{this.chartDescriptions()}</p>
                        <p><b>The active Dataverse:</b> {this.state.activeDataverse}</p>
                        <TotalBarChart data={this.state.data} labels={this.state.activeYears} backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataverses: state.dataverses,
    };
};

export default connect(mapStateToProps, { retrieveDataverses})(DataverseContents);

