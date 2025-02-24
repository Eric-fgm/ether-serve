export default {
  index: {
    display: "hidden",
  },
  docs: {
    type: "page",
    title: "Documentation",
    items: {
      index: "",
      _: {
        type: "separator",
        title: "Getting Started",
      },
      installation: "",
      "quick-start": "",
      typescript: "",
      __: {
        type: "separator",
        title: "API Reference",
      },
      app: "",
      routing: "",
      context: "",
      "error-handling": "",
      ___: {
        type: "separator",
        title: "Guides",
      },
      middleware: "",
    },
  },
  versions: {
    type: "menu",
    title: "Versions",
    items: {
      _1: {
        title: "Ether Serve v1",
        href: "/docs",
      },
    },
  },
};
