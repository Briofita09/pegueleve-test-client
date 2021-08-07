import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import Home from "./Home";
import NewProduct from "./NewProduct";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

import SignUp from "./SignUp";

class App extends React.Component {
  state = {
    _id: "",
    prod_id: "",
  };

  setUser = (_id) => {
    this.setState({ _id: _id });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={(props) => {
              return <Home {...props} setUser={this.SetUser} />;
            }}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/:_id/products" component={ProductList} />
          <Route exact path="/:_id/newProduct" component={NewProduct} />
          <Route
            exact
            path="/:_id/:_id/details/:prod_id"
            component={ProductDetails}
          />
          <Route
            exact
            path="/:_id/:_id/delete/:prod_id"
            component={DeleteProduct}
          />
          <Route
            exact
            path="/:_id/:_id/edit/:prod_id"
            component={EditProduct}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
