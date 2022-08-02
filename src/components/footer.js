import { useState } from "react";


function Footer(props) {
   
    return ( 
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="footer-list">
                            <h5>Citadef</h5>
                            <ul>
                                <li><a href="/#">All Fishes</a></li>
                                <li><a href="/#/mint/select">Mint an Account</a></li>
                                <li><a href="/#">Search</a></li>
                                <li><a href="/#/govern">Govern</a></li>
                                <li><a href="/#/world">Virtual World</a></li>
                                <li><a href="/#/plot">Process your plot</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="footer-list">
                            <h5>Resources</h5>
                            <ul>
                                <li><a href="https://neiman.eth.limo/2020-05-21/Introduction_to_Dwebsitse.html">What are dWebsites?</a></li>
                                <li><a href="https://esteroids.medium.com/wnft-smart-contract-7ec00099c77d">What is WNFT?</a></li>
                                <li><a href="/#/democraticweb">The democratic web</a></li>
                                <li><a href="/#/about">Why fishes?</a></li>
                                <li><a href="/#/about">Roadmap</a></li>
                                <li><a href="/#/about">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="footer-list">
                            <h5>Community</h5>
                            <ul>
                                <li><a href="https://discord.gg/9c2EWzjFzY">Discord</a></li>
                                <li><a href="https://twitter.com/e_steroids">Twitter</a></li>
                                <li><a href="mailto://contact@esteroids.xyz">Email</a></li>
                                <li><a href="https://esteroids.medium.com/">Blog</a></li>
                                <li><a href="/#/about">About</a></li>
                                <li><a href="/#/mailinglist">Mailing List</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="footer-list">
                            <h5>Newsletter</h5>
                            <p>Signup if you want to be part of this experiment.</p>
                            <form action="/#/mailinglist" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                <div className="col text-center">
                                    <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> <a href="/#/mailinglist" id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></a>
                                    <div className="clearfix"></div>
                                </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small>We don't spam, we protect your email.</small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;