import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import classNames from "classnames";

//  queries can be modified to access all or part of this models as server lists all possible model columns
const BATCH_QUERY = gql`
  query BatchQuery($symbol: String!) {
    batch(symbol: $symbol) {
      quote {
        symbol
        companyName
        primaryExchange
        sector
        calculationPrice
        open
        close
        high
        low
        latestPrice
        marketCap
      }
      company {
        symbol
        companyName
        exchange
        industry
        website
        description
        CEO
        issueType
        sector
        tags
      }
      logo {
        url
      }
    }
  }
`;
export default function IEXSymbol({ symbol: { symbol, isEnabled } }) {
  return (
    <Fragment>
      <Query query={BATCH_QUERY} variables={{ symbol }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading Symbol Data.....</h4>;
          if (error) console.log(error);
          const { quote, company, logo } = data.batch;

          return (
            <div
              className="card border-dark mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="logo">
                <img
                  className="card-img-top img-fluid"
                  src={logo.url}
                  alt="Company Logo"
                />
              </div>
              <div className="card-body text-primary">
                <h4
                  className={classNames({
                    "text-success": isEnabled,
                    "text-danger": !isEnabled
                  })}
                >
                  {company.companyName}
                </h4>
                <p className="card-text">{company.description}</p>
                <h5>Current Stock Price: {quote.latestPrice}</h5>
              </div>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
}
