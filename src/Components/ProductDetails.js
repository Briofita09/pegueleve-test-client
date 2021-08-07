import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function ProductDetails() {
  const [state, setState] = useState({
    _id: "",
    name: "",
    value: "0,00",
    quantity: "",
    description: "",
    insertion: "",
    updated: "",
  });

  const { _id, prod_id } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/pegueTest/${_id}`
        );

        let result = response.data.products.find((product) => {
          return product.prod_id === prod_id;
        });

        if (result) {
          setState({ ...result });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDetails();
  }, [_id, prod_id]);

  return (
    <div className="productBg">
      <Navbar user={_id} />
      <div>
        <h1>Detalhes do Produto</h1>

        <hr />

        <div>
          <h2>Nome: </h2>
          <p>{state.name}</p>
        </div>

        <div>
          <h2>Valor: </h2>
          <p>{state.value}</p>
        </div>

        <div>
          <h2>Quantidade: </h2>
          <p>{state.quantity}</p>
        </div>

        <div>
          <h2>Descrição:</h2>
          <p>{state.description}</p>
        </div>

        <div>
          <h2>Data do cadastro: </h2>
          <p>{state.insertion}</p>
        </div>

        <div>
          <h2>Ultima atualização: </h2>
          <p>{state.updated}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
