import axios from "axios";
import { stringify } from "querystring";

export const authenticatedGet = (url: string, authorization: string, queryOptions?: { [name: string]: string[] }) => {
    console.log(stringify(queryOptions))
    return axios.get(queryOptions ? `${url}?${stringify(queryOptions)}` : url, {
        headers: {
            Cookie: `sails.sid=${encodeURIComponent(authorization)}`
        }
    })
}

export const authenticatedPost = (url: string, body: any, authorization: string, queryOptions?: { [name: string]: string[] }) => {
    return axios.post(queryOptions ? `${url}?${stringify(queryOptions)}` : url, body, {
        headers: {
            Cookie: `sails.sid=${encodeURIComponent(authorization)}`
        }
    })
}