import corsHeaders from "./corsHeaders";
import { stat } from "fs";

export const response = (status: number, body?: any, headers?: { [name: string]: string}): AWSLambda.APIGatewayProxyResult  => {
    return {
        statusCode: status,
        body: JSON.stringify(body),
        headers: {
            ...corsHeaders,
            ...headers
        }
    }
}

export const responseError = (status: number, error: string, error_details?: any): AWSLambda.APIGatewayProxyResult => {
    return response(status, {
        error,
    })
}

export const responseInternalServerError = (): AWSLambda.APIGatewayProxyResult => {
    return responseError(500, "internal server error")
}