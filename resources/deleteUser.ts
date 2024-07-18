interface DeletePatientPayload {
    id: string;
}

module.exports = async (event, dynamoDbClient) => {
    let body: DeletePatientPayload;

    // Parse the body
    try {
        body = JSON.parse(event.body);

        // Validate the body
        if (!body.id || typeof body.id !== 'string' || body.id.length === 0) {
            throw new Error('Missing or invalid id');
        }
    } catch (error) {
        console.log(error);

        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Invalid JSON body',
                message: 'An error occured',
                payload: {},
            }),
        };
    }

    // Attempt to create the entry
    try {
        const dbPayload = {
            TableName: 'Users',
            Key: {
                id: body.id,
            },
            ReturnValues: 'ALL_OLD',
        };

        const dbResult = await dynamoDbClient.delete(dbPayload).promise();

        if (!dbResult.Attributes) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Could not find the relevant user to delete',
                    error: true,
                    payload: {},
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Successfully deleted',
                error: false,
                payload: dbResult.Attributes,
            }),
        };
    } catch (error) {
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error,
                message: 'An error occured',
                payload: {},
            }),
        };
    }
};
