import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './styles/general.css';

import Navigation from "./components/general/navigation";
import Footer from "./components/general/footer";
import OverviewContents from "./components/pages/overview.contents";
import DataverseContents from "./components/pages/dataverse.contents";
import DatasetContents from "./components/pages/dataset.contents";
import FileContents from "./components/pages/file.contents";
import UserContents from "./components/pages/user.contents";


class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Route exact={true} path = {['/', '/totals']} component={OverviewContents}/>
        <Route path = {'/dataverses'} component={DataverseContents}/>
        <Route path = {'/datasets'} component={DatasetContents}/>
        <Route path = {'/files'} component={FileContents}/>
        <Route path = {'/users'} component={UserContents}/>
        <Footer />
      </Router>
    );
  }

}

export default App;
