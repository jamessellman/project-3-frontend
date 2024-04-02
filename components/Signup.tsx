import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../src/config"

export default function UserSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorData, setErrorData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: any) {
    setErrorData({
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  console.log(formData);

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/signup`, formData);
      console.log(resp.data);
      navigate("/login");
    } catch (e: any) {
      setErrorData(e.response.data.errors);
      console.log(errorData);
    }
  }

  console.log("errors:", errorData);

  return (
    <div className="section">
      <p className="title has-text-centered mb-5"> Sign Up Here 👇🏽</p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>

            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                placeholder="Enter Your Name"
                name={"userName"}
                onChange={handleChange}
                value={formData.userName}
              />
              {errorData.userName && (
                <small className="has-text-danger">{errorData.userName}</small>
              )}
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Enter Email"
                type="text"
                name={"email"}
                onChange={handleChange}
                value={formData.email}
              />
              {errorData.email && (
                <small className="has-text-danger">{errorData.email}</small>
              )}
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Enter Your Password"
                type="password"
                name={"password"}
                onChange={handleChange}
                value={formData.password}
              />
              {errorData.password && (
                <small className="has-text-danger">{errorData.password}</small>
              )}
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Confirm password</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Enter Password Confirmation"
                type="password"
                name={"confirmPassword"}
                onChange={handleChange}
                value={formData.confirmPassword}
              />
              {errorData.confirmPassword && (
                <small className="has-text-danger">
                  {errorData.confirmPassword}
                </small>
              )}
            </div>
          </div>
          <button className="button mt-5 is-rounded is-light">Submit</button>
        </form>
      </div>
    </div>
  );
}
