export const parseEvent = (event: AWSLambda.APIGatewayEvent): { auth_token: string, body: any, queryStringParameters: { [name: string]: string[] }, method: string } => {
    var parsedBody = null
    try {
        var body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body
        parsedBody = JSON.parse(body)
    } catch (err) {
        if (!(err instanceof SyntaxError)) {
            throw err
        }
    }

    const auth_token = event.headers["x-fpapi-token"]
    const queryStringParametersUnparsed = event.queryStringParameters

    var queryStringParameters: { [name: string]: string[] } =  {}

    for (const id of Object.keys(queryStringParametersUnparsed)) {
        queryStringParameters[id] = queryStringParametersUnparsed[id].split(",")
    }

    var method = event.httpMethod

    return {
        auth_token: auth_token,
        body: parsedBody,
        queryStringParameters,
        method,
    }
}