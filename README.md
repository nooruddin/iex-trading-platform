# IEXTradingPlatform

a simple react graphql app that allows to query IEX Trading Platform

## Available Scripts

To run the application, from the root directory,

### `cd client`

### `npm i`

### `cd ..`

### `npm i`

### `npm run dev`

Runs both client and server.

Runs the app in the development mode.

##### Open [GraphQL Server](http://localhost:5000/graphql) to view the GraphiQL interface and interact with the apis.

##### Open [Front End Application](http://localhost:3000) to view the application in the browser.

## Trading Enabled Key

- Shows which companies are currently enabled for trading and which ones are not (for e.g. BKCH is not enabled for trading).

## Sample GraphQL Query for use in GraphiQL

```
 {
  batch(symbol:"AMZN") {
    company {
      companyName
    }
    quote{
      calculationPrice
    }
    logo{
      url
    }
  }
}
```

##### The page will reload if you make edits as we use nodemon to watch for changes.

##### You will also see any lint errors in the console.
