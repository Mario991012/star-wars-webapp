import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { GraphQLConfigService } from './services/graphql-config.service';

export function createApolloClient(
  configService: GraphQLConfigService
): ApolloClient<any> {
  const httpLink = new HttpLink({ uri: configService.getEndpoint() });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth-token');
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
