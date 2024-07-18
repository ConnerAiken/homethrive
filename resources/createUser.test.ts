const createUser = require('./../resources/createUser');

describe('Create user actions POST->/users/', () => {
    const baseRequest = {
        resource: '/users',
        httpMethod: 'POST',
    };

    const user = {
        firstName: 'Conner',
        lastName: 'Aiken',
        email: 'conner@fittedtech.com',
        dob: '06/02/1993',
    };

    test('We are able to create a user using the POST endpoint', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify(user),
        };

        const responsePayload = await createUser(
            requestPayload,
            {
                put: (createPayload) => {
                    // Validate we are creating a unique id
                    expect(createPayload.Item.id).toBe('123');

                    return {
                        promise: () => {
                            return {
                                Item: {
                                    id: createPayload.Item.id,
                                    firstName: 'Conner',
                                    lastName: 'Aiken',
                                    email: 'conner@fittedtech.com',
                                    dob: '06/02/1993',
                                },
                            };
                        },
                    };
                },
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            }),
            () => {
                return '123';
            }
        );

        expect(responsePayload.statusCode).toBe(200);
        expect(responsePayload.body).toContain('Successfully created');
        expect(JSON.parse(responsePayload.body)).toMatchSnapshot();
    });

    test('We send the proper server status code when there is an invalid body JSON', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: 'invalid json',
        };

        const responsePayload = await createUser(
            requestPayload,
            {
                put: jest.fn(),
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            }),
            () => {
                return '123';
            }
        );

        expect(responsePayload.statusCode).toBe(400);
        expect(responsePayload.body).toContain('Invalid JSON body');
    });

    test('We send the proper server status code when there is missing keys', async () => {
        Object.keys(user).forEach(async (key) => {
            const newUser = { ...user };
            delete newUser[key];

            const requestPayload = {
                ...baseRequest,
                path: '/users',
                body: JSON.stringify(newUser),
            };

            const responsePayload = await createUser(
                requestPayload,
                {
                    put: jest.fn(),
                },
                jest.fn().mockReturnValue({
                    isValid: () => true,
                }),
                () => {
                    return '123';
                }
            );

            expect(responsePayload.statusCode).toBe(400);
            expect(responsePayload.body).toContain('Invalid JSON body');
        });
    });

    test('We handle generic errors properly', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify({
                ...user,
            }),
        };

        const responsePayload = await createUser(
            requestPayload,
            {
                put: jest.fn().mockReturnValue({
                    promise: () => {
                        throw new Error('Simulated error');
                    },
                }),
            },
            jest.fn().mockReturnValue({
                isValid: () => true,
            }),
            () => {
                return '123';
            }
        );

        expect(responsePayload.statusCode).toBe(500);
        expect(responsePayload.body).toContain('An error occured');
        expect(responsePayload.body).toMatchSnapshot();
    });

    test('We can detect invalid date formats', async () => {
        const requestPayload = {
            ...baseRequest,
            path: '/users',
            body: JSON.stringify({
                ...user,
                dob: 'INVALID_DATE',
            }),
        };

        const responsePayload = await createUser(
            requestPayload,
            {
                put: jest.fn().mockReturnValue({
                    promise: () => {
                        throw new Error('Simulated error');
                    },
                }),
            },
            jest.fn().mockReturnValue({
                isValid: () => false,
            }),
            () => {
                return '123';
            }
        );

        expect(responsePayload.statusCode).toBe(400);
        expect(responsePayload.body).toContain('Invalid JSON');
        expect(JSON.parse(responsePayload.body)).toMatchSnapshot();
    });
});
