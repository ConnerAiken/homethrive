# The "User" Service

The "User" service is a serverless AWS Lambda function paired with API Gateway. It is a RESTful API with four endpoints:

-   `/users (POST)` - To add a new user
-   `/users/{UserID} (GET)` - To retrieve details of a user.
-   `/users/{UserID} (PUT)` - To update details of a user
-   `/users/{UserID} (DELETE)` - To delete a user.

For more details on the business/technical requirements of the service, see PROMPT.md

## Usage

If this is your first time developing a serverless framework application, follow the getting started guide to setup your CLI and get a lay of the land: https://www.serverless.com/framework/docs/getting-started

### Testing

To make testing easier, I've included a Postman collection in the root of this repo. You can import it and try it out with https://www.postman.com/

You will need to adjust the API Gateway URL and the body/parameter payloads in the requests. They make use of an "id" path/body parameter.

I test in the following order:

-   Creation API call
-   Fetch API call
-   Update API call
-   Fetch API call
-   Delete API call
-   Fetch API call

This service also includes unit tests, which can be ran with: `npm test` once `npm install` is run.

### Deployment

In order to deploy the example, you need to run the following command:

```
npm install
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "User" to stage "dev" (us-east-1)

✔ Service deployed to stack User-dev (62s)

endpoints:
  GET - https://qkugf08cwb.execute-api.us-east-1.amazonaws.com/dev/users/{id}
  POST - https://qkugf08cwb.execute-api.us-east-1.amazonaws.com/dev/users
  DELETE - https://qkugf08cwb.execute-api.us-east-1.amazonaws.com/dev/users
  PUT - https://qkugf08cwb.execute-api.us-east-1.amazonaws.com/dev/users
functions:
  handleUser: User-dev-handleUser (7.1 MB)
```

### Local development

The easiest way to develop and test your function is to use the `dev` command:

```
npm install
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.
