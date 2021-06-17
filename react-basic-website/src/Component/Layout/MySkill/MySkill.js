import React from "react";
import { Redirect } from "react-router";
import Mens from "../../../images/Mens.jpg";

const MySkill = ({authorize}) => {
  if (!authorize) {
    return <Redirect to="/login" />;
  }
  return (
    <section id="mtSkill" className="mtSkill py-5 mt-5">
      <div className="container text-center text-black">
        <h1 className="display-4" style={{ textAlign: "left" }}>
          My Skill,
        </h1>
        <br />
        <img
          src={Mens}
          className="img-fluid rounded-circle"
          alt="Profile"
          width="150"
          height="150"
        />
        <h2 className="mt-4">Hello...!</h2>
        <h3 className="mt-3">My Name is vijay & i do creative bots</h3>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-xl-6 col-sm-12 col-md-6">
            <h3>
              Study...
              <span style={{ color: "#0093e9" }}>!</span>
            </h3>
            <div className="text-secondary">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.(2014)
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.(2016)
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.(2016)
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.(2016)
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-sm-12 col-md-6">
            <h3>
              Skills...
              <span style={{ color: "#0093e9" }}>!</span>
            </h3>
            <span className="display-5">html</span>
            <div className="progress mt-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: "70%" }}
              ></div>
            </div>
            <span className="display-5">CSS</span>
            <div className="progress mt-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: "50%" }}
              ></div>
            </div>
            <span className="display-5">Bootstrap</span>
            <div className="progress mt-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: "75%" }}
              ></div>
            </div>
            <span className="display-5">React</span>
            <div className="progress mt-2">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySkill;
