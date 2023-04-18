const HomePage = () => {
  return (
    <div>
      <section className="home-header">
        <h1 className="headline">
          "Food is our common ground, a universal experience."
        </h1>
        <h2 className="head-author">- James Beard</h2>
      </section>
      <section className="home-body">
        <div className="square blurb1 fact1">
          <span></span>
          <span></span>
          <span></span>
          <div className="content">
            <h2>
              THE WORLD’S LARGEST BURGER FILLED THE STOMACHS OF 8000 PEOPLE!
            </h2>
            <p>The heaviest burger ever measured was 3,591 pounds.</p>
          </div>
        </div>

        <div className="square blurb2 fact2">
          <span></span>
          <span></span>
          <span></span>
          <div className="content">
            <h2>SUSHI RICE WAS ONCE CONSIDERED TRASH</h2>
            <p>
              The rice was wrapped around the fish in order to give it a unique
              flavour, extend its life and protect it from insects. Once it was
              time to eat the fish, the rice was discarded.
            </p>
          </div>
        </div>

        <div className="square blurb3 fact3">
          <span></span>
          <span></span>
          <span></span>
          <div className="content">
            <h2>THE BIGGEST TACO EVER WAS HUGE!</h2>
            <p>
              The biggest taco ever made was constructed on November 20th, 2011
              in Queretaro, Mexico. It was 246 feet long and was made with
              carnitas as the filling.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
