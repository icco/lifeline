import type { NextConfig } from "next";
import { createSecureHeaders } from "next-secure-headers";

const port = process.env.PORT || "8080";
const hostname = process.env.HOSTNAME || "localhost";
const domain = process.env.DOMAIN || `http://${hostname}:${port}`;

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "NEL",
            value: JSON.stringify({ report_to: "default", max_age: 2592000 }),
          },
          {
            key: "Report-To",
            value: JSON.stringify({
              group: "default",
              max_age: 10886400,
              endpoints: [
                { url: "https://reportd.natwelch.com/report/lifeline" },
              ],
            }),
          },
          {
            key: "Reporting-Endpoints",
            value: 'default="https://reportd.natwelch.com/reporting/lifeline"',
          },
        ],
      },
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'none'"],
              connectSrc: [
                "'self'",
                "https://*.natwelch.com",
                domain,
                domain.replace(/^https?/, "ws"),
              ],
              fontSrc: ["'self'", "https://fonts.gstatic.com"],
              imgSrc: [
                "'self'",
                "data:",
                "https://*.natwelch.com",
                "https://icco.imgix.net",
              ],
              scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "'unsafe-eval'",
                "blob:",
                "https://*.natwelch.com",
                domain,
              ],
              styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com/",
              ],
              objectSrc: ["'none'"],
              reportURI: "https://reportd.natwelch.com/report/lifeline",
              reportTo: "default",
            },
            reportOnly: false,
          },
          referrerPolicy: "strict-origin-when-cross-origin",
          expectCT: true,
        }),
      },
    ];
  },
};

export default nextConfig;
