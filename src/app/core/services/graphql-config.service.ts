import { Injectable, Inject, InjectionToken } from '@angular/core';

/**
 * Injection token used to provide the GraphQL endpoint URL.
 */
export const GRAPHQL_ENDPOINT = new InjectionToken<string>('GRAPHQL_ENDPOINT');

/**
 * `GraphQLConfigService` is responsible for managing the GraphQL API endpoint configuration.
 * It allows retrieving and updating the GraphQL endpoint during runtime.
 * 
 * @remarks
 * The service uses Angular's dependency injection to receive the initial endpoint value
 * and provides methods to retrieve and update the endpoint as needed.
 *
 * @example
 * Example of injecting the `GraphQLConfigService` and retrieving the current endpoint:
 * ```typescript
 * constructor(private graphQLConfigService: GraphQLConfigService) {
 *   const endpoint = this.graphQLConfigService.getEndpoint();
 * }
 * ```
 * 
 * @example
 * Example of setting a new GraphQL endpoint:
 * ```typescript
 * this.graphQLConfigService.setEndpoint('https://new-api.example.com/graphql');
 * ```
 * 
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root',
})
export class GraphQLConfigService {
  private endpoint: string;
  
  constructor(@Inject(GRAPHQL_ENDPOINT) endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Retrieves the current GraphQL API endpoint.
   * 
   * @returns The current endpoint URL as a string.
   */
  getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Updates the GraphQL API endpoint with a new value.
   * 
   * @param newEndpoint - The new endpoint URL to be set.
   */
  setEndpoint(newEndpoint: string): void {
    this.endpoint = newEndpoint;
  }
}
