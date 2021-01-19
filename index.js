const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const path = require("path");

const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");

const app = express();

const MONGODB_URI =
  "mongodb+srv://vadim:honfq7G7FOugXMo1@cluster0.tpywf.mongodb.net/notes?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  res.sendFile("/index.html");
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
