import * as fs from "fs"

import Footer from "@/components/Footer"
import Year from "@/components/Year"

export const metadata = {
  title: "Nat's Lifeline",
}

export default function Home() {
  const file = fs.readFileSync("public/static/data.json")
  const years: { year: number; img?: string; release: string; changes: string[] }[] =
    JSON.parse(file.toString())

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Nat Welch</h1>
          <h2 className="text-xl font-semibold mb-4">CHANGELOG.TXT</h2>
          <p className="mb-4">
            Starting in 2011, I decided to create a changelog for my life. For
            those of you in the software world, this may make total sense, but
            for the rest of you, I will explain. Basically, a changelog is a
            list of all changes a project has undergone since the last
            &quot;release&quot;. So for every &quot;release&quot;, I plan on
            including a current picture, a list of significant events since the
            last release, and anything else of note. I am still trying to figure
            out how I want to write the changes, so these will probably change
            over time. Also, I am slowly going back to retroactively write old
            release notes.
          </p>

          <p className="mb-4">
            You can see{" "}
            <a
              className="underline"
              href="https://github.com/icco/natwelch.com/blob/gh-pages/life.geojson"
            >
              a map to go with this on github
            </a>
            .
          </p>

          <p className="mb-4">
            Hope you enjoy,
            <br />
            /Nat
          </p>
        </section>

        {years.map((year) => (
          <Year
            key={`${year.year}-${year.release}`}
            release={year.release}
            img={year.img}
            year={year.year}
            changes={year.changes}
          />
        ))}
      </div>

      <Footer />
    </>
  )
}
