import { parseEvent } from "./helpers/parseEvent";
import { authenticatedGet } from "./helpers/authenticatedRequest";
import { responseInternalServerError, response } from "./helpers/response";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        var resp = null
        try {
            resp = await authenticatedGet(`https://www.floatplane.com/api/user/creator`, request.auth_token, request.queryStringParameters)
        } catch (err) {
            resp = err.response
        }

        console.log(resp)
            
        return response(resp.status, resp.data)
    } catch(e) {
        return responseInternalServerError() 
    }
}