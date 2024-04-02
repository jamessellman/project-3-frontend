import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  function handleChange(e: any) {
    setErrorMessage("");
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  console.log(formData);

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault(); 
      const resp = await axios.post("/api/login", formData);
      localStorage.setItem("token", resp.data.token);
      console.log(resp.data);
      fetchUser();
      navigate("/sellerhome");
    } catch (e: any) {
      console.log("there has been an error!", e.response.data.message);
      setErrorMessage(e.response.data.message);
    }
  }

  return (
    <div className="section">
      <p className="title has-text-centered mb-5"> Login Here 👇🏽</p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field ">
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
            </div>
          </div>
          <div className="field mt-4">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Enter Password"
                type="password"
                name={"password"}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
          <div>
            {errorMessage && (
              <small className="has-text-danger">{errorMessage}</small>
            )}
          </div>
          <div className="mt-5">
            <button className="button is-rounded is-light">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
