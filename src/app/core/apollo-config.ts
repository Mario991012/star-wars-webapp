import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { GraphQLConfigService } from './services/graphql-config.service';
import { environment } from '../../environments/environment';

/**
 * Creates and configures an Apollo Client instance for making GraphQL requests.
 * It uses an HTTP link for the GraphQL endpoint and an authorization link that adds
 * the Bearer token to the request headers if a token is available in `localStorage`.
 *
 * @param configService - An instance of `GraphQLConfigService` used to retrieve the GraphQL endpoint URL.
 * @returns An instance of `ApolloClient` configured with HTTP and authorization links.
 *
 * The Apollo Client is configured with an `InMemoryCache` to cache the results of GraphQL queries.
 */
export function createApolloClient(
  configService: GraphQLConfigService
): ApolloClient<any> {

  const httpLink = new HttpLink({ uri: configService.getEndpoint() });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(environment.authTokenKey);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link = ApolloLink.from([authLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}
