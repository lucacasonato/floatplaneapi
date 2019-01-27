import { parseEvent } from "./helpers/parseEvent";
import { authenticatedPost } from "./helpers/authenticatedRequest";
import { response, responseError, responseInternalServerError } from "./helpers/response";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        if (request.method === "OPTIONS") {
            return response(200, {})
        }
        
        if (!request.body || !request.body.commentGUID) {
            return responseError(400, "commentGUID not specified")
        }

        var resp = null
        try {
            resp = await authenticatedPost(`https://www.floatplane.com/api/video/comment/interaction/clear`, {
                commentGUID: request.body.commentGUID
            }, request.auth_token)
        } catch (err) {
            resp = err.response
        }
            
        return response(resp.status, resp.data) 
    } catch(e) {
        return responseInternalServerError()
    }
}