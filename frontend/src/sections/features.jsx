import "./Features.css";

const features = [
  {
    number: "01",
    title: "Adobe Premiere Pro",
    text: "ისწავლე პროფესიონალური ვიდეო მონტაჟი ნულიდან სრულყოფილ დონემდე."
  },
  {
    number: "02",
    title: "Motion & Animation",
    text: "დაამატე თანამედროვე მოძრაობის ეფექტები და შექმენი დინამიკური ვიდეოები."
  },
  {
    number: "03",
    title: "Color Grading",
    text: "გააუმჯობესე ფერები და მიანიჭე შენს ვიდეოს კინემატოგრაფიული ვიზუალი."
  },
  {
    number: "04",
    title: "Storytelling",
    text: "ისწავლე როგორ მოუყვე ისტორია სწორად და შეინარჩუნო მაყურებლის ყურადღება."
  }
];

const Features = () => {
  return (
    <section className="features">

      <div className="section-title">

        <span>რატომ ჩვენი კურსი?</span>

        <h2>
          ყველაფერი რაც პროფესიონალ
          <br />
          ვიდეო ედიტორს სჭირდება
        </h2>

      </div>

      <div className="features-grid">

        {features.map((item) => (
          <div className="feature-card" key={item.number}>

            <h1>{item.number}</h1>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Features;