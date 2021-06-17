import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Footer.css";
const Footer = ({authorize}) => {
  if (!authorize) {
    return <Redirect to="/login" />;
  }
  return (
    <footer className="footer">
      <div className="container-fluid bg-1 text-white">
        <br />
        <h3 style={{ fontWeight: "bold" }} className="text-center">
          You can find me at
        </h3>
        <ul>
          <li>
            <Link to="" className="LinkColor">
              <i className="fab fa-facebook fa-2x" aria-hidden="true"></i>
            </Link>
          </li>
          <li>
            <Link to="" className="LinkColor">
              <i className="fab fa-twitter fa-2x" aria-hidden="true"></i>
            </Link>
          </li>
          <li>
            <Link to="" className="LinkColor">
              <i className="fab fa-instagram fa-2x" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="container ">
          <div className="row">
            <div className="col-md-4 fbody">
              <h2 className="title">Help Center</h2>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> How to Pay
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> FAQ's
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Site Map
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Delivery Info
              </Link>
            </div>
            <div className="col-md-4 fbody">
              <h2 className="title">User Information</h2>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> About Us
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> FAQ's
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Contact us
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Delivery Info
              </Link>
            </div>
            <div className="col-md-4 fbody">
              <h2 className="title">Payment</h2>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i>Google Pay
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Phone Pay
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Paytm
              </Link>
              <Link to="" className="LinkColor">
                <i className="fa fa-angle-double-right"></i> Amazon Pay
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <section className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p>Copyright © 2021. Your Profile.</p>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
