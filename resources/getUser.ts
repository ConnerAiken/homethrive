module.exports = async (event, dynamoDbClient) => {
    // Validate the params
    try {
        if (!event.pathParameters.id || event.pathParameters.id.length === 0) {
            throw new Error('Missing or invalid id');
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Invalid path parameter',
            }),
        };
    }

    // Attempt to create the entry
    try {
        const dbPayload = {
            TableName: 'Users',
            Key: {
                id: event.pathParameters.id,
            },
        };

        const dbResponse = await dynamoDbClient.get(dbPayload).promise();

        if (!dbResponse?.Item?.id) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Could not find a user with the provided id',
                    error: true,
                    payload: {},
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                error: false,
                message: 'Successfully fetched the user',
                payload: dbResponse.Item,
            }),
        };
    } catch (error) {
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'An error occured',
                payload: {},
                error,
            }),
        };
    }
};
