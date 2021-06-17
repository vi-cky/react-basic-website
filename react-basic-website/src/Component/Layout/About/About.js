import React from "react";
import { Link, Redirect } from "react-router-dom";
import Mens from "../../../images/Mens.jpg";
import "./About.css"

const About = ({authorize}) => {
  
  if (!authorize) {
    return <Redirect to="/login" />;
  }
  return (
    <section id="about" className="about py-5 mt-5">
      <div className="container">
        <h1 className="display-4">Who I am,</h1>
        <br />
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12 content">
            <img src={Mens} alt="Responsive" height="400px" />
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12 aboutContent">
            <p>Hello I Everybody, I Am</p>
            <h3>Vijay Bhopalwani</h3>
            <p style={{ fontStyle: "italic" }}>Junior React Enginner</p>
            <p className="text-secondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, corporis molestias officiis quam magni dolorum veniam
              harum beatae alias est?
            </p>
            <p className="text-secondary">
              <i className="fas fa-clock"></i> 23/11/1999
            </p>
            <p className="text-secondary">
              <i className="fas fa-phone-alt"> 9571535978</i>
            </p>
            <p className="text-secondary">
              <i className="fas fa-mail-bulk"> vijaybhopalwani@gmail.com</i>
            </p>
            <p className="text-secondary">
              <i className="fas fa-address-book"> jodhpur</i>
            </p>
            <ul>
              <li>
                <Link to="#">
                  <i className="fab fa-facebook" aria-hidden="true"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
