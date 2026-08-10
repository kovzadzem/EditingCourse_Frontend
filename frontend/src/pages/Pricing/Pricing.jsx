import { useState } from "react";
import "./Pricing.css";

const plans = [
  {
    type: "live",
    number: "01",
    title: "LIVE",
    subtitle: "Live Course",
    description:
      "დაესწარი კურსს ლაივ რეჟიმში - აირჩიე ონლაინ ან აუდიტორიაში დასწრება.",
    prices: [
      {
        label: "ONLINE",
        price: "400 ₾",
        text: "დაესწარი გაკვეთილებს სრულად ონლაინ რეჟიმში.",
      },
      {
        label: "AUDITORIUM",
        price: "600 ₾",
        text: "დაესწარი კურსს ადგილზე, აუდიტორიის სივრცეში.",
      },
    ],
    features: [
      "Live გაკვეთილები",
      "კითხვა და პასუხი",
      "პრაქტიკული სწავლება",
      "ონლაინ ან აუდიტორიაში დასწრება",
    ],
  },

  {
    type: "individual",
    number: "02",
    title: "INDIVIDUAL",
    subtitle: "1 : 1 Course",
    description:
      "პერსონალური სწავლება, რომელიც მთლიანად შენს მიზნებსა და ტემპზეა მორგებული.",
    prices: [
      {
        label: "ONLINE",
        price: "700 ₾",
        text: "ინდივიდუალური გაკვეთილები ონლაინ ფორმატში.",
      },
      {
        label: "ON-SITE",
        price: "1,000 ₾",
        text: "ინდივიდუალური სწავლება ადგილზე მისვლით.",
      },
    ],
    features: [
      "1 : 1 სწავლება",
      "პერსონალური პროგრამა",
      "ინდივიდუალური მიდგომა",
      "პერსონალური დახმარება",
    ],
  },

  {
    type: "self-paced",
    number: "03",
    title: "SELF-PACED",
    subtitle: "Recorded Course",
    description:
      "ისწავლე შენს დროს და საკუთარი ტემპით - კურსი ყოველთვის ხელმისაწვდომია.",
    prices: [
      {
        label: "RECORDED",
        price: "200 ₾",
        text: "ჩაწერილი კურსი, რომლის გავლაც შეგიძლია ნებისმიერ დროს.",
      },
      {
        label: "WITH SUPPORT",
        price: "300 ₾",
        text: "ჩაწერილი კურსი დამატებითი მხარდაჭერით.",
      },
    ],
    features: [
      "წინასწარ ჩაწერილი გაკვეთილები",
      "სწავლა ნებისმიერ დროს",
      "კურსის მასალები",
      "დამატებითი Support",
    ],
  },
];

function PricingCard({ plan, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`pricing-page pricing-page-${index + 1} ${plan.type}`}
    >
      {/* BACK COVER */}
      <div className="book-cover">
        <span className="cover-number">
          {plan.number}
        </span>

        <div className="cover-line" />
      </div>

      {/* FRONT PAGE */}
      <div className="page-face">
        <div className="page-inner">

          {/* TOP */}
          <div className="plan-top">
            <span className="plan-number">
              {plan.number}
            </span>

            <span className="plan-subtitle">
              {plan.subtitle}
            </span>
          </div>

          {/* TITLE */}
          <h3 className="plan-title">
            {plan.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="plan-description">
            {plan.description}
          </p>

          {/* PRICES */}
          <div className="price-options">
            {plan.prices.map((item) => (
              <div
                className="price-option"
                key={item.label}
              >
                <div className="price-option-content">
                  <span className="price-label">
                    {item.label}
                  </span>

                  <span className="price-extra">
                    {item.text}
                  </span>
                </div>

                <strong className="price-value">
                  {item.price}
                </strong>
              </div>
            ))}
          </div>

          {/* SHORT INFORMATION */}
          <div
            className={`plan-features ${
              expanded ? "expanded" : ""
            }`}
          >
            {plan.features.map((feature, featureIndex) => (
              <div
                className={`plan-feature ${
                  featureIndex > 1
                    ? "extra-feature"
                    : ""
                }`}
                key={feature}
              >
                {feature}
              </div>
            ))}
          </div>

          {/* MORE */}
          <button
            type="button"
            className="more-button"
            onClick={() => setExpanded(!expanded)}
          >
            
          </button>

          {/* CTA */}
          <button
            type="button"
            className="plan-button"
          >
            <span>
              აირჩიე კურსი
            </span>

            <span className="button-icon">
              →
            </span>
          </button>

        </div>
      </div>
    </article>
  );
}

function Pricing() {
  return (
    <section
      className="pricing"
      id="pricing"
    >
      {/* HEADER */}
      <div className="pricing-top">
  <div className="pricing-label">
    <span className="pricing-label-line"></span>

    <span className="pricing-label-line"></span>
  </div>

  <h2 className="pricing-title">
    იპოვე შენი <span>სწავლის ფორმატი</span>
  </h2>

  <p className="pricing-intro">
  </p>
</div>

      {/* BOOK */}
      <div className="book-area">
        <div className="pricing-book">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.type}
              plan={plan}
              index={index}
            />
          ))}
        </div>
      </div>

     {/* BOTTOM */}
<div className="pricing-bottom">
  <p>
    ვერ გადაწყვიტე რომელი ფორმატი აირჩიო?
    <a href="/"> დაგვიკავშირდი.</a>
  </p>

  <div className="pricing-divider" />

  <strong>
    START LEARNING
  </strong>
</div>
    </section>
  );
}

export default Pricing;