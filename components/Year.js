const Year = data => {
  const { release, img, year, changes } = data;

  let img_data = "";
  if (img !== undefined) {
    img_data = (
      <a href={"/static/" + img}>
        <img src={"/static/" + img} />
      </a>
    );
  }

  let change_data = changes.map((change, i) => {
    return <li key={i}>{change}</li>;
  });

  return (
    <section className="mw8 center">
      {img_data}

      <h2>
        {release} - {year}
      </h2>
      <ul>{change_data}</ul>
    </section>
  );
};

export default Year;
