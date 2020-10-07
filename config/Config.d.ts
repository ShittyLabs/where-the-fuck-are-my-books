/* tslint:disable */
/* eslint-disable */
declare module 'node-config-ts' {
  interface IConfig {
    mongodb: Mongodb;
  }
  interface Mongodb {
    connectionString: string;
  }
  export const config: Config;
  export type Config = IConfig;
}
