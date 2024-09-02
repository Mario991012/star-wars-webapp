import { Injectable, Inject, InjectionToken } from '@angular/core';

export const GRAPHQL_ENDPOINT = new InjectionToken<string>('GRAPHQL_ENDPOINT');

@Injectable({
  providedIn: 'root',
})
export class GraphQLConfigService {
  private endpoint: string;

  constructor(@Inject(GRAPHQL_ENDPOINT) endpoint: string) {
    this.endpoint = endpoint;
  }

  getEndpoint(): string {
    return this.endpoint;
  }

  setEndpoint(newEndpoint: string): void {
    this.endpoint = newEndpoint;
  }
}
