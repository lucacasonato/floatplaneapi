import { parseEvent } from "./helpers/parseEvent";
import { authenticatedGet } from "./helpers/authenticatedRequest";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        var resp = null
        try {
            resp = await authenticatedGet(`https://www.floatplane.com/api/user/administrator`, request.auth_token, request.queryStringParameters)
        } catch (err) {
            resp = err.response
        }

        console.log(resp)
            
        return {
            statusCode: resp.status,
            body: JSON.stringify(resp.data)
        }    
    } catch(e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "internal server error"
            })
        }    
    }
}