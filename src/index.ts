import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";

import typeDefs from "./typedefs";
import resolvers from "./resolvers";

dotenv.config();
const app = express();
// star wars API endpoint
const url = process.env.API_ENDPOINT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.disable('x-powered-by');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      url
    }
  }
})

server.applyMiddleware({ app, path: "/"});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App Running at Port: ${PORT}`)
})

export default app;