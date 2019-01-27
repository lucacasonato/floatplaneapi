import axios from "axios";
import setCookieParser from "set-cookie-parser";
import { parseEvent } from "./helpers/parseEvent";
import corsHeaders from "./helpers/corsHeaders";

export const handler = async (event: AWSLambda.APIGatewayEvent, context: any) => {
    try {
        const request = parseEvent(event)

        if (!request.body || !request.body.username || !request.body.password) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "username or password not supplied or misformed"
                })
            }
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
                return {
                    statusCode: 401,
                    body: JSON.stringify({
                        error: "username or password incorrect"
                    })
                }
            } else {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        error: "bad response from floatplane",
                        error_details: resp.data
                    })
                }
            }
        }
    
        let needs2FA = resp.data.needs2FA
    
        let cookies = setCookieParser(resp.headers["set-cookie"])
        let sailssid = cookies.filter(c => c.name === "sails.sid")
        let authorization = sailssid[0].value
    
        return {
            statusCode: 200,
            body: JSON.stringify({
                needs2FA,
                authorization
            })
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