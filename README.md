# Ether Serve

![License](https://img.shields.io/github/license/Eric-fgm/ether-serve)
![Version](https://img.shields.io/npm/v/ether-serve)
![Build Status](https://img.shields.io/github/actions/workflow/status/your-repo/ether-serve/build.yml)

A lightweight and high-performance HTTP framework for building scalable APIs and real-time applications with ease.

## Features

- 🔑 Simple Routing: Intuitive way to define routes and handle HTTP methods.
- 🔄 Middleware Support: Flexible middleware system for handling requests, responses, and errors.
- 🛡️ Built-in Error Handling: Automatically handles HTTP exceptions and errors.
- 📌 Fast Performance: Optimized for high-performance applications, leveraging Node.js’s non-blocking architecture.

## Installation

```sh
npm install ether-serve
```

## Usage

### Importing the Library

```javascript
import { ether, serve } from "@ether-serve/node";

const app = ether();

app.get("/", (c) => {
  return c.status(200).text("Hello World");
});

serve({
  fetch: app.fetch.bind(app),
});
```

### Middlewares

```javascript
//...

app.use(async (c, next) => {
  console.log(c.req.url);
  await next();
});
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
