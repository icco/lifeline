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
      <div className="md:pr-4 mb-8 md:mb-0 w-full md:w-2/5 transition-opacity hover:opacity-75">
        <a className="no-underline" href={"/static/" + img}>
          <Image
            width={300}
            height={400}
            className="block"
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
    <article className="py-4 border-t border-black/20">
      <div className="flex flex-col md:flex-row">
        {img_data}

        <div className="w-full md:w-3/5 md:pl-4">
          <h2 className="text-2xl font-light mt-0 leading-tight">
            {release} - {year}
          </h2>
          <ul className="text-sm md:text-base leading-normal max-w-prose list-disc pl-5 space-y-1">
            {change_data}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Year;
