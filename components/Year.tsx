import Image from "next/image";
import React from "react";

const Year = (data: {
  release: string;
  img?: string;
  year: number;
  changes: string[];
}): React.ReactElement => {
  const { release, img, year, changes } = data;

  let img_data = <></>;
  if (img !== undefined) {
    img_data = (
      <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns dim">
        <a className="no-underline" href={"/static/" + img}>
          <Image
            width={300}
            height={400}
            className="db"
            src={"/static/" + img}
            alt={`photo of Nat in ${year}`}
          />
        </a>
      </div>
    );
  }

  const change_data = changes.map((change, i) => {
    return <li key={i} dangerouslySetInnerHTML={{ __html: change }} />;
  });

  return (
    <article className="pv3 bt b--black-20">
      <div className="flex flex-column flex-row-ns">
        {img_data}

        <div className="w-100 w-60-ns pl3-ns">
          <h2 className="f3 fw1 mt0 lh-title">
            {release} - {year}
          </h2>
          <ul className="f6 f5-ns lh-copy measure">{change_data}</ul>
        </div>
      </div>
    </article>
  );
};

export default Year;
