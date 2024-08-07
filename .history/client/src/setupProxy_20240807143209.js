// const proxy = require("http-proxy-middleware");

// const target = "http://localhost:5000/";

// module.exports = (app) => {
//   app.use(
//     proxy("/api", {
//       target,
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     proxy("/socket.io", {
//       target,
//       changeOrigin: true,
//       ws: true,
//     })
//   );
// };
