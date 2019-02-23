const Year = data => {
  const { release, img, year, changes } = data;

  let img_data = "";
  if (img !== undefined) {
    img_data = (
      <a class="db pv4 ph3 ph0-l no-underline black dim" href={"/static/" + img}>
        <div class="pr3-ns mb4 mb0-ns w-100 w-40-ns">
          <img className="db" src={"/static/" + img} />
        </div>
      </a>
    );
  }

  let change_data = changes.map((change, i) => {
    return <li key={i}>{change}</li>;
  });

  return (
    <section className="cf mv2 hidden ba b--black-10 mv4">
      <h2 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
        {release} - {year}
      </h2>
      <div className="pa3 bt b--black-10">
      {img_data}

        <ul className="f6 f5-ns lh-copy measure">{change_data}</ul>
      </div>
    </section>
  );
};

export default Year;
