const express = require("express");
const next = require("next");
const helmet = require("helmet");
const compression = require("compression");
const pinoLogger = require("pino");
const pinoMiddleware = require("pino-http");
const pinoStackdriver = require("pino-stackdriver-serializers");
const opencensus = require("@opencensus/core");
const tracing = require("@opencensus/nodejs");
const stackdriver = require("@opencensus/exporter-stackdriver");
const propagation = require("@opencensus/propagation-stackdriver");

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const logger = pinoLogger({
  messageKey: "message",
  level: "info",
  base: null,
  prettyPrint: {
    doSomething: true
  },
  prettifier: pinoStackdriver.sdPrettifier
});

if (process.env.ENABLE_STACKDRIVER) {
  const stats = new opencensus.Stats();
  const sse = new stackdriver.StackdriverStatsExporter({
    projectId: GOOGLE_PROJECT
  });
  stats.registerExporter(sse);

  const sp = propagation.v1;
  const ste = new stackdriver.StackdriverTraceExporter({
    projectId: GOOGLE_PROJECT
  });
  const tracer = tracing.start({
    samplingRate: 1,
    logger: logger,
    exporter: ste,
    propagation: sp
  }).tracer;

  tracer.startRootSpan({ name: "init" }, rootSpan => {
    for (let i = 0; i < 1000000; i++) {}

    rootSpan.end();
  });
}

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get("/healthz", (req, res) => {
    return "ok";
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
