interface CreatePatientPayload {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
}

module.exports = async (event, dynamoDbClient, dayjs, uuidv4) => {
    let body: CreatePatientPayload;

    // Parse the body
    try {
        body = JSON.parse(event.body);

        // Validate the body
        ['firstName', 'lastName', 'email', 'dob'].forEach((key: string) => {
            if (
                !body[key] ||
                typeof body[key] !== 'string' ||
                body[key].length === 0
            ) {
                throw new Error('Missing or invalid body value: ' + key);
            }

            if (key === 'dob' && !dayjs(body[key]).isValid()) {
                throw new Error('Invalid date format');
            }
        });
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
            Item: {
                ...body,
                id: uuidv4(),
            },
        };

        await dynamoDbClient.put(dbPayload).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                error: false,
                message: 'Successfully created the user',
                payload: dbPayload.Item,
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
