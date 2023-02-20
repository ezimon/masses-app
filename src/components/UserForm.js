import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
// import { Countries } from "./Countries";
import { Nations } from "./Nations";

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

  const submitForm = () => {
    // console.log("wjadna");
    fetch(apiUrl + "/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then();
  };

  const checkData = () => {
    if (
      form.name === "" ||
      form.surname === "" ||
      form.id === "" ||
      form.nationality === "" ||
      form.current === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.birthday === "" ||
      form.project === "SELECT" ||
      form.project === ""
    ) {
      toast.error("Please fill out every field");
    } else submitForm();

    console.log(form);
  };

  return (
    <div>
      <h1>Please fill out this form</h1>
      <div>
        <label>
          Project:{" "}
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
        </label>
        <br />
        <br />
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Last name:{" "}
          <input
            type="text"
            name="surname"
            onChange={(event) => {
              setForm({ ...form, surname: event.target.value });
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
            }}
          />
        </label>
        <br />
        <br />
        <label>
          ID:{" "}
          <input
            type="text"
            name="id"
            onChange={(event) => {
              setForm({ ...form, id: event.target.value });
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Birthday:{" "}
          <input
            type="date"
            name="birthday"
            onChange={(event) => {
              setForm({ ...form, birthday: event.target.value });
            }}
          />
        </label>
        <br />
        <br />
        <Nations form={form} setForm={setForm} selectType={"nationality"} />
        <br />
        <br />
        <Nations form={form} setForm={setForm} selectType={"current"} />
        <br />
        <br />
        <label>
          Phone number:{" "}
          <input
            type="text"
            name="phone"
            onChange={(event) => {
              setForm({ ...form, phone: event.target.value });
            }}
          />
        </label>
        <br />
        <br />
        {/* <button onSubmit={() => checkData()}>Next</button> */}
        <input value="Next" type="submit" onClick={() => checkData()}></input>
      </div>
    </div>
  );
};
