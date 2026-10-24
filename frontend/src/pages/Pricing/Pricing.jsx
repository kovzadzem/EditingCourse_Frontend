
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import "./Pricing.css";

const plans = [
  {
    type: "ინდივიდუალური",
    number: "02",
    title: "ინდივიდუალური",
    subtitle: "1 : 1 Course",
    description:
      "პერსონალური სწავლება, რომელიც მთლიანად შენს მიზნებსა და ტემპზეა მორგებული.",
    prices: [
      {
        label: "ონლაინ",
        price: "700 ₾",
        amount: 700,
        format: "online",
        text: "ინდივიდუალური გაკვეთილები ონლაინ ფორმატში.",
      },
      {
        label: "აუდიტორიაში",
        price: "1,000 ₾",
        amount: 1000,
        format: "classroom",
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
    type: "live",
    number: "01",
    title: "LIVE",
    subtitle: "Live Course",
    description:
      "დაესწარი კურსს ლაივ რეჟიმში - აირჩიე ონლაინ ან აუდიტორიაში დასწრება.",
    prices: [
      {
        label: "ონლაინ",
        price: "400 ₾",
        amount: 400,
        format: "online",
        text: "დაესწარი გაკვეთილებს სრულად ონლაინ რეჟიმში.",
      },
      {
        label: "აუდიტორიაში",
        price: "600 ₾",
        amount: 600,
        format: "classroom",
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
    type: "საკუთარი ტემპით",
    number: "03",
    title: "საკუთარი ტემპით",
    subtitle: "ჩაწერილი ლექციებით",
    description:
      "ისწავლე შენს დროს და საკუთარი ტემპით - კურსი ყოველთვის ხელმისაწვდომია.",
    prices: [
      {
        label: "ჩანაწერები",
        price: "200 ₾",
        amount: 200,
        format: "recordings",
        text: "ჩაწერილი კურსი, რომლის გავლაც შეგიძლია ნებისმიერ დროს.",
      },
      {
        label: "მხარდაჭერით",
        price: "300 ₾",
        amount: 300,
        format: "recordings-support",
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

const CHECKOUT_STORAGE_KEY = "editologia_pending_selection";
const FLITT_URL = "https://flitt.com/";

function PricingCard({ plan, index }) {
  const [expanded, setExpanded] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [isContinuing, setIsContinuing] = useState(false);

  const navigate = useNavigate();
  const selectedPrice = plan.prices[selectedPriceIndex];

  const handleChooseCourse = () => {
    setSelectedPriceIndex(0);
    setShowSelection(true);
  };

  const handleContinue = async () => {
    if (isContinuing) return;

    setIsContinuing(true);

    const selection = {
      courseType: plan.type,
      courseTitle: plan.title,
      courseNumber: plan.number,
      format: selectedPrice.format,
      formatLabel: selectedPrice.label,
      price: selectedPrice.amount,
      priceLabel: selectedPrice.price,
      streamId: plan.type === "live" ? "next" : null,
      streamLabel: plan.type === "live" ? "შემდეგი ნაკადი" : null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // არჩევანი ინახება რეგისტრაციის შემდეგ გასაგრძელებლად.
      sessionStorage.setItem(
        CHECKOUT_STORAGE_KEY,
        JSON.stringify(selection)
      );

      // Supabase-ის მიმდინარე სესიის შემოწმება.
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      setShowSelection(false);

      if (!data.session) {
        // მომხმარებელი ჯერ არ არის შესული.
        navigate("/register", {
          state: { returnTo: "payment" },
        });
        return;
      }

      // მომხმარებელი შესულია.
      // აქ ამჟამად იხსნება Flitt-ის მთავარი გვერდი.
      window.location.assign(FLITT_URL);
    } catch (error) {
      console.error("შეკვეთის გაგრძელება ვერ მოხერხდა:", error);

      alert(
        "შეკვეთის გაგრძელება ვერ მოხერხდა. გთხოვ, სცადე ხელახლა."
      );
    } finally {
      setIsContinuing(false);
    }
  };

  return (
    <>
      <article
        className={`pricing-page pricing-page-${index + 1} ${plan.type}`}
      >
        <div className="book-cover">
          <span className="cover-number">{plan.number}</span>
          <div className="cover-line" />
        </div>

        <div className="page-face">
          <div className="page-inner">
            <div className="plan-top">
              <span className="plan-number">{plan.number}</span>
              <span className="plan-subtitle">{plan.subtitle}</span>
            </div>

            <h3 className="plan-title">{plan.title}</h3>

            <p className="plan-description">{plan.description}</p>

            <div className="price-options">
              {plan.prices.map((item) => (
                <div className="price-option" key={item.label}>
                  <div className="price-option-content">
                    <span className="price-label">{item.label}</span>
                    <span className="price-extra">{item.text}</span>
                  </div>

                  <strong className="price-value">{item.price}</strong>
                </div>
              ))}
            </div>

            <div className={`plan-features ${expanded ? "expanded" : ""}`}>
              {plan.features.map((feature, featureIndex) => (
                <div
                  className={`plan-feature ${
                    featureIndex > 1 ? "extra-feature" : ""
                  }`}
                  key={feature}
                >
                  {feature}
                </div>
              ))}
            </div>

            <button
              type="button"
              className="more-button"
              onClick={() => setExpanded((previous) => !previous)}
              aria-label={expanded ? "ნაკლების ნახვა" : "მეტის ნახვა"}
            />

            <button
              type="button"
              className="plan-button"
              onClick={handleChooseCourse}
            >
              <span>აირჩიე კურსი</span>
              <span className="button-icon">→</span>
            </button>
          </div>
        </div>
      </article>

      {showSelection && (
        <div
          className="pricing-selection-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isContinuing) {
              setShowSelection(false);
            }
          }}
        >
          <section
            className="pricing-selection-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`selection-title-${index}`}
          >
            <button
              type="button"
              className="pricing-selection-close"
              onClick={() => setShowSelection(false)}
              aria-label="დახურვა"
              disabled={isContinuing}
            >
              ×
            </button>

            <span className="pricing-selection-eyebrow">
              EDITOLOGIA / COURSE SELECTION
            </span>

            <h2 id={`selection-title-${index}`}>
              აირჩიე შენი ფორმატი
            </h2>

            <p className="pricing-selection-description">
              {plan.description}
            </p>

            <div className="pricing-selection-options">
              {plan.prices.map((item, itemIndex) => (
                <button
                  key={item.format}
                  type="button"
                  className={`pricing-selection-option ${
                    selectedPriceIndex === itemIndex ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPriceIndex(itemIndex)}
                  aria-pressed={selectedPriceIndex === itemIndex}
                  disabled={isContinuing}
                >
                  <span className="pricing-selection-radio">
                    {selectedPriceIndex === itemIndex ? "✓" : ""}
                  </span>

                  <span className="pricing-selection-option-copy">
                    <strong>{item.label}</strong>
                    <span>{item.text}</span>
                  </span>

                  <strong className="pricing-selection-price">
                    {item.price}
                  </strong>
                </button>
              ))}
            </div>

            {plan.type === "live" && (
              <div className="pricing-selection-stream">
                <span className="pricing-selection-stream-label">
                  ნაკადი
                </span>

                <div className="pricing-selection-stream-value">
                  <span>
                    <strong>შემდეგი ნაკადი</strong>
                    <small>რეგისტრაციის არჩევა</small>
                  </span>

                  <span className="pricing-selection-stream-status">
                    არჩეულია
                  </span>
                </div>
              </div>
            )}

            <div className="pricing-selection-summary">
              <span>სულ გადასახდელი</span>
              <strong>{selectedPrice.price}</strong>
            </div>

            <button
              type="button"
              className="pricing-selection-continue"
              onClick={handleContinue}
              disabled={isContinuing}
            >
              {isContinuing ? "მიმდინარეობს..." : "გაგრძელება"}
              <span>→</span>
            </button>

            <p className="pricing-selection-note">
              შემდეგ ეტაპზე შეკვეთის დეტალებს გადაამოწმებ.
              ამ ეტაპზე თანხა არ ჩამოიჭრება.
            </p>
          </section>
        </div>
      )}
    </>
  );
}

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing-top">
        <div className="pricing-label">
          <span className="pricing-label-line"></span>
          <span className="pricing-label-line"></span>
        </div>

        <h2 className="pricing-title">
          იპოვე შენი <span>სწავლის ფორმატი</span>
        </h2>

        <p className="pricing-intro"></p>
      </div>

      <div className="book-area">
        <div className="pricing-book">
          {plans.map((plan, index) => (
            <PricingCard key={plan.type} plan={plan} index={index} />
          ))}
        </div>
      </div>

      <div className="pricing-bottom">
        <p>
          ვერ გადაწყვიტე რომელი ფორმატი აირჩიო?
          <a
            href="https://www.instagram.com/editologia0/?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
          >
            {" "}დაგვიკავშირდი.
          </a>
        </p>

        <div className="pricing-divider" />

        <strong>START LEARNING</strong>
      </div>
    </section>
  );
}

export default Pricing;
