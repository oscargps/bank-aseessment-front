/* istanbul ignore file */

import dotenvConfig from 'dotenv';


interface Config {
  port: string;
  url: string;
  apiKey: string;
}


dotenvConfig.config({ path: '.env' });

const config: Config = {
  port: `${process.env.VITE_PORT}`,   
  url: `${process.env.VITE_URL}`,
  apiKey: `${process.env.VITE_API_KEY}`, 
};

export default config;
