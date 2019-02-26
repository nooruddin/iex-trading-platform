import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import IEXSymbol from "./IEXSymbol";
import SymbolEnabledKey from "./SymbolEnabledKey";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";

//  each symbol represents a company listed on IEX. And each model in our app has a symbol field
const SYMBOLS_QUERY = gql`
  query SymbolsQuery {
    symbols {
      symbol
      name
      date
      isEnabled
      type
      iexId
    }
  }
`;
export class IEXSymbols extends Component {
  constructor(props) {
    super(props);
    this.state = { symbols: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    let sym = [];

    value.forEach(v => {
      sym.push(v.symbol);
    });

    //  update state and show symbol card on UI
    this.setState({ symbols: sym });
  }

  render() {
    return (
      <Fragment>
        <SymbolEnabledKey />
        <h1 className="display-4 my-3">IEX Trading Platform</h1>
        <Query query={SYMBOLS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading.....</h4>;
            if (error) console.log(error);
            const options = data.symbols.map(iexSymbol => ({
              value: iexSymbol.symbol,
              label: iexSymbol.symbol,
              symbol: iexSymbol
            }));
            return (
              <Fragment>
                <div className="symbol-select my-3">
                  <Select
                    components={makeAnimated()}
                    isMulti
                    name="symbols"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="container">
                  <div className="card-deck">
                    {this.state.symbols &&
                      this.state.symbols.map(iexsymbol => (
                        <IEXSymbol key={iexsymbol.symbol} symbol={iexsymbol} />
                      ))}
                    <div className="w-100 d-xs-block d-sm-block d-md-none" />
                  </div>
                </div>
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default IEXSymbols;
