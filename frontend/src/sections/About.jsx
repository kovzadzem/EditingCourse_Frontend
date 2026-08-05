import "./About.css";

const About = () => {
  return (
    <section className="about">

      <div className="about-left">

        <span className="section-tag">
          ABOUT US
        </span>

        <h2>
          ისწავლე ვიდეო
          <br />
          მონტაჟი პროფესიონალურ
          <br />
          დონეზე
        </h2>

        <p>
          ჩვენი მიზანია შევქმნათ საქართველოში ყველაზე ხარისხიანი
          ვიდეო მონტაჟის სასწავლო პლატფორმა, სადაც სტუდენტები
          მიიღებენ არა მხოლოდ თეორიას, არამედ რეალურ პრაქტიკულ
          გამოცდილებას.
        </p>

        <p>
          კურსი დაფუძნებულია რეალურ პროექტებზე, თანამედროვე
          Workflow-ზე და იმ ტექნიკებზე, რომლებსაც ყოველდღიურად
          იყენებენ პროფესიონალი ვიდეო ედიტორები.
        </p>

        <button className="about-btn">
          ჩვენს შესახებ
        </button>

      </div>

      <div className="about-right">

        <div className="about-image">

          <div className="experience-card">

            <h2>5+</h2>

            <span>
              Years Experience
            </span>

          </div>

        </div>

        <div className="about-stats">

          <div className="stat-card">

            <h3>1500+</h3>

            <span>
              სტუდენტი
            </span>

          </div>

          <div className="stat-card">

            <h3>300+</h3>

            <span>
              დასრულებული პროექტი
            </span>

          </div>

          <div className="stat-card">

            <h3>98%</h3>

            <span>
              კმაყოფილი სტუდენტი
            </span>

          </div>

          <div className="stat-card">

            <h3>24/7</h3>

            <span>
              მხარდაჭერა
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;