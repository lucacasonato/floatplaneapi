import { parseEvent } from "./helpers/parseEvent";
import { authenticatedGet } from "./helpers/authenticatedRequest";
import { responseInternalServerError, response } from "./helpers/response";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        if (request.method === "OPTIONS") {
            return response(200, {})
        }
        
        var resp = null
        try {
            resp = await authenticatedGet(`https://www.floatplane.com/api/video/url`, request.auth_token, request.queryStringParameters)
        } catch (err) {
            resp = err.response
        }

        if (resp.status == 200) {
            return response(resp.status, resp.data.replace("/chunk.m3u8", ""))
        }
            
        return response(resp.status, resp.data) 
    } catch(e) {
        return responseInternalServerError()
    }
}