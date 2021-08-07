import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import TextInput from "./TextInput";

function NewProduct() {
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

  const { _id } = useParams();

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      prod_id: Date.now().toString(),
      insertion: Date(),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/pegueTest/${_id}`
      );

      let newProducts = [...response.data.products, state];

      let productsUpdate = await axios.put(
        `https://ironrest.herokuapp.com/pegueTest/${response.data._id}`,
        { products: newProducts }
      );
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="productBg100">
      <Navbar user={_id} />
      <h1>Adicionar Produto</h1>
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
            Adicionar produto
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
