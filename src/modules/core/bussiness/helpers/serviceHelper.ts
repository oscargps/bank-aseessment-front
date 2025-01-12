import config from "../../../../config";

type Props = {
  method: METHODS;
  url: string;
  body?: any;
  headers?: Record<string, string>;
};

export enum METHODS {
  POST = "POST",
  GET = "GET",
}

export const RequestService = async (props: Props) => {
  const { url, body, headers, method } = props;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${config.apiKey}`,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
