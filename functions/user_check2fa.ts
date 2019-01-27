import axios from "axios";
import setCookieParser from "set-cookie-parser";
import { parseEvent } from "./helpers/parseEvent";
import { authenticatedPost } from "./helpers/authenticatedRequest";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        var resp = null
        try {
            resp = await authenticatedPost("https://www.floatplane.com/api/auth/checkFor2faLogin", request.body, request.auth_token)
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