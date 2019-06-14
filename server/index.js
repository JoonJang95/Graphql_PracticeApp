const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
