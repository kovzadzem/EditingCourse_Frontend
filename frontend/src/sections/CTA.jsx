import "./CTA.css";

const CTA = () => {
  return (
    <section className="cta-section">

      <div className="cta-bg"></div>

      <div className="cta-content">

        <span className="section-tag">
          START TODAY
        </span>

        <h2>
          დაიწყე პროფესიონალური
          <br />
          ვიდეო მონტაჟის სწავლა
          <br />
          დღესვე
        </h2>

        <p>
          მიიღე სრული წვდომა ჩაწერილ კურსზე 365 დღით
          ან დაჯავშნე ადგილი უახლოეს Live ჯგუფში.
          ყველაფერი ერთ პლატფორმაზე.
        </p>

        <div className="cta-buttons">

          <button className="cta-primary">
            შეიძინე კურსი
          </button>

          <button className="cta-secondary">
            Live ჯგუფები
          </button>

        </div>

        <div className="cta-stats">

          <div>

            <h3>1500+</h3>

            <span>სტუდენტი</span>

          </div>

          <div>

            <h3>4.9/5</h3>

            <span>შეფასება</span>

          </div>

          <div>

            <h3>12</h3>

            <span>ლექცია</span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;