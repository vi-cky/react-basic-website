import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toast = (props) => {
  console.log("hello");
  console.log(props);
  if (props.value) {
    toast.success(`${props.message}`, {
      position: "bottom-right",
    });
  } else {
    toast.error(`${props.message}`, {
      position: "bottom-right",
    });
  }
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Toast;
