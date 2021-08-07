import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import { IoArrowBackOutline } from "react-icons/io5";

function SignUp() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    id: "",
    products: [],
  });

  function handleChange(event) {
    setState({
      ...state,
      id: Date.now().toString(),
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post("https://ironrest.herokuapp.com/pegueTest", {
        ...state,
      });
      window.alert("usuario cadastrado");
    } catch (err) {
      console.error(err);
    }
  }

  console.log(state);

  return (
    <div className="signUpback">
      <div className="backBox">
        <Link to="/">
          <IoArrowBackOutline className="backIconSignUp" />
        </Link>
        <h1 className="signUpTitle">Criar Conta</h1>
      </div>

      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="inputForm">
          <TextInput
            label="E-mail: "
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputForm">
          <TextInput
            label="Senha: "
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputForm">
          <TextInput
            label="Nome: "
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signUpBtn">
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default SignUp;
