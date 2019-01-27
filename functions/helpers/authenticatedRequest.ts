import axios from "axios";
import { stringify } from "querystring";
import corsHeaders from "./corsHeaders";

export const authenticatedGet = (url: string, authorization: string, queryOptions?: { [name: string]: string }) => {
    return axios.get(queryOptions ? `${url}?${stringify(queryOptions)}` : url, {
        headers: {
            Cookie: `sails.sid=${encodeURIComponent(authorization)}`,
            ...corsHeaders
        }
    })
}

export const authenticatedPost = (url: string, body: any, authorization: string, queryOptions?: { [name: string]: string }) => {
    return axios.post(queryOptions ? `${url}?${stringify(queryOptions)}` : url, body, {
        headers: {
            Cookie: `sails.sid=${encodeURIComponent(authorization)}`,
            ...corsHeaders
        }
    })
}