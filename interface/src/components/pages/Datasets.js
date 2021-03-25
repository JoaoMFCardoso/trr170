import {BrowserRouter as Router} from 'react-router-dom';

import Navigation from "../page-elements/Navigation";
import Footer from "../page-elements/Footer";
import DatasetContents from "../contents/DatasetContents";

import '../../styles/general.css';

const Datasets = () => {
    return (
        <body>
            <Navigation />
            <DatasetContents />
            <Footer />
        </body>
    )
}

export default Datasets;
