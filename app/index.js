const express = require("express");
const health = require("@cloudnative/health-connect");

const app = express();
const healthCheck = new health.HealthChecker();

app.use("/live", health.LivenessEndpoint(healthCheck));
app.use("/ready", health.ReadinessEndpoint(healthCheck));
app.use("/health", health.HealthEndpoint(healthCheck));

const startPromise = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    // Run startup checks
    resolve();
  }, 1000);
});
const startCheck = new health.StartupCheck("startCheck", startPromise);
healthCheck.registerStartupCheck(startCheck);

let live = true;

const livePromise = () => new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   // Check systems
  console.log(`Systems are live: ${live}`);
  if (live) resolve();
  else reject("died");
  // }, 500);
});
const liveCheck = new health.LivenessCheck("liveCheck", livePromise);
healthCheck.registerLivenessCheck(liveCheck);

// const shutdownPromise = () => new Promise(function (resolve, _reject) {
//   setTimeout(function () {
//     console.log('DONE!');
//     resolve();
//   }, 10);
// });
// let shutdownCheck = new health.ShutdownCheck("shutdownCheck", shutdownPromise);
// healthCheck.registerShutdownCheck(shutdownCheck);

// const shutdownPromise = () => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // Cleaning up system
//     console.log("Shutting down");
//     resolve();
//   }, 1000);
// });
// const shutdownCheck = new health.ShutdownCheck("shutdownCheck", shutdownPromise);
// healthCheck.registerShutdownCheck(shutdownCheck);
// healthCheck.onShutdownRequest(() => {
//   console.log("Shutdown requested");
// });

setInterval(() => {
  if (Math.random() * 100 > 75) {
    // Crash
    live = false;
    console.log("Boom")
  }
}, 10000);

const PORT = process.env.PORT || 8080;

app.get("/hello", (req, res) => {
  res.send({ value: "hello" }).status(200);
});

app.get("/addtwo/:num", (req, res) => {
  res.send({ value: parseInt(req.params.num, 10) + 2 }).status(200);
});

app.get("/addthree/:num", (req, res) => {
  res.send({ value: parseInt(req.params.num, 10) + 3 }).status(200);
});

app.get("/error", (req, res) => {
  res.send("Error!").status(500);
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`); // eslint-disable-line no-console
});

module.exports = app;
