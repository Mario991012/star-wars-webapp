import { Injectable } from '@angular/core';
import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { environment } from '../../../../environments/environment';

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

  public setEndpoint(url: string) {
    this.client.setLink(new HttpLink({ uri: url }));
  }

  public getClient() {
    return this.client;
  }

  public executeQuery(query: DocumentNode, variables?: any) {
    return this.client.query({
      query,
      variables,
    });
  }
}
