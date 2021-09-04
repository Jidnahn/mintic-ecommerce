import React from "react";
import App from "./App";
// import ApolloClient from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
// import { createHttpLink } from 'apollo-link-http'
// import { ApolloProvider } from ''

const httpLink = createHttpLink({
  uri: "https://api-ecommerce-mt-g6.herokuapp.com/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
