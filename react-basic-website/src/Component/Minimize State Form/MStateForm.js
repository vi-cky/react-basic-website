import React, { useEffect, useState } from "react";
import "./MStateForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useMutation } from "@apollo/client";
import { Load_StateData } from "../../graphql/Query";
import {
  CREATE_STATE,
  DELETE_STATE,
  Update_STATE,
} from "../../graphql/Mutation";
/* eslint-disable */
const MStateForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    Name: "",
  });
  const [datas, setData] = useState([]);
  const [errors, setError] = useState({
    formDatacode: "",
    formDataName: "",
  });
  const [updateIndex, setUpdateIndex] = useState();
  const [buttonName, setButtonName] = useState("save");
  const [counterId, setId] = useState();

  const { error, loading, data, refetch } = useQuery(Load_StateData, {
    onCompleted: (data) => {
      setData(data.getStateData.data);
    },
  });
  const [createState] = useMutation(CREATE_STATE, {
    onCompleted: (data) => {
      let msg = "Message";
      if (data.createState.success) {
        msg = data.createState.message;
        refetch();
        toast.success(`${msg}`, {
          position: "bottom-right",
        });
        handleResetBtn();
      } else {
        msg = data.createState.message;
        toast.error(`${msg}`, {
          position: "bottom-right",
        });
      }
    },
  });
  const [DeleteState] = useMutation(DELETE_STATE, {
    onCompleted: (data) => {
      if (data.DeleteState.success) {
        refetch();
        toast.error(`${data.DeleteState.message}`, {
          position: "bottom-right",
        });
      } else {
        toast.error(`${data.DeleteState.message}`, {
          position: "bottom-right",
        });
      }
    },
  });
  const [UpdateState] = useMutation(Update_STATE, {
    onCompleted: (data) => {
      let msg = "Message";
      if (data.UpdateState.success) {
        msg = data.UpdateState.message;
        refetch();
        toast.success(`${msg}`, {
          position: "bottom-right",
        });
        handleResetBtn();
      } else {
        msg = data.UpdateState.message;
        toast.error(`${msg}`, {
          position: "bottom-right",
        });
      }
    },
  });
  useEffect(() => {
    if (loading) return <h4>loading...</h4>;
    if (error) console.log(error);
    if (data) {
      setData(data.getStateData);
      const lastrow = data.getStateData[data.getStateData.length - 1];
      if (lastrow) {
        setId(lastrow.id);
      } else {
        setId(0);
      }
    }
  }, [data]);

  const CheckData = () => {
    console.log(formData);
    if (
      formData.code.trim().length >= 2 &&
      formData.code.trim().length <= 10 &&
      formData.Name.trim().length >= 4 &&
      formData.Name.trim().length <= 100
    ) {
      return true;
    } else if (
      formData.code.trim().length >= 3 &&
      formData.code.trim().length <= 10
    ) {
      setError({ formDataName: "*please enter state Name" });
    } else if (
      formData.Name.trim().length >= 4 &&
      formData.Name.trim().length <= 100
    ) {
      setError({ formDatacode: "*please enter state Code" });
    } else {
      setError({
        formDataName: "*please enter state Name",
        formDatacode: "*please enter state Code",
      });
    }
  };
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let error = errors;

    switch (name) {
      case "code": {
        error.formDatacode =
          value.trim().length < 2 || value.trim().length >= 10
            ? " * State Code Must be 2 to 10 char"
            : "";
        break;
      }
      case "Name": {
        error.formDataName =
          value.trim().length <= 3 || value.trim().length >= 100
            ? "* State Name Must 3 to 100 Char."
            : "";
        break;
      }
      default:
        break;
    }
    setFormData((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleUpdatebtn = (index, itm) => {
    const data = {
      id: itm.id,
      code: itm.statecode + "",
      Name: itm.statename,
    };
    setFormData({ ...data });

    setUpdateIndex(index);
    setButtonName("Update");
  };
  const handleDeletebtn = (index) => {
    const upDateData = [...datas];
    if (data) {
      DeleteState({
        variables: {
          id: upDateData[index].id,
        },
      });
    }
  };
  const handleSaveBtn = (e) => {
    e.preventDefault();
    if (CheckData()) {
      let upDateData = [...datas];
      if (updateIndex > -1) {
        UpdateState({
          variables: {
            statecode: formData.code,
            statename: formData.Name,
            id: formData.id,
          },
        });
      } else {
        createState({
          variables: {
            statecode: formData.code,
            statename: formData.Name,
            id: counterId + 1,
          },
        });
        if (error) {
          console.log(error);
        }
      }
      setData(upDateData);
    }
  };
  const handleResetBtn = () => {
    setError({ formDataName: "", formDatacode: "" });
    setFormData({ code: "", Name: "" });
    setUpdateIndex(-1);
    setFormData({ code: "", Name: "" });
    setButtonName("save");
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
                      className={
                        errors.formDatacode
                          ? "form-control input"
                          : "form-control"
                      }
                      type="text"
                      value={formData.code}
                      onChange={handleOnChange}
                      placeholder=" Enter State Code"
                      name="code"
                    />
                    <p className="cardError">
                      <span className="red">{errors.formDatacode}</span>
                    </p>
                  </div>
                </div>
                <div className="form-group row ">
                  <label className="col-lg-3 col-form-label form-control-label mt-4">
                    State Name <span className="red">*</span>
                  </label>
                  <div className="col-lg-9 mt-4">
                    <input
                      className={
                        errors.formDataName
                          ? "form-control input "
                          : "form-control "
                      }
                      type="text"
                      value={formData.Name}
                      onChange={handleOnChange}
                      placeholder=" Enter State Name"
                      name="Name"
                    />
                    <p className="cardError">
                      <span className="red"> {errors.formDataName}</span>
                    </p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label"></label>
                  <div className="col-lg-9 ">
                    <button
                      type="submit"
                      className="btn btn-outline-info mr-1"
                      onClick={handleSaveBtn}
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
          {datas.map((d, index) => {
            return (
              <div className="row showItems" key={index}>
                <div className="col-sm-2 ">
                  <h5>{d.statecode}</h5>
                </div>
                <div className="col-sm-8 items">
                  <h5>{d.statename}</h5>
                </div>
                <div className="col-sm-2 ">
                  <i
                    className="far fa-trash-alt trashBtn"
                    title="delete itme"
                    onClick={() => handleDeletebtn(index, d)}
                  ></i>
                  <i
                    className="far fa-edit trashUpdate"
                    title="update item"
                    onClick={() => handleUpdatebtn(index, d)}
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

export default MStateForm;
