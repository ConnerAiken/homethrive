const updateUser = require('./../resources/updateUser');

describe('Update user actions PUT->/users/', () => {
    const user = {
        id: '123',
        firstName: 'Conner',
        lastName: 'Aiken',
        email: 'conner@fittedtech.com',
        dob: '06/02/1993',
    };
    const baseRequest = {
        resource: '/users',
        httpMethod: 'PUT',
    };

    test('We are able to update a user using the PUT endpoint', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify(user),
        };

        const responsePayload = await updateUser(
            requestPayload,
            {
                update: jest.fn().mockReturnValue({
                    promise: () => {
                        return {
                            Attributes: user,
                        };
                    },
                }),
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            })
        );

        expect(responsePayload.statusCode).toBe(200);
        expect(responsePayload.body).toContain('Successfully updated');
        expect(JSON.parse(responsePayload.body)).toMatchSnapshot();
    });

    test('We send the proper server status code when there is an invalid body JSON', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: 'invalid json',
        };

        const responsePayload = await updateUser(
            requestPayload,
            {
                update: jest.fn().mockReturnValue({
                    promise: () => {
                        return {};
                    },
                }),
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            })
        );

        expect(responsePayload.statusCode).toBe(400);
        expect(responsePayload.body).toContain('Invalid JSON body');
    });

    test('We send the proper server status code when there is no relevant user', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify(user),
        };

        const responsePayload = await updateUser(
            requestPayload,
            {
                update: jest.fn().mockReturnValue({
                    promise: () => {
                        return {};
                    },
                }),
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            })
        );

        expect(responsePayload.statusCode).toBe(404);
        expect(responsePayload.body).toContain('Could not find a user');
        expect(JSON.parse(responsePayload.body)).toMatchSnapshot();
    });

    test('We handle generic errors properly', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify(user),
        };

        const responsePayload = await updateUser(
            requestPayload,
            {
                update: jest.fn().mockReturnValue({
                    promise: () => {
                        throw new Error('Simulated error');
                    },
                }),
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            })
        );

        expect(responsePayload.statusCode).toBe(500);
        expect(responsePayload.body).toContain('An error occured');
        expect(responsePayload.body).toMatchSnapshot();
    });
});
