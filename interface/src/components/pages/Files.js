import {BrowserRouter as Router} from 'react-router-dom';

import Navigation from "../page-elements/Navigation";
import Footer from "../page-elements/Footer";
import FileContents from "../contents/FileContents";

import '../../styles/general.css';

const Files = () => {
    return (
        <body>
            <Navigation />
            <FileContents />
            <Footer />
        </body>
    )
}

export default Files;
