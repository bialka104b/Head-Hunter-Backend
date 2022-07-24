export interface Config {
  app: {
    port: number;
  };

  db: {
    port: number;
    host: string;
    user: string;
    password: string;
    database: string;
  };
}
