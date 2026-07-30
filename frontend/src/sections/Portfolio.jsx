import "./Portfolio.css";

const works = [
  {
    title: "Commercial Edit",
    category: "Advertising",
  },
  {
    title: "Travel Film",
    category: "Cinematic",
  },
  {
    title: "Podcast",
    category: "YouTube",
  },
  {
    title: "Music Video",
    category: "Creative",
  },
  {
    title: "Social Media",
    category: "Reels",
  },
  {
    title: "Documentary",
    category: "Storytelling",
  },
];

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="section-title">
        <span>PORTFOLIO</span>

        <h2>
          სტუდენტების
          <br />
          ნამუშევრები
        </h2>

        <p>
          რეალურ პროექტებზე შესრულებული ვიდეოები,
          რომლებიც კურსის ფარგლებში შეიქმნა.
        </p>
      </div>

      <div className="portfolio-grid">
        {works.map((item, index) => (
          <div className="portfolio-card" key={index}>
            <div className="portfolio-image"></div>

            <div className="portfolio-content">
              <h3>{item.title}</h3>
              <span>{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;