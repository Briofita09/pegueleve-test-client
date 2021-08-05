import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";

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
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
