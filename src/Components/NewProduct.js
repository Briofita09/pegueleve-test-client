import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function NewProduct() {
  const [state, setState] = useState({
    id: "",
    name: "",
    value: "",
    description: "",
    insertion: "",
    updated: "",
  });

  const { _id } = useParams;

  function handleChange(event) {
    setState({
      ...state,
      [event.targer.name]: event.target.value,
      id: Date.now().toString,
      insertion: Date(),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/pegueTest/${_id}`
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export default NewProduct;
