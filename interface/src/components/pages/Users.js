import {BrowserRouter as Router} from 'react-router-dom';

import Navigation from "../page-elements/Navigation";
import Footer from "../page-elements/Footer";
import UserContents from "../contents/UserContents";

import '../../styles/general.css';

const Users = () => {
    return (
        <body>
            <Navigation />
            <UserContents />
            <Footer />
        </body>
    )
}

export default Users;
