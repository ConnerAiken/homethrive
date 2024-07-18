interface UpdatePatientPayload {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
}

module.exports = async (event, dynamoDbClient, dayjs) => {
    let body: UpdatePatientPayload;

    // Parse the body
    try {
        body = JSON.parse(event.body);

        ['firstName', 'lastName', 'email', 'dob', 'id'].forEach(
            (key: string) => {
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
            }
        );
    } catch (error) {
        console.log(error);

        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'An error occured',
                payload: {},
                error: 'Invalid JSON body',
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
            UpdateExpression:
                'set email = :email, firstName = :firstName, lastName = :lastName, dob = :dob',
            ExpressionAttributeValues: {
                ':email': body.email,
                ':firstName': body.firstName,
                ':lastName': body.lastName,
                ':dob': body.dob,
            },
            ReturnValues: 'UPDATED_NEW',
        };

        const dbResponse = await dynamoDbClient.update(dbPayload).promise();

        if (!dbResponse?.Attributes?.id) {
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
                message: 'Successfully updated the user',
                payload: dbResponse.Attributes,
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
