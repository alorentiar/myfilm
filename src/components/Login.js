import React from "react";

export const Login = () => {
  return (
    <div className="form">
      <label className="label">Username :</label>
      <input type="text" name="username" placeholder="Username"></input>
      <label className="label">Password :</label>
      <input type="password" name="password" placeholder="Password"></input>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default Login;
