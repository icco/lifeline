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
  ReportToMiddleware,
} = require("@icco/react-common");
const pinoMiddleware = require("pino-http");

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
  server.use(compression());
      server.set("trust proxy", true);

      server.use(
        pinoMiddleware({
          logger,
        })
      );

      server.use(NELMiddleware());
      server.use(ReportToMiddleware("writing"));

      server.use(helmet());

      server.use(
        helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" })
      );

      server.use(
        helmet.contentSecurityPolicy({
          directives: {
            upgradeInsecureRequests: true,

            //  default-src 'none'
            defaultSrc: [
              "'self'",
              "https://graphql.natwelch.com/graphql",
              "https://graphql.natwelch.com/photo/new",
              "https://icco.auth0.com/.well-known/jwks.json",
            ],
            // style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/
            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://fonts.googleapis.com/",
            ],
            // font-src https://fonts.gstatic.com
            fontSrc: ["https://fonts.gstatic.com"],
            // img-src 'self' data: http://a.natwelch.com https://a.natwelch.com https://icco.imgix.net
            imgSrc: [
              "'self'",
              "data:",
              "https://a.natwelch.com",
              "https://icco.imgix.net",
              "https://storage.googleapis.com",
              "https://writing.natwelch.com",
            ],
            // script-src 'self' 'unsafe-eval' 'unsafe-inline' http://a.natwelch.com/tracker.js https://a.natwelch.com/tracker.js
            scriptSrc: [
              "'self'",
              "'unsafe-inline'",
              "'unsafe-eval'",
              "https://a.natwelch.com/tracker.js",
            ],
            // object-src 'none';
            objectSrc: ["'none'"],
            // https://developers.google.com/web/updates/2018/09/reportingapi#csp
            reportUri: "https://reportd.natwelch.com/report/writing",
            reportTo: "default",
          },
        })
      );

      server.use(expectCt({ maxAge: 123 }));

      server.use(compression());

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
