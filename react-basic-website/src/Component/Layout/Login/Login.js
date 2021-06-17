import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// async function loginUser(credentials) {
//   return fetch("http://localhost:8080/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (email === "vijaybhopalwani@gmail.com" && password === "123") {
    //   const token = await loginUser({
    //     email,
    //     password,
    //   });
    //   setToken(token);
    //   window.location.reload();
    // } else {
    //   alert("you have provide wrong email and password");
    // }ma

    if (email === "vijaybhopalwani@gmail.com" && password === "123") {
    history.push("/Home");
    } else {
      toast.error("Your Id Password is not correctt",{position:"bottom-right"});
    }
  };
  return (
    <div className="global-container py-5">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Log in to Codepen</h3>
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Email address <span className="red">*</span>{" "}
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Password <span className="red">*</span>
                </label>

                <input
                  type="password"
                  className="form-control form-control-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!validateForm()}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
