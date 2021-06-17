import React, {  useState } from "react";
import Mens from "../../../images/Mens.jpg";
import image4 from "../../..//images/image4.jpg";
import image5 from "../../..//images/image5.jpg";
import ny from "../../..//images/ny.jpg";
import wire from "../../..//images/wire.jpg";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setValue } from "../../../redux/Actions/BooleanAction";
import { useSelector } from "react-redux";

const images = { Mens, image4, image5, ny, wire };

const Home = ({ authorize }) => {
  const [img, setImage] = useState(images.Mens);

  const dispatch = useDispatch();
  dispatch(setValue(true));
  const authvalue = useSelector((state) => state.allBool.auth);

  if (authvalue === false) {
    return <Redirect to="/Login" />;
  }

  return (
    <div className="container-fluid py-5 mt-4 back">
      <div className="row">
        <div className="col-xl-6 col-md-6 d-flex">
          <div className="containData">
            <div className="center">
              <h2>I am Vijay Bhopalwani,</h2>
              <h4>A Web Devloper</h4>
              <p style={{ fontSize: "10px" }}>
                far far away, behind the mountains, far from the countries
                vokalis and vijay is here.
              </p>
              <button
                onClick={() => {
                  setImage(images.wire);
                }}
                className="btn btn-outline-info text-white button1"
              >
                Button First
              </button>
              <button
                onClick={() => {
                  setImage(images.Mens);
                }}
                className="btn btn-outline-info text-white button2"
              >
                Button Second
              </button>
              <button
                onClick={() => {
                  setImage(images.image4);
                }}
                className="btn btn-outline-info text-white button3"
              >
                Button third
              </button>
              <button
                onClick={() => {
                  setImage(images.image5);
                }}
                className="btn btn-outline-info text-white button4"
              >
                Button four
              </button>
              <button
                onClick={() => {
                  setImage(images.ny);
                }}
                className="btn btn-outline-info text-white button5"
              >
                Button five
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 ">
          <img
            src={img}
            className="toggle-img"
            height="600px"
            width="100%"
            alt="Responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
