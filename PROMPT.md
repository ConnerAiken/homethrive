# User CRUD Microservice Development Challenge

## Objective

Develop a CRUD (Create, Read, Update, Delete) microservice named "User" deployable on AWS Lambda, accessible via AWS API Gateway, utilizing the Serverless framework for setup and deployment.

### Functional Requirements

CRUD Operations:

-   Create: Enable the addition of a new user with fields like UserID, Name, Email, DOB, and other pertinent fields.
-   Read: Fetch user information based on UserID.
-   Update: Modify existing user details using UserID.
-   Delete: Remove a user record based on UserID.

#### Data Store: Leverage AWS DynamoDB as the data repository.

Craft a performant table design and employ secondary indexes if necessary for optimizing queries.

#### API Endpoints: Construct RESTful API endpoints using AWS API Gateway:

-   `/users (POST)` - To add a new user
-   `/users/{UserID} (GET)` - To
    retrieve details of a user.
-   `/users/{UserID} (PUT)` - To update details
    of a user
-   `/users/{UserID} (DELETE)` - To delete a user.

#### Error Handling

Implement thorough error handling. The service must return descriptive error messages and suitable HTTP status codes for various types of errors.

### Technical Requirements:

#### Framework

Utilize the Serverless framework for setting up, local testing, and deploying the microservice to AWS Lambda and AWS API Gateway.

#### Development Language

The microservice must be developed in either Node.js/TypeScript. Ensure compatibility with the chosen language's runtime on AWS Lambda and integration with the Serverless framework.

#### Deployment

The microservice must be deployable using the serverless deploy command or an equivalent command specific to your setup.

#### Testing

Incorporate unit tests for the service. For Node.js, consider using libraries like Jest or Mocha. Think about using mock frameworks to simulate DynamoDB during tests.

## Submission Guidelines

-   Commit the finalized code into a repository on GitHub, Bitbucket, or a similar platform.

-   Share the repository link with our team for evaluation.

-   Alongside the code, please provide a concise README.md detailing:

    -   API endpoints and their functionalities.

    -   Instructions for deploying the service using the Serverless framework.

    -   Guidelines on executing the tests.

## Timeline

This assignment should be accomplished and submitted within one week from its assignment date.
