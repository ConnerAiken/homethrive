const getUser = require('./../resources/getUser');

describe('Get user actions GET->/users/{id}', () => {
    const baseRequest = {
        resource: '/users/{id}',
        httpMethod: 'GET',
    };

    test('We are able to get a user using the GET endpoint', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users/1',
            pathParameters: {
                id: '1',
            },
        };

        const responsePayload = await getUser(requestPayload, {
            get: jest.fn().mockReturnValue({
                promise: () => {
                    return {
                        Item: {
                            id: '1',
                            firstName: 'Conner',
                            lastName: 'Aiken',
                            email: 'conner@fittedtech.com',
                        },
                    };
                },
            }),
        });

        expect(responsePayload.statusCode).toBe(200);
        expect(responsePayload.payload).toMatchSnapshot();
    });

    test('We send the proper server status code when there is no record', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users/1',
            pathParameters: {
                id: '1',
            },
        };

        const responsePayload = await getUser(requestPayload, {
            get: jest.fn().mockReturnValue({
                promise: () => {
                    return {};
                },
            }),
        });

        expect(responsePayload.statusCode).toBe(404);
        expect(responsePayload.body).toContain('Could not find a user');
        expect(responsePayload.body).toMatchSnapshot();
    });

    test('We send the proper server status code when there is missing information', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users/1',
            pathParameters: {},
        };

        const responsePayload = await getUser(requestPayload, {
            get: jest.fn().mockReturnValue({
                promise: () => {
                    return {};
                },
            }),
        });

        expect(responsePayload.statusCode).toBe(400);
        expect(responsePayload.body).toContain('Invalid path parameter');
        expect(responsePayload.body).toMatchSnapshot();
    });

    test('We handle generic errors properly', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users/1',
            pathParameters: {
                id: '1',
            },
        };

        const responsePayload = await getUser(requestPayload, {
            get: jest.fn().mockReturnValue({
                promise: () => {
                    throw new Error('Simulated error');
                },
            }),
        });

        expect(responsePayload.statusCode).toBe(500);
        expect(responsePayload.body).toContain('An error occured');
        expect(responsePayload.body).toMatchSnapshot();
    });
});
