import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function DeleteProduct() {
  const { _id, prod_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchDelete() {
      try {
        let response = await axios.get(
          `https://ironrest.herokuapp.com/pegueTest/${_id}`
        );

        let response2 = response.data.products.filter((product) => {
          return product.prod_id !== prod_id;
        });

        response.products = [...response2];
        console.log(response.products);

        axios
          .put(`https://ironrest.herokuapp.com/pegueTest/${_id}`, response)
          .then((response) => {
            history.goBack();
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.error(err);
      }
    }
    fetchDelete();
  }, [_id, prod_id]);
  return <div>.</div>;
}

export default DeleteProduct;
