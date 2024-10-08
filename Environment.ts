import dotenv from "dotenv";
dotenv.config();

export type Environmnent = "development" | "production";
export class BaseEnvironment {
  defaultEnvironmentValues = {
    DATABASE_URL: "file:./ZipFeast.db",
    PORT: 3000,
    HOST: "http://localhost",
  };
  get environment(): Environmnent {
    return process.env.NODE_ENV as Environmnent;
  }

  get DATABASE_URL(): string {
    return (
      process.env.DATABASE_URL! || this.defaultEnvironmentValues.DATABASE_URL
    );
  }

  get PORT(): number {
    return parseInt(process.env.PORT!) || this.defaultEnvironmentValues.PORT;
  }

  get HOST(): string {
    return process.env.HOST! || this.defaultEnvironmentValues.HOST;
  }
}
