import axios from "axios";
import React, { useState } from "react";
import Logo from "../assets/img/logo-pegueleve.png";
import { Link, useHistory } from "react-router-dom";

import TextInput from "./TextInput";

export default function Home() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

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
        history.push(`/${response.data._id}/products`);
      } else {
        window.alert("usuario invalido");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="productBg100">
      <div className="editContainer">
        <div>
          <img src={Logo} className="LogoHome" />
        </div>
        <form onSubmit={validate && handleSubmit}>
          <div className="editItem">
            <TextInput
              placeholder="E-mail"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="editItem">
            <TextInput
              type="text"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="editItem">
            <button type="submit" className="editbtn">
              Entrar
            </button>
          </div>
          <Link to={"/signup"}>
            <p>Não tem conta? Crie uma agora!</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
