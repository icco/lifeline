const Year = data => {
  const { release, img, year, changes } = data;

  let img_data = "";
  if (img !== undefined) {
    img_data = (
      <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns dim">
        <a className="no-underline" href={"/static/" + img}>
          <img className="db" src={"/static/" + img} />
        </a>
      </div>
    );
  }

  let change_data = changes.map((change, i) => {
    return <li key={i}>{change}</li>;
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
