import axios from "axios";

export const authenticatedGet = (url, authorization) => {
    return axios.get(url, {
        headers: {
            Cookie: `sails.sid=${encodeURIComponent(authorization)}`
        }
    })
}

export const authenticatedPost = (url, body, authorization) => {
    return axios.post(url, body, {
        headers: {
            Cookie: `sails.sid=${encodeURIComponent(authorization)}`
        }
    })
}