import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const requestKey = req.headers.get("FACEIT");
  const apiKey = Netlify.env.get("FACEIT"); // should be okay

  if(requestKey === apiKey) {
    return new Response("Got request from faceit: " + req)
  }
  return new Response("Sorry, no access for you.", { status: 401 })
}