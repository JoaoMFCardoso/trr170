import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from "./components/page-elements/Navigation";
import Footer from "./components/page-elements/Footer";
import IndexContents from "./components/contents/IndexContents";
import DataverseContents from "./components/contents/DataverseContents";
import DatasetContents from "./components/contents/DatasetContents";
import UserContents from "./components/contents/UserContents";
import FileContents from "./components/contents/FileContents";

import './styles/general.css';


const App = () => {
    return (
        <Router>
            <body>
                <Navigation />
                <Route exact={true} path = {'/'} component={IndexContents}/>
                <Route path = {'/dataverses'} component={DataverseContents}/>
                <Route path = {'/datasets'} component={DatasetContents}/>
                <Route path = {'/files'} component={FileContents}/>
                <Route path = {'/users'} component={UserContents}/>
                <Footer />
            </body>
        </Router>
    )
}



export default App;
