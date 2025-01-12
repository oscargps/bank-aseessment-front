/* istanbul ignore file */



interface Config {
  port: string;
  url: string;
  apiKey: string;
}



const config: Config = {
  port: (import.meta.env.VITE_PORT as string || ''),
  url: (import.meta.env.VITE_URL as string || ''),
  apiKey: (import.meta.env.VITE_API_KEY as string || ''),
};

export default config;
