import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const secretHeaderName = process.env.SECRET_HEADER;
  if(!secretHeaderName) {
    return new Response("Please provide secret header in env variables.", { status: 500 })
  }

  const requestKey = req.headers.get(secretHeaderName);
  if(!requestKey) {
    return new Response("Please provide request key in headers.", { status: 401 })
  }

  const apiKey = process.env[secretHeaderName];
  if(requestKey !== apiKey) {
    return new Response("Sorry, no access for you.", { status: 401 })
  }

  console.log(req.body)

  return new Response("Got request from faceit: " + req.body)
}



export const config: Config = {
  path: "/faceit"
}