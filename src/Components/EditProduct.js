import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import TextInput from "./TextInput";

function EditProduct() {
  const [state, setState] = useState({
    _id: "",
    prod_id: 0,
    name: "",
    value: "0,00",
    quantity: "",
    description: "",
    insertion: "",
    updated: "",
  });

  const { _id, prod_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchEdit() {
      try {
        let resposta = await axios.get(
          `https://ironrest.herokuapp.com/pegueTest/${_id}`
        );
        let result = resposta.data.products.find((product) => {
          return product.prod_id === prod_id;
        });

        if (result) {
          setState({ ...result });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchEdit();
  }, [_id, prod_id]);

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      updated: Date(),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await axios.get(
        `https://ironrest.herokuapp.com/pegueTest/${_id}`
      );
      let response2 = response.data.products.map((product) => {
        if (product.prod_id === prod_id) {
          product = { ...state };
          return product;
        } else {
          return product;
        }
      });

      response.products = [...response2];

      let response3 = await axios.put(
        `https://ironrest.herokuapp.com/pegueTest/${_id}`,
        response
      );
      history.goBack();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="productBg100">
      <Navbar user={_id} />
      <h1>Editar Produto</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="editContainer">
          <div className="editItem">
            <TextInput
              label="Nome do produto"
              name="name"
              value={state.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="editItem">
            <TextInput
              label="Valor do produto"
              name="value"
              value={state.value}
              onChange={handleChange}
              required
            />
          </div>
          <div className="editItem">
            <TextInput
              label="Quantidade do produto"
              name="quantity"
              value={state.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="editItem">
            <TextInput
              label="Descrição do produto"
              name="description"
              value={state.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="editItem">
          <button type="submit" className="editbtn">
            Editar produto
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
