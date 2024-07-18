const deleteUser = require('./../resources/deleteUser');

describe('Delete user actions DELETE->/users/', () => {
    const baseRequest = {
        resource: '/users',
        httpMethod: 'DELETE',
    };

    test('We are able to delete a user using the DELETE endpoint', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify({
                id: '1',
            }),
        };

        const responsePayload = await deleteUser(requestPayload, {
            delete: jest.fn().mockReturnValue({
                promise: () => {
                    return {
                        Attributes: {
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
        expect(responsePayload.body).toContain('Successfully deleted');
        expect(JSON.parse(responsePayload.body)).toMatchSnapshot();
    });

    test('We send the proper server status code when there is an invalid body JSON', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: 'invalid json',
        };

        const responsePayload = await deleteUser(requestPayload, {
            get: jest.fn(),
        });

        expect(responsePayload.statusCode).toBe(400);
        expect(responsePayload.body).toContain('Invalid JSON body');
    });

    test('We send the proper server status code when we cannot find the record to delete', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify({
                id: '123',
            }),
        };

        const responsePayload = await deleteUser(requestPayload, {
            delete: jest.fn().mockReturnValue({
                promise: () => {
                    return {};
                },
            }),
        });

        expect(responsePayload.statusCode).toBe(404);
        expect(responsePayload.body).toContain(
            'Could not find the relevant user'
        );
        expect(responsePayload.body).toMatchSnapshot();
    });

    test('We handle generic errors properly', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify({
                id: '1',
            }),
        };

        const responsePayload = await deleteUser(requestPayload, {
            delete: jest.fn().mockReturnValue({
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
