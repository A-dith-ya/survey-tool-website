// Declare explicit types for cooki-parser
declare module "cookie-parser" {
  import { RequestHandler } from "express";

  function cookieParser(
    secret?: string,
    options?: cookieParser.CookieParseOptions
  ): RequestHandler;
  namespace cookieParser {}

  export = cookieParser;
}
