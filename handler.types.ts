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
        dynamoDbClient: DynamoDB.DocumentClient,
        dayjs: any,
        uuidv4: any
    ): Promise<APIGatewayProxyResult>;
}
