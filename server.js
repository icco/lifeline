const express = require("express");
const next = require("next");
const helmet = require("helmet");
const expectCt = require("expect-ct");
const compression = require("compression");
const pinoLogger = require("pino");
const pinoMiddleware = require("pino-http");
const pinoStackdriver = require("pino-stackdriver-serializers");
const { globalStats } = require("@opencensus/core");
const tracing = require("@opencensus/nodejs");
const {
  StackdriverTraceExporter,
  StackdriverStatsExporter
} = require("@opencensus/exporter-stackdriver");
const propagation = require("@opencensus/propagation-stackdriver");
const {
  SSLMiddleware,
  NELMiddleware,
  ReportToMiddleware
} = require("@icco/react-common");

const GOOGLE_PROJECT = "icco-cloud";
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
  const sse = new StackdriverStatsExporter({
    projectId: GOOGLE_PROJECT
  });
  globalStats.registerExporter(sse);

  const sp = propagation.v1;
  const ste = new StackdriverTraceExporter({
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
  server.set("trust proxy", true);
  server.use(compression());
  server.use(pinoMiddleware({ logger }));
  server.use(NELMiddleware());
  server.use(ReportToMiddleware("life"));
  server.use(helmet());
  server.use(
    helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" })
  );

  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        upgradeInsecureRequests: true,
        defaultSrc: ["'self'", "https://graphql.natwelch.com/graphql"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com/"
        ],
        fontSrc: ["https://fonts.gstatic.com"],
        imgSrc: ["'self'", "https://a.natwelch.com", "https://icco.imgix.net"],
        scriptSrc: ["'self'", "'unsafe-eval'"],
        objectSrc: ["'none'"],
        reportUri: "https://reportd.natwelch.com/report/life",
        reportTo: "default"
      }
    })
  );

  server.use(expectCt({ maxAge: 123 }));
  server.use(SSLMiddleware());

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
