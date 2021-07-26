import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveTotals} from "../../actions/totals";
import TotalBarChart from "../charts/TotalBarChart";
import {getYears, getQuarter, buildDataTotalBarChart} from "../../utils/record.handling.methods";

import '../../styles/contents.css';
import '../../styles/general.css';
import DoughnutChart from "../charts/DoughnutChart";

class OverviewContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getYears = getYears.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);

        this.state = {
            activeCategory: "",
            activeYears : [],
            activeQuarters : [1,2,3,4],
            categories : [
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
        };
    }

    componentDidMount() {
        this.props.retrieveTotals();
    }

    refreshData() {
        this.setState({
            labels: this.getYears(this.props.totals),
            data : this.buildDataTotalBarChart(this.props.totals, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory),
        });

        this.checkQuarters();
    }

    handleOnChangeCategory(id){

        /* Change active chart */
        this.state.activeCategory = id;

        /* Uncheck all others */
        this.uncheckCategories(id);

        this.refreshData();
    }

    handleOnChangeYear(totalsData, year){

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

        this.refreshData();
    }

    handleOnChangeQuarter(totalsData, quarter){

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

    uncheckCategories(activeId) {
        this.state.categories.map(({id}) => {
            if(activeId != id) {
                document.getElementById(id).checked = false;
            }
        })
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

    chartDescriptions(){
        switch (this.state.active) {
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
                    <p>In this page you can visualise the total numbers of Dataverses, Datasets, Files and Users in the TRR 170 Dataverse Repository.</p>
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
                                                onChange={() => this.handleOnChangeCategory(id)}
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
                                            onChange={() => this.handleOnChangeYear(this.props.totals, year)}
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
                                            onChange={() => this.handleOnChangeQuarter(this.props.totals, quarter)}
                                        />
                                        <label htmlFor={quarter}>{'Q' + quarter}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div id="charts">
                        {this.chartDescriptions()}
                        <TotalBarChart data={this.state.data} labels={this.state.activeYears}/>
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

