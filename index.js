const app = require("./app");

app.listen(process.env.PORT, function () {
  console.log(`Application is Running on port: ${process.env.PORT}`);
});
