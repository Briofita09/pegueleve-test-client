import axios from "axios";
import React, { useState } from "react";
import Logo from "../assets/img/logo-pegueleve.png";

import TextInput from "./TextInput";

export default function Home() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function validate(formValues) {
    let errors = {};
    if (
      !formValues.email ||
      !formValues.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g)
    ) {
      errors = { ...errors, email: "Invalid E-mail" };
    }
    if (
      !formValues.password ||
      !formValues.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,}$/g
      )
    ) {
      errors = { ...errors, password: "Your password is too weak" };
    }
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await axios.get(
        `https://ironrest.herokuapp.com/findOne/pegueTest?email=${state.email}`
      );

      console.log(response);

      if (
        response.data.email === state.email &&
        response.data.password === state.password
      ) {
        console.log("usuario valido");
      } else {
        window.alert("usuario invalido");
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log(state);

  return (
    <div className="contentBox">
      <div>
        <img src={Logo} className="LogoHome" />
      </div>

      <form onSubmit={validate && handleSubmit} className="inputLogin">
        <div className="inputFormLogin">
          <TextInput
            placeholder="E-mail"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputFormLogin">
          <TextInput
            type="text"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signUpBtn">
          Entrar
        </button>
      </form>
    </div>
  );
}
