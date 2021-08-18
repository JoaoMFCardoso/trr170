import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveTotals} from "../../actions/totals";
import TotalBarChart from "../charts/TotalBarChart";
import {getActiveYearIndex, getYears, getQuarter, buildDataTotalBarChart} from "../../utils/record.handling.methods";
import {chartPaletteGenerator} from "../../utils/palette.generator";
import {handleOnChange, checkQuarters} from "../../utils/handlers";

import '../../styles/contents.css';
import '../../styles/general.css';

class OverviewContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getActiveYearIndex = getActiveYearIndex.bind(this);
        this.getYears = getYears.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);
        this.chartPaletteGenerator = chartPaletteGenerator.bind(this);
        this.handleOnChange = handleOnChange.bind(this);
        this.checkQuarters = checkQuarters.bind(this);

        this.state = {
            activeCategory: "",
            activeYears : [],
            singleYearMode : false,
            activeQuarters : [1,2,3,4],
            categoryList : [
                {
                    id : 'n_dataverses',
                    value : 'Dataverses'
                },
                {
                    id : 'n_datasets',
                    value : 'Datasets'
                },
                {
                    id : 'n_files',
                    value : 'Files'
                },
                {
                    id : 'n_users',
                    value : 'Users'
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
        this.props.retrieveTotals();
    }

    refreshData() {
        const chartData = this.buildDataTotalBarChart(this.props.totals, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory);
        const palette = this.chartPaletteGenerator(chartData.length);

        this.setState({
            labels: this.getYears(this.props.totals),
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
            case 'n_datasets':
                return <p>Total number of Datasets over the selected year, and selected quarters.</p>;
            case 'n_files':
                return <p>Total number of Files over the selected year, and selected quarters.</p>;
            case 'n_users':
                return <p>Total number of Users over the selected year, and selected quarters.</p>;
            default:
                return <p>Total number of Dataverses over the selected year, and selected quarters.</p>;
        }
    }

    render() {
        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In this page you can visualise generic metrics related to data stored in the TRR-170 Planetary Data Portal.</p>
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
                        {this.chartDescriptions()}
                        <TotalBarChart data={this.state.data} labels={this.state.activeYears} backgroundColor={this.state.backgroundColor} borderColor={this.state.borderColor}/>
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

export default connect(mapStateToProps, { retrieveTotals})(OverviewContents);

