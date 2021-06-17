import React, { useState } from "react";
import "./StateForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateForm = () => {

  const [formDataCode, setFormDataCode] = useState("");
  const [formDataName, setFormDataName] = useState("");
  const [data, setData] = useState([]);
  const [updateIndex, setUpdateIndex] = useState();
  const [bool, setBool] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorDefinationCode, setErrorDefinationCode] = useState("");
  const [errorDefinationName, setErrorDefinationName] = useState("");
  const [buttonName, setButtonName] = useState("save");

  const handlerSaveBtnData = (event) => {
    event.preventDefault();

    if (formDataCode && formDataName) {
      if (bool) {
        if (
          formDataCode.trim().length >= 2 &&
          formDataCode.trim().length <= 10 &&
          formDataName.trim().length >= 3 &&
          formDataName.trim().length <= 100
        ) {
          const upDateData = { ...data[updateIndex] };
          upDateData.formDataCode = formDataCode;
          upDateData.formDataName = formDataName;
          const upDate = [...data];
          upDate[updateIndex] = upDateData;
          setData(upDate);
          setBool(false);
          setFormDataName("");
          setFormDataCode("");
          setErrorDefinationCode("");
          setErrorDefinationName("");
          setButtonName("save");
          toast.success("Your Data are Successfully updated", {
            position: "bottom-right",
          });
        } else {
          setErrorName(true);
          setErrorCode(true);
          setErrorDefinationCode("Please Enter valid input");
          setErrorDefinationName("please Enter valid input");
        }
      } else if (
        formDataCode.trim().length > 2 &&
        formDataCode.trim().length <= 10 &&
        formDataName.trim().length > 3 &&
        formDataName.trim().length <= 100
      ) {
        setData([...data, { formDataCode, formDataName }]);
        setFormDataName("");
        setErrorDefinationName("");
        setFormDataCode("");
        setErrorDefinationCode("");
        toast.success("Your Data are Successfully save", {
          position: "bottom-right",
        });
      } else if (
        formDataCode.trim().length >= 2 &&
        formDataCode.trim().length <= 10
      ) {
        setErrorName(true);
        setErrorDefinationName("please Enter valid Name");
      } else if (
        formDataName.trim().length >= 3 &&
        formDataName.trim().length <= 100
      ) {
        setErrorCode(true);
        setErrorDefinationCode("Please Enter valid code");
      } else {
        setErrorName(true);
        setErrorCode(true);
        setErrorDefinationCode("Please Enter valid input");
        setErrorDefinationName("please Enter valid input");
      }
    } else if (formDataCode) {
      setErrorName(true);
      setErrorDefinationName("please Enter the Name");
    } else if (formDataName) {
      setErrorCode(true);
      setErrorDefinationCode("Please Enter the code");
    } else {
      setErrorName(true);
      setErrorCode(true);
      setErrorDefinationCode("Please Enter the code");
      setErrorDefinationName("please Enter the Name");
    }
  };

  const HandleStateCodeOnChangeHandler = (e) => {
    setFormDataCode(e.target.value);
    let item = e.target.value.trim();

    if (item.length <= 2) {
      setErrorCode(true);
      setErrorDefinationCode("the min length code is 2");
    } else if (item.length > 10) {
      setErrorCode(true);
      setErrorDefinationCode("the max length code is 10");
    } else {
      setErrorCode(false);
      setErrorDefinationCode("");
    }
  };

  const HandleStateNameOnChangeHandler = (e) => {
    setFormDataName(e.target.value);
    let item = e.target.value.trim();

    if (item.length < 3) {
      setErrorName(true);
      setErrorDefinationName("the min length Name is 2");
    } else if (item.length > 100) {
      setErrorName(true);
      setErrorDefinationName("the max length Name is 100");
    } else {
      setErrorName(false);
      setErrorDefinationName("");
    }
  };

  const handleResetBtn = (e) => {
    e.preventDefault();
    setFormDataName("");
    setFormDataCode("");
    setErrorCode("");
    setErrorName("");
  };
  const handleUpdatebtn = (index) => {
    let updateState = data.findIndex((ele, ind) => {
      setFormDataCode(ele.formDataCode);
      setFormDataName(ele.formDataName);
      return ind === index;
    });
    setUpdateIndex(updateState);
    setBool(true);
    setButtonName("Update");
  };

  const handleDeletebtn = (index) => {
    const updatedItems = [...data];
    updatedItems.splice(index, 1);
    setData(updatedItems);
    toast.error("Your Data Deleted", {
      position: "bottom-right",
    });
  };

  return (
    <div className="container py-5 pageStyle">
      <div className="row ">
        <div className="col-sm-6">
          <div className="card card-outline-secondary">
            <div className="card-header">
              <h3 className="mb-0">State Information</h3>
            </div>
            <div className="card-body">
              <form className="form">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label">
                    State Code <span className="red">*</span>
                  </label>
                  <div className="col-lg-9">
                    <input
                      className="form-control"
                      type="text"
                      value={formDataCode}
                      placeholder=" Enter State Code"
                      onChange={(e) => HandleStateCodeOnChangeHandler(e)}
                      name="stateCode"
                    />

                    <p className="cardError">
                      {errorCode ? (
                        <span className="red">* {errorDefinationCode}</span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
                <div className="form-group row ">
                  <label className="col-lg-3 col-form-label form-control-label mt-4">
                    State Name <span className="red">*</span>
                  </label>
                  <div className="col-lg-9 mt-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder=" Enter State Name"
                      value={formDataName}
                      onChange={(e) => HandleStateNameOnChangeHandler(e)}
                      name="stateName"
                    />
                    <p className="cardError">
                      {errorName ? (
                        <span className="red">* {errorDefinationName}</span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label"></label>
                  <div className="col-lg-9 ">
                    <button
                      type="submit"
                      className="btn btn-outline-info mr-1"
                      onClick={handlerSaveBtnData}
                    >
                      {buttonName}
                    </button>
                    <button
                      type="reset"
                      className="btn btn-outline-secondary"
                      onClick={handleResetBtn}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-6 ">
          {data.map((d, index) => {
            return (
              <div className="row showItems" key={index}>
                <div className="col-sm-2 ">
                  <h5>{d.formDataCode}</h5>
                </div>
                <div className="col-sm-8 items">
                  <h5>{d.formDataName}</h5>
                </div>
                <div className="col-sm-2 ">
                  <i
                    className="far fa-trash-alt trashBtn"
                    title="delete itme"
                    onClick={() => handleDeletebtn(index)}
                  ></i>
                  <i
                    className="far fa-edit trashUpdate"
                    title="update item"
                    onClick={() => handleUpdatebtn(index)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StateForm;
