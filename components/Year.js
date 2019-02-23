const Year = ({ release, img, year, changes }) => {
  let change_data = changes.map(change => {
    return <li>{{ change }}</li>;
  });

  return (
    <section className="mw8 center">
      <a href={{ img }}>
        <img src={{ img }} />
      </a>

      <h2>{{ release }}</h2>
      <ul>{{ change_data }}</ul>
    </section>
  );
};
