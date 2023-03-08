import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Nations } from "./Nations";
import "../App.css";
import logo from "../assets/logo.png";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import { useLocation } from "wouter";

export const UserForm = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  let initState = {
    name: "",
    surname: "",
    id: "",
    nationality: "",
    current: "",
    email: "",
    phone: "",
    birthday: "",
    project: "",
  };

  const [form, setForm] = useState(initState);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = () =>
      axios
        .get(apiUrl + "/projects")
        .then((dataProjects) => setProjects(dataProjects.data))
        .catch((err) => console.log(err));

    fetchProjects();
    // eslint-disable-next-line
  }, []);

  //   const [setLocation, location] = useLocation();
  const submitForm = () => {
    axios
      .post(apiUrl + "/submit", form, {
        "Content-Type": "applicatio /json",
      })
      //   .then((a) => setLocation(`/terms?id=${a.data}`))
      .then((a) => window.location.assign(`/terms?id=${a.data}`))
      .catch((err) => console.log(err));
  };

  const checkData = () => {
    if (
      form.name === "" ||
      form.surname === "" ||
      form.id === "" ||
      form.nationality === "" ||
      form.nationality === "SELECT" ||
      form.current === "" ||
      form.current === "SELECT" ||
      form.email === "" ||
      form.phone === "" ||
      form.birthday === "" ||
      form.project === "SELECT" ||
      form.project === ""
    ) {
      toast.error("Please fill out every field");
    } else submitForm();
  };

  const [phone, setPhone] = useState();

  useEffect(() => {
    setForm({ ...form, phone: phone });
    // eslint-disable-next-line
  }, [phone]);

  return (
    <div>
      <div className="header">
        {/* <h1> */}
        {/* Welcome to <br /> */}
        Terms and Conditions & Privacy Policy
        {/* </h1> */}
      </div>
      <br />
      {/* <br /> */}
      <br />
      <div className="title-div">
        <img src={logo} className="logo" alt="" />
        <>Please fill out this form:</>
      </div>
      <br />
      <br />
      {projects.length < 1 ? (
        <>
          <br />
          <br />
          <br />
          <div class="loader"></div>
        </>
      ) : (
        <div className="form-div fade">
          <div className="form">
            <div className="input-div">
              Project:{"    "}
              <select
                name="project"
                onChange={(event) => {
                  setForm({ ...form, project: event.target.value });
                }}
              >
                {projects.map((project) => (
                  <option value={project}>{project}</option>
                ))}
              </select>
            </div>
            {/* <br /> */}
            <div className="input-div">
              Name:{"    "}
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setForm({ ...form, name: event.target.value });
                }}
              />
            </div>
            {/* <br /> */}
            <div className="input-div">
              Last name:{"    "}
              <input
                type="text"
                name="surname"
                onChange={(event) => {
                  setForm({ ...form, surname: event.target.value });
                }}
              />
            </div>
            {/* <br /> */}
            <div className="input-div">
              ID:{"    "}
              <input
                type="text"
                name="id"
                onChange={(event) => {
                  setForm({ ...form, id: event.target.value });
                  //   setId(event.target.value);
                }}
              />
            </div>
            {/* <br /> */}
            <div className="input-div">
              Date of birth:{"    "}
              <input
                type="date"
                name="birthday"
                onChange={(event) => {
                  setForm({ ...form, birthday: event.target.value });
                }}
              />
            </div>
            {/* <br /> */}
            <Nations form={form} setForm={setForm} selectType={"nationality"} />
            {/* <br /> */}
            <Nations form={form} setForm={setForm} selectType={"current"} />
            {/* <br /> */}
            <div className="input-div">
              Email:{"    "}
              <input
                type="text"
                name="email"
                onChange={(event) => {
                  setForm({ ...form, email: event.target.value });
                }}
              />
            </div>
            {/* <br /> */}
            <div className="input-div input-fix">
              <div className="phone-div">Phone number:</div>
              <PhoneInput
                placeholder="Enter phone number"
                name="phone"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <br />
            <br />
            <br />
          </div>
          <button onClick={() => checkData()}>
            I understand, that to participate I must accept T&C and PP
          </button>
        </div>
      )}
    </div>
  );
};
