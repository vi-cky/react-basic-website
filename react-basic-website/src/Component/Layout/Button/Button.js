import React from "react";

const Button = (props) => {
  return (
    <div className="form-group ">
      <button className={props.className} type="submit" onClick={props.click}>
        {props.name}
      </button>
    </div>
  );
};

export default Button;
