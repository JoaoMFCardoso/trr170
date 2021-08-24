import React from 'react';
import footerLogo from "../../images/dfg_logo.jpg";

import '../../styles/footer.css';
import '../../styles/general.css';

const Footer = () => {
    return (
        <div id="footer">
            <div className="container" >
                <div className="row">
                    <div className="col-sm-8 small">
                        <span>Copyright © 2021</span>
                    </div>
                    <div className="col-sm-4 text-right">
                        <div className="funder_logo">
                            <a href="https://www.dfg.de//" title="Deutsche Forschungsgmeinschaft" target="_blank"  rel="noreferrer">
                                <img src={footerLogo} width="240" height="90" alt="Deutsche Forschungsgmeinschaft logo"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer