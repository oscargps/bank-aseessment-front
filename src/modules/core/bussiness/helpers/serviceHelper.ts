import config from "../../../../config"


type Props = {
    method: METHODS
    url: string,
    body?: any
    headers?: Record<string, string>
}

export enum METHODS {
    POST = 'POST',
    GET = 'GET',
}

export const RequestService = async (props: Props) => {
    const { url, body, headers, method } = props
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${config.apiKey}`,
            ...headers,
        },
        body: body ? JSON.stringify(body) : null,
    })
        .then(response =>
            response.json()
        )
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}