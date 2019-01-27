import axios from "axios";
import setCookieParser from "set-cookie-parser";
import { parseEvent } from "./helpers/parseEvent";
import corsHeaders from "./helpers/corsHeaders";
import { response, responseInternalServerError, responseError } from "./helpers/response";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any): Promise<AWSLambda.APIGatewayProxyResult> => {
    try {
        const request = parseEvent(event)

        if (request.method === "OPTIONS") {
            return response(200, {})
        }

        if (!request.body || !request.body.username || !request.body.password) {
            return responseError(400, "username or password not supplied or misformed", resp.data)
        }
    
        var resp = null
        try {
            resp = await axios.post("https://www.floatplane.com/api/auth/login", {
                username: request.body.username,
                password: request.body.password
            }, {})
        } catch (err) {
            resp = err.response
            if (resp.status === 401) {
                return responseError(401, "username or password incorrect", resp.data)
            } else {
                return responseError(500, "bad response from floatplane", resp.data)
            }
        }
        
        let cookies = setCookieParser(resp.headers["set-cookie"])
        let sailssid = cookies.filter(c => c.name === "sails.sid")
        let authorization = sailssid[0].value
    
        return response(200, {
            ...resp.data,
            authorization
        })
    } catch(e) {
        return responseInternalServerError()
    }
}