import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveContentTypes} from "../../actions/contentTypes";
import TotalBarChart from "../charts/TotalBarChart";
import {getYears, getContentTypes, getQuarter, getRecordsByContentType, buildDataTotalBarChart} from "../../utils/record.handling.methods";
import {chartPaletteGenerator} from "../../utils/palette.generator";
import {checkQuarters, handleOnChange} from "../../utils/handlers";

import '../../styles/contents.css';
import '../../styles/general.css';



class FileContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getYears = getYears.bind(this);
        this.getContentTypes = getContentTypes.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.getRecordsByContentType = getRecordsByContentType.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);
        this.chartPaletteGenerator = chartPaletteGenerator.bind(this);
        this.handleOnChange = handleOnChange.bind(this);
        this.checkQuarters = checkQuarters.bind(this);

        this.state = {
            activeCategory: "",
            activeYears : [],
            singleYearMode : false,
            activeContentType : "",
            activeQuarters : [1,2,3,4],
            contentTypeList : [],
            categoryList : [
                {
                    id : 'n_files',
                    value : 'Total Files'
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
        this.props.retrieveContentTypes();
    }

    refreshData() {
        const recordsByContentType = this.getRecordsByContentType(this.props.contentTypes, this.state.activeContentType);
        const chartData = this.buildDataTotalBarChart(recordsByContentType, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory);
        const palette = this.chartPaletteGenerator(chartData.length);

        this.setState({
            contentTypeList : this.getContentTypes(this.props.contentTypes),
            labels : this.getYears(this.props.contentTypes),
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
            case 'other':
                return "Some other message";
            default:
                return "Total number of Files per Content Type over the selected year, and selected quarters.";
        }
    }

    render() {
        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In this page you can visualise metrics related to the Files stored in the TRR-170 Planetary Data Portal.</p>
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
                        <div className='contentTypes'>
                            <p>Content Types</p>
                            {this.state.contentTypeList.map(contentType => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={contentType}
                                            name={contentType}
                                            value={contentType}
                                            onChange={() => this.handleOnChangeLocal(contentType, 6)}
                                        />
                                        <label htmlFor={contentType}>{contentType}</label>
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
                        <p><b>The active Content Type:</b> {this.state.activeContentType}</p>
                        <TotalBarChart data={this.state.data} labels={this.state.activeYears} backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contentTypes: state.contentTypes,
    };
};

export default connect(mapStateToProps, { retrieveContentTypes})(FileContents);

