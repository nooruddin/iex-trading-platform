import React, { Component } from "react";
import "./App.css";
import logo from "./logo.png";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IEXSymbols from "./components/IEXSymbols";

//  all queries are accessed by this url and graphql does the heavy lifting from there.
let uri = "";
if (process.env.NODE_ENV === "production") {
  uri = "/graphql";
} else {
  uri = "http://localhost:5000/graphql";
}
const client = new ApolloClient({
  uri: uri
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <img
              src={logo}
              alt="IEX"
              style={{ width: 300, margin: "20px auto", display: "block" }}
            />
            <Route exact path="/" component={IEXSymbols} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
