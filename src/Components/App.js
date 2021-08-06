import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ProductList from "./ProductList";

import SignUp from "./SignUp";

class App extends React.Component {
  state = {
    id: "",
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
