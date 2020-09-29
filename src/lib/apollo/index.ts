import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
	uri: "https://apparent-oarfish-93.hasura.app/v1/graphql",
	cache: new InMemoryCache(),
})
