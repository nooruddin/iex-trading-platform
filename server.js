const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const app = express();
const cors = require("cors");
const path = require("path");

//  Allow cross-origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
