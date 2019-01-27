export const parseEvent = (event: AWSLambda.APIGatewayEvent): { auth_token: String, body: any } => {
    var parsedBody = null
    try {
        var body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body
        parsedBody = JSON.parse(body)
    } catch (err) {
        if (!(err instanceof SyntaxError)) {
            throw err
        }
    }

    var auth_token = event.headers["x-fpapi-token"]

    return {
        auth_token: auth_token,
        body: parsedBody
    }
}