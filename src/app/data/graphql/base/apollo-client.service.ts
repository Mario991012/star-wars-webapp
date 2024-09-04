import { Injectable } from '@angular/core';
import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { environment } from '../../../../environments/environment';

/**
 * `ApolloClientService` is a service that provides a configured instance of the Apollo Client 
 * for interacting with a GraphQL API. It allows setting a custom endpoint and executing queries.
 * 
 * @remarks
 * This service creates an Apollo Client using the GraphQL endpoint from the environment configuration by default.
 * It provides methods for setting a custom GraphQL endpoint and executing queries with optional variables.
 *
 * 
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root',
})
export class ApolloClientService {

  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: environment.graphqlEndpoint,
      }),
      cache: new InMemoryCache(),
    });
  }

  /**
   * Updates the GraphQL API endpoint used by the Apollo Client.
   * 
   * @param url - The new GraphQL endpoint URL to be set.
   */
  public setEndpoint(url: string): void {
    this.client.setLink(new HttpLink({ uri: url }));
  }

  /**
   * Retrieves the Apollo Client instance.
   * 
   * @returns The current Apollo Client instance.
   */
  public getClient(): ApolloClient<any> {
    return this.client;
  }

  /**
   * Executes a GraphQL query using the Apollo Client.
   * 
   * @param query - The GraphQL `DocumentNode` representing the query to be executed.
   * @param [variables] - Optional. An object containing the variables for the query.
   * @returns A `Promise` that resolves with the result of the query.
   * 
   * @example
   * Executing a query with variables:
   * ```typescript
   * const query = gql`query GetUser($id: ID!) { user(id: $id) { id, name } }`;
   * const variables = { id: '1' };
   * this.apolloClientService.executeQuery(query, variables).then(result => {
   *   console.log(result);
   * });
   * ```
   */
  public executeQuery(query: DocumentNode, variables?: any): Promise<any> {
    return this.client.query({
      query,
      variables,
    });
  }
}
