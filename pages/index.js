import Head from "next/head";
import Year from "../components/Year";

function Home() {
  return (
    <div>
      <Head>
        <title>Nat's Lifeline</title>
      </Head>
      <div>
        <h1>
          Nat Welch:
          <br />
          CHANGELOG.TXT
        </h1>
        <p>
          Starting in 2011, I decided to create a changelog for my life. For
          those of you in the software world, this may make total sense, but for
          the rest of you, I'll explain. Basically, a changelog is a list of all
          changes a project has undergone since the last "release". So for every
          "release", I plan on including a current picture, a list of
          significant events since the last release, and anything else of note.
          I'm still trying to figure out how I want to write the changes, so
          these will probably change over time. Also, I'm slowly going back to
          retroactively write old release notes.
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
      </div>

      <div />
    </div>
  );
}

export default Home;
