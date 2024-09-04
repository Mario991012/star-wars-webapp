# Star Wars Blog

Hi! My name is Mario Velasquez, and this is my Star Wars web application. This version uses:
- Angular 18.2.2
- GraphQL 
- Apollo Client
- Angular Material
- Boostrap

## Running the project
### Running tests
Run `ng test` to execute all the unit tests with Karma.
***All the components, services and pipes have their own unit tests.*** 

### Running locally
Run `ng serve` to run the application in the port 4200 as default.
### Building the project
Run `ng build` to build the application.

## Documentation
- All functions, components, services, pipes that have logic are documented using TSDoc, having a brief description of what the parameters, functionality and responses are.
- This was generated with AI and carefully reviewed by me in order to reduce documentation time while maintaining the quality of code and documentation.

## Architecture

The architecture follows the concept of the Onion Layer Architecture which define the separation of concerns. In the folder structure there is a separation between the presentation layer, data layer and core layer.
- **Presentation layer:** Responsible for interacting with the user and delivering the UI. Includes single components, layouts, pages, shared resources such as pipes and interfaces.
- **Data layer:** This layer deals with external dependencies like APIs, databases, or third-party services. It handles fetching, saving, and interacting with the outside. This has all the related with data manipulation, such as client implementations, related interfaces, services for specific clients, etc. *Here the GraphQL implementation with Apollo Client and all the mutations used.*
- **Core layer:** This layer contains the fundamental business logic of the web application. It is independent of external frameworks and libraries. This ensures that the most important logic is decoupled from infrastructure and technology concerns. Here the guards, configurations for the most important libraries, etc.

## Design decisions
Following the separation of concerns, I took the decision for this structure based on the domain of each one of the components and tools implemented. This will allow the project to grow in an organized and structured way.
### Presentation layer folder structure
- components
- interfaces
- layouts
- pages
- shared

### Data layer folder structure
- graphql
- auth
- Open to add more domains*

### Core layer folder structure
- guards
- interfaces
- services
- config

## Assets and environments
Outside the application related functionality, the assets where located to store fonts, multimedia resources, styles using SCSS, etc.

The global variables where separated based on the environment needed, using Angular's configuration.

- Development
- Production

## Technologies and tools

The decision to use these technologies was based on the simplicity, maintainability and experience that I actually have. This made the development to speed up a lot and bring a high quality code and UI made from scratch for this project.

- Angular Material: Library with ready to use components such as cards, inputs, etc.
- Bootstrap: Useful for the layout and grid system for responsiveness.
- ng-mocks: Allow to mock components needed for testing purposes.
- Apollo Client: Allows communication and easy configuration for GraphQL implementation.
- Angular CLI: Generate automatically components, services, pipes and more.
- Karma: Unit testing easy implementation and reporting.
- Reactive forms: Easy implementation of forms and reactiveness.