import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function ProductList() {
  const [state, setState] = useState({
    _id: "",
    products: [],
  });

  const { _id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/pegueTest/${_id}`
        );
        console.log(response);
        setState({ products: [...response.data.products] });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, [_id]);

  return (
    <div>
      <Navbar user={_id} />
      <div>
        {state.products.map((product) => {
          <div>
            <p>imagem</p>
            <p>{product.name}</p>
            <p>{product.value}</p>
            <p>{product.quantity}</p>
            <Link>
              <FaEdit />
            </Link>
            <Link>
              <FaTrashAlt />
            </Link>
          </div>;
        })}
      </div>
    </div>
  );
}

export default ProductList;
