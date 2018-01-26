const express = require("express");
const graphqlHTTP = require("express-graphql");
const ratesSchema = require("./rates-schema");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(
  "/rates",
  graphqlHTTP({
    schema: ratesSchema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("GraphQL server running on port 3000");
});
