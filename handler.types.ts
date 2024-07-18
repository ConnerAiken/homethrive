import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export interface CrudRequestMap {
    GET?: {
        [key: string]: (
            event: APIGatewayProxyEvent
        ) => Promise<APIGatewayProxyResult>;
    };
    POST?: {
        [key: string]: (
            event: APIGatewayProxyEvent
        ) => Promise<APIGatewayProxyResult>;
    };
    PUT?: {
        [key: string]: (
            event: APIGatewayProxyEvent
        ) => Promise<APIGatewayProxyResult>;
    };
    DELETE?: {
        [key: string]: (
            event: APIGatewayProxyEvent
        ) => Promise<APIGatewayProxyResult>;
    };
}
