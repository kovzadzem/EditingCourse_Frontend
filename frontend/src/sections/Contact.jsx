import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact">

      <div className="contact-info">

        <span className="section-tag">
          CONTACT
        </span>

        <h2>
          კავშირი
          <br />
          ლექტორთან
        </h2>

        <p>
          თუ გაქვს კითხვები კურსთან დაკავშირებით,
          დაგვიკავშირდი ნებისმიერ დროს.
          სიამოვნებით დაგეხმარებით სწორი
          კურსის არჩევაში.
        </p>

        <div className="contact-list">

          <div className="contact-item">

            <h4>ელ-ფოსტა</h4>

            <a href="mailto:info@editingacademy.ge">
              info@editingacademy.ge
            </a>

          </div>

          <div className="contact-item">

            <h4>ტელეფონი</h4>

            <a href="tel:+995599123456">
              +995 599 123 456
            </a>

          </div>

          <div className="contact-item">

            <h4>ლოკაცია</h4>

            <span>
              თბილისი, საქართველო
            </span>

          </div>

        </div>

      </div>

      <div className="contact-card">

        <h3>
          მოგვწერე
        </h3>

        <form>

          <input
            type="text"
            placeholder="სახელი"
          />

          <input
            type="email"
            placeholder="ელ-ფოსტა"
          />

          <textarea
            placeholder="შეტყობინება"
            rows="6"
          ></textarea>

          <button>
            გაგზავნა
          </button>

        </form>

      </div>

    </section>
  );
};

export default Contact;