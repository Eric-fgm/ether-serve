import { ether, serve } from "@ether-serve/node";

const app = ether();

app.use(async (c, next) => {
  console.log("middleware", c.req.path);
  await next();
  console.log("after middleware", c.req.path);
});

app.get("/", (c) => {
  return c.status(200).text("Hello World");
});

serve({
  fetch: app.fetch.bind(app),
});
