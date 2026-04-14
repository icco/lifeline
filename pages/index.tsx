import Year from "components/Year";
import * as fs from "fs";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Social = dynamic(
  () => import("@icco/react-common/Social").then((mod) => mod.Social),
  { ssr: false },
);

function Home(params: {
  years: { year: number; img?: string; release: string; changes: string[] }[];
}): React.ReactElement {
  const { years } = params;
  return (
    <div className="font-mono max-w-3xl mx-auto p-4">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nat&apos;s Lifeline</title>
      </Head>
      <section>
        <h1>Nat Welch</h1>
        <h2>CHANGELOG.TXT</h2>
        <p>
          Starting in 2011, I decided to create a changelog for my life. For
          those of you in the software world, this may make total sense, but for
          the rest of you, I will explain. Basically, a changelog is a list of
          all changes a project has undergone since the last
          &quot;release&quot;. So for every &quot;release&quot;, I plan on
          including a current picture, a list of significant events since the
          last release, and anything else of note. I am still trying to figure
          out how I want to write the changes, so these will probably change
          over time. Also, I am slowly going back to retroactively write old
          release notes.
        </p>

        <p>
          You can see{" "}
          <a href="https://github.com/icco/natwelch.com/blob/gh-pages/life.geojson">
            a map to go with this on github
          </a>
          .
        </p>

        <p>
          Hope you enjoy,
          <br />
          /Nat
        </p>
      </section>

      {years.map((year) => (
        <Year
          key={year.release}
          release={year.release}
          img={year.img}
          year={year.year}
          changes={year.changes}
        />
      ))}

      <footer className="pt-[14vh] pb-[8vh]">
        <div className="divider" />
        <div className="footer sm:footer-horizontal items-center p-4">
          <aside className="grid-flow-col items-center">
            <p>&copy; Nat Welch. All rights reserved.</p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="https://github.com/icco/lifeline" title="Source Code">
              Source
            </a>
          </nav>
        </div>
        <div className="footer sm:footer-horizontal text-base-content p-4">
          <nav className="gap-4">
            <h6 className="footer-title">Social</h6>
            <Social includeWebring={false} size={24} />
          </nav>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const file = fs.readFileSync("public/static/data.json");
  const data = JSON.parse(file.toString());

  return {
    props: { years: data },
  };
}

export default Home;
