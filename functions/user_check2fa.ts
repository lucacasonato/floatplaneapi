import { parseEvent } from "./helpers/parseEvent";
import { authenticatedPost } from "./helpers/authenticatedRequest";
import { response, responseInternalServerError } from "./helpers/response";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        if (request.method === "OPTIONS") {
            return response(200, {})
        }
        
        var resp = null
        try {
            resp = await authenticatedPost("https://www.floatplane.com/api/auth/checkFor2faLogin", request.body, request.auth_token)
        } catch (err) {
            resp = err.response
        }
            
        return response(resp.status, resp.data) 
    } catch(e) {
        return responseInternalServerError()
    }
}