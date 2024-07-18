const AWS = require('aws-sdk');
const uuid = require('uuid');
const dayjs = require('dayjs');

const crudRequestMap = {
    GET: {
        '/users/{id}': require('./resources/getUser'),
    },
    POST: {
        '/users': require('./resources/createUser'),
    },
    PUT: {
        '/users': require('./resources/updateUser'),
    },
    DELETE: {
        '/users': require('./resources/deleteUser'),
    },
};

module.exports.process = async (event) => {
    try {
        const crudFunc = crudRequestMap?.[event.httpMethod]?.[event.resource];

        if (!crudFunc) {
            console.log(
                'No resource/method found for ' +
                    event.httpMethod +
                    '->' +
                    event.resource
            );
            return {
                statusCode: 501,
                body: {
                    message: 'An error occured',
                    payload: {},
                    error: 'This request method or resource has not been implemented',
                },
            };
        }

        return crudFunc(
            event,
            new AWS.DynamoDB.DocumentClient(),
            dayjs,
            uuid.v4
        );
    } catch (error) {
        console.log('Unknown error', error);

        return {
            statusCode: 500,
            body: {
                message: 'An error occured',
                payload: {},
                error: 'An unknown error occured in the handler',
            },
        };
    }
};
