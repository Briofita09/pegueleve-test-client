import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";

function ProductList() {
  const [state, setState] = useState({
    _id: "",
    products: [],
  });

  const { _id, prod_id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/pegueTest/${_id}`
        );
        console.log(response.data.products[0].prod_id);
        console.log(response.data.products);
        setState({ products: [...response.data.products] });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, [_id, prod_id]);
  return (
    <div className="productBg">
      <Navbar user={_id} />
      <div className="productContainer">
        {state.products.map((product) => {
          return (
            <div className="productBox">
              <div className="productItem">
                <p>{product.name}</p>
                <p>R$ {product.value}</p>
              </div>
              <div className="imgItem">
                <Link to={`${_id}/details/${product.prod_id}`} title="Detalhes">
                  <FcInfo className="logoItem" />
                </Link>
              </div>
              <div className="productItem">
                <p>Unidades: {product.quantity}</p>
                <div className="subProductItem">
                  <Link to={`${_id}/edit/${product.prod_id}`} title="Editar">
                    <FaEdit />
                  </Link>
                  <Link to={`${_id}/delete/${product.prod_id}`} title="Deletar">
                    <FaTrashAlt />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
