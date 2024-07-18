import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

export interface CrudRequestMap {
    GET: {
        [key: string]: any;
    };
    POST: {
        [key: string]: any;
    };
    PUT: {
        [key: string]: any;
    };
    DELETE: {
        [key: string]: any;
    };
}

export interface ResourceHandlerParams {
    (
        event: APIGatewayProxyEvent,
        dynamoDbClient: DynamoDB.DocumentClient, // replace with the appropriate type for dynamoDbClient
        dayjs: any, // replace with the appropriate type for dayjs
        uuidv4: any // replace with the appropriate type for uuidv4
    ): Promise<APIGatewayProxyResult>;
}
