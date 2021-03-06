import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./CityForm.css";
import axios from "../../../axios";
import BootstrapTable from "react-bootstrap-table-next";
import { ToastContainer, toast } from "react-toastify";

/* eslint-disable */
const CityForm = () => {
  const [stateName, setStateName] = useState([]);
  const [city, setCity] = useState({
    cityCode: "",
    cityName: "",
    stateId: "",
  });
  const [errors, setError] = useState({
    formDatacode: "",
    formDataName: "",
    formstateName: "",
  });
  const [cityData, setCityData] = useState([]);
  const [buttonName, setButtonName] = useState("save");
  const [counterId, setId] = useState();
  const [bool, setbool] = useState(false);
  const [pageCounter, setPageCounter] = useState(0);
  useEffect(() => {
    fetchStateForData();
    getCityData();
  }, [pageCounter]);
  const fetchStateForData = async () => {
    const response = await axios.get("/state").catch((err) => {
      console.log(err);
    });
    setStateName(response.data);
  };
  const getCityData = async () => {
    const res = await axios.get("/state/city/" + pageCounter).catch((err) => {
      console.log(err);
    });

    setCityData(res.data);

    const lastRow = res.data[res.data.length - 1];
    if (lastRow) {
      setId(lastRow.city_id);
    } else {
      setId(0);
      console.log(counterId);
    }
  };

  const CheckData = () => {
    console.log(city.stateId);
    if (
      city.cityCode.trim().length >= 2 &&
      city.cityCode.trim().length <= 10 &&
      city.cityName.trim().length >= 3 &&
      city.cityName.trim().length <= 100 &&
      city.stateId.length > 0
    ) {
      return true;
    } else if (
      city.cityCode.trim().length >= 3 &&
      city.cityCode.trim().length <= 10 &&
      city.stateId.length > 0
    ) {
      setError({
        formDataName: "*please enter City Name",
      });
    } else if (
      city.cityName.trim().length >= 4 &&
      city.cityName.trim().length <= 100 &&
      city.stateId.length > 0
    ) {
      setError({
        formDatacode: "*please enter City Code",
      });
    } else if (
      city.cityCode.trim().length >= 3 &&
      city.cityCode.trim().length <= 10 &&
      city.cityName.trim().length >= 4 &&
      city.cityName.trim().length <= 100
    ) {
      setError({
        formstateName: "*please Select State Names",
      });
    } else {
      setError({
        formDataName: "*please enter City Name",
        formDatacode: "*please enter City Code",
        formstateName: "*please Select State Names",
      });
    }
  };
  const handleChangeCategory = (e) => {
    if (e.target.value.length > 0) {
      errors.formstateName =
        e.target.value.length > 0 ? "" : "*please select the state Name";
    }
    if (e.target.value === "nothing") {
      errors.formstateName = "*please select the state name";
      setCity((preData) => ({
        ...preData,
        stateId: "",
      }));
    } else {
      console.log("handleChangeCategory", e.target.value);
      console.log("handleChangeCategory", e.target.name);
      setCity((preData) => ({
        ...preData,
        stateId: e.target.value,
      }));
    }
  };
  const handleOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let error = errors;

    switch (name) {
      case "cityCode": {
        error.formDatacode =
          value.trim().length < 1 || value.trim().length >= 10
            ? " * State Code Must be 2 to 10 char"
            : "";
        break;
      }
      case "cityName": {
        error.formDataName =
          value.trim().length <= 3 || value.trim().length >= 100
            ? "* State Name Must 3 to 100 Char."
            : "";
        break;
      }

      default:
        break;
    }
    setCity((preData) => ({
      ...preData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSavebtn = (e) => {
    e.preventDefault();
    if (CheckData()) {
      if (bool) {
        const updateData = {
          city_id: city.cityId,
          city_code: city.cityCode,
          city_name: city.cityName,
          state_id: city.stateId,
        };

        axios
          .put("/state/city/" + updateData.city_id, {
            city_code: updateData.city_code,
            city_name: updateData.city_name,
            state_id: updateData.state_id,
          })
          .then((res) => {
            if (res.data == "Record update Succesfully") {
              toast.success(` ${res.data}`, {
                position: "bottom-right",
              });
              handleResetBtn(e);
              setButtonName("save");
              setbool(false);
            } else {
              toast.error(` ${res.data}`, {
                position: "bottom-right",
              });
            }

            getCityData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const cityData = {
          city_id: counterId + 1,
          city_code: city.cityCode,
          city_name: city.cityName,
          state_id: city.stateId,
        };
        axios
          .post("/state/city", cityData)
          .then((res) => {
            getCityData();
            if (res.data == "Record already exist") {
              toast.error(res.data, { position: "bottom-right" });
            } else {
              toast.success(res.data, { position: "bottom-right" });
              handleResetBtn(e);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const handleUpdateCity = (row) => {
    setCity({
      cityId: row.city_id,
      cityCode: row.city_code,
      cityName: row.city_name,
      stateId: row.state_id + "",
    });
    setbool(true);
    setButtonName("Update");
  };
  const handleDeleteCity = (row) => {
    console.log(row);
    axios
      .delete("/state/city/" + row)
      .then((res) => {
        getCityData();
        toast.error("Your Data Deleted", {
          position: "bottom-right",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const actionFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="d-flex">
        {console.log(row)}
        <i
          className="far fa-edit trashUpdate"
          onClick={() => handleUpdateCity(row)}
          title="update item"
        ></i>
        <i
          className="far fa-trash-alt trashBtn"
          onClick={() => handleDeleteCity(row.city_id)}
          title="delete itme"
        ></i>
      </div>
    );
  };
  const handleResetBtn = (e) => {
    e.preventDefault();
    setCity({ cityCode: "", cityName: "", stateId: "nothing" });
    setError({ formDatacode: "", formDataName: "" });
  };
  const columns = [
    {
      dataField: "rownum",
      text: "Row Number",
      sort: true,
    },
    {
      dataField: "city_name",
      text: "City Name",
    },
    {
      dataField: "city_code",
      text: "City Code",
    },
    {
      dataField: "statename",
      text: "State Name",
    },
    {
      dataField: "action",
      text: "Action",
      formatter: actionFormatter,
    },
  ];
  console.log(pageCounter);
  console.log(cityData.length);
  const handleNextPageChange = () => {
    if (cityData.length >= 10) {
      setPageCounter(pageCounter + 10);
      getCityData();
    }
  };
  const handlePrevPageChange = () => {
    if (cityData.length) {
      if (pageCounter > 0) {
        setPageCounter(pageCounter - 10);
      }
      getCityData();
    }
  };
  return (
    <div className="container py-5 mt-5">
      <div className="row ">
        <div className="col-md-6 ">
          <span className="display-4">City From</span>
          <hr />
          <form className="form display-design p-5">
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                City code <span className="red">*</span>
              </label>

              <div className="col-lg-9">
                <input
                  className={
                    errors.formDatacode ? "form-control input" : "form-control"
                  }
                  type="text"
                  value={city.cityCode}
                  placeholder=" Enter State Code"
                  onChange={handleOnchange}
                  name="cityCode"
                />
                <p className="cardError">
                  <span className="red">{errors.formDatacode}</span>
                </p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                City Name <span className="red">*</span>
              </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="text"
                  className={
                    errors.formDataName
                      ? "form-control input "
                      : "form-control "
                  }
                  value={city.cityName}
                  onChange={handleOnchange}
                  placeholder=" Enter State Code"
                  name="cityName"
                />
                <p className="cardError">
                  <span className="red">{errors.formDataName}</span>
                </p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                State Name <span className="red">*</span>
              </label>
              <div className="col-lg-9">
                <select
                  name={city.stateId}
                  value={city.stateId}
                  onChange={handleChangeCategory}
                >
                  <option key={0} value="nothing">
                    --please select--
                  </option>
                  {stateName.map((st, index) => {
                    return (
                      <option key={index + 1} value={st.id}>
                        {st.statename}
                      </option>
                    );
                  })}
                </select>
                <p className="cardError">
                  <span className="red">{errors.formstateName}</span>
                </p>
                <p className="cardError">
                  <span className="red"></span>
                </p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label"></label>
              <div className="col-lg-9 d-flex">
                <Button
                  className="btn btn-outline-info mr-1"
                  name={buttonName}
                  click={handleSavebtn}
                />
                <Button
                  className="btn btn-outline-secondary"
                  click={handleResetBtn}
                  name="Reset"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-1"></div>
        <div className="col-sm-5 mt-0">
          <div className="btn-position mb-3">
            <button
              className="btn btn-info mr-2"
              onClick={handlePrevPageChange}
            >
              Prev
            </button>
            <button className="btn btn-info " onClick={handleNextPageChange}>
              Next
            </button>
          </div>
          <div style={{ height: "630px" }}>
            <BootstrapTable
              bootstrap4
              className="customClass"
              keyField="rownum"
              data={cityData}
              columns={columns}
              key={columns.city_id}
              striped
              hover
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CityForm;
