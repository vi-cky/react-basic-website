import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { setValue } from "../../../redux/Actions/BooleanAction";

import "./Header.css";
const Header = ({ authorize }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  if (!authorize) {
    return <Redirect to="/login" />;
  }

  const logoutClickHandler = () => {
    if (window.confirm("do your really want to logout!!!")) {
      dispatch(setValue(false));
      history.push("/login");
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navcolor fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/Home">
            My Profile Page
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/StateForm">
                  State
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/MStateForm">
                  MState
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/CityFOrm">
                  CityForm
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/MySkill">
                  MySkill
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/MyProfile">
                  MyProfile
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-outline-danger mb-3"
            onClick={logoutClickHandler}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
