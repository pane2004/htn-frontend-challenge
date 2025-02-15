import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    uri: "https://api.hackthenorth.com/v3/frontend-challenge",
    cache: new InMemoryCache(),
  });
}
