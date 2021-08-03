import React, { Component} from 'react';
import { connect } from "react-redux";
import {retrieveAffiliations} from "../../actions/affiliations";
import TotalBarChart from "../charts/TotalBarChart";
import {getYears, getAffiliations, getQuarter, getRecordsByAffiliation, buildDataTotalBarChart} from "../../utils/record.handling.methods";

import '../../styles/contents.css';
import '../../styles/general.css';


class UserContents extends Component{
    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.getYears = getYears.bind(this);
        this.getAffiliations = getAffiliations.bind(this);
        this.getQuarter = getQuarter.bind(this);
        this.getRecordsByAffiliation = getRecordsByAffiliation.bind(this);
        this.buildDataTotalBarChart = buildDataTotalBarChart.bind(this);

        this.state = {
            activeCategory: "",
            activeYears : [],
            activeAffiliation : "",
            activeQuarters : [1,2,3,4],
            affiliationList : [],
            categories : [
                {
                    id : 'n_users',
                    value : 'Total Users'
                }
            ],
            labels: [new Date().getFullYear()],
            quarters: [1,2,3,4],
            data : [],
        };
    }

    componentDidMount() {
        this.props.retrieveAffiliations();
    }

    refreshData() {
        this.state.data = this.getRecordsByAffiliation(this.props.affiliations, this.state.activeAffiliation);

        this.setState({
            affiliationList : this.getAffiliations(this.props.affiliations),
            labels : this.getYears(this.props.affiliations),
            data : this.buildDataTotalBarChart(this.state.data, this.state.activeYears, this.state.activeQuarters, this.state.activeCategory),
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

    handleOnChangeAffiliation(affiliation){

        /* Add to active affiliation */
        this.state.activeAffiliation = affiliation;

        /* Uncheck all others */
        this.uncheckAffiliations(affiliation);

        this.refreshData();
    }

    handleOnChangeYear(year){

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

    uncheckCategories(activeId) {
        this.state.categories.map(({id}) => {
            //TODO If the element has the same name as any of the ids in the html, then it might be necessary to verify if the element is the child of a sidebar div.
            // For example, if the activeId is root, then all hell will break loose.
            if(activeId != id) {
                document.getElementById(id).checked = false;
            }
        })
    }

    uncheckAffiliations(activeId) {
        this.state.affiliationList.map(id => {
            if(activeId !== id) {
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
        switch (this.state.activeCategory) {
            case 'other':
                return "Some other message";
            default:
                return "Total number of Users per Affiliation over the selected year, and selected quarters.";
        }
    }

    render() {



        return (
            <div id="content" className="container">
                <div className="introduction">
                    <p>The TRR 170 Dataverse Metrics</p>
                    <p>In this page you can visualise metrics related to the Users stored in the TRR-170 Planetary Data Portal.</p>
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
                        <div className='affiliations'>
                            <p>Affiliations</p>
                            {this.state.affiliationList.map(affiliation => {
                                return (
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id={affiliation}
                                            name={affiliation}
                                            value={affiliation}
                                            onChange={() => this.handleOnChangeAffiliation(affiliation)}
                                        />
                                        <label htmlFor={affiliation}>{affiliation}</label>
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
                        <p>{this.chartDescriptions()}</p>
                        <p><b>The active Affiliation:</b> {this.state.activeAffiliation}</p>
                        <TotalBarChart data={this.state.data} labels={this.state.activeYears}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        affiliations: state.affiliations,
    };
};

export default connect(mapStateToProps, { retrieveAffiliations})(UserContents);

