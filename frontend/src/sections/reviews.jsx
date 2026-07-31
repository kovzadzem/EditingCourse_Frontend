import { motion } from "framer-motion";
import "./Reviews.css";

const reviews = [
  {
    name: "ანა კაპანაძე",
    role: "კურსდამთავრებული",
    text: "ყველას ვინც ვიდეოს სწავლას გადაწყვეტს, გირჩევთ ამ კურსს. ძალიან მარტივად და გასაგებად არის ყველაფერი ახსნილი.",
    image: "/reviews/anna.jpg",
  },
  {
    name: "ელენე ხუციშვილი",
    role: "კურსდამთავრებული",
    text: "პრემიერის სწავლა თუ ნულიდან გინდა დაიწყო, ეს კურსი ნამდვილად კარგი არჩევანია. ყველაფერი ეტაპობრივად და გასაგებად არის ახსნილი.",
    image: "/reviews/elene.jpg",
  },
  {
    name: "თორნიკე მახარაძე",
    role: "კურსდამთავრებული",
    text: "თუ ვიდეო ედითინგის სწავლა გინდა, ნამდვილად გირჩევთ. მასწავლებელი ძალიან კარგად ხსნის ყველაფერს და პრაქტიკაზეა აქცენტი.",
    image: "/reviews/tornike.jpg",
  },
  {
    name: "თაკო ბერიძე",
    role: "კურსდამთავრებული",
    text: "საინტერესო და მარტივი კომუნიკაციაა. რაც ყველაზე მეტად მომეწონა, არის პრაქტიკული ნაწილი და რეალურ პროექტებზე მუშაობა.",
    image: "/reviews/tako.jpg",
  },
  {
    name: "ელენე ოქროპირიძე",
    role: "კურსდამთავრებული",
    text: "ძალიან კარგი გამოცდილება იყო. კურსის დასრულების შემდეგ უკვე ბევრად უფრო თავდაჯერებული ვარ ვიდეოს მონტაჟში.",
    image: "/reviews/elene2.jpg",
  },
  {
    name: "ზურა მაჩაიძე",
    role: "კურსდამთავრებული",
    text: "თავსის საქმის პროფესიონალი ლექტორი. ყველაფერი დეტალურად არის ახსნილი და პრაქტიკული ნაწილი განსაკუთრებით მომეწონა.",
    image: "/reviews/zura.jpg",
  },
  {
    name: "მათე ჭიჭია",
    role: "კურსდამთავრებული",
    text: "10/10 რეკომენდაცია. ვისაც 0-დან სურს ვიდეო ედითინგის შესწავლა, აუცილებლად გირჩევთ ამ კურსს.",
    image: "/reviews/mate.jpg",
  },
  {
    name: "გიგა დავითაძე",
    role: "კურსდამთავრებული",
    text: "ნამდვილად ძალიან კარგი სასწავლო გამოცდილება იყო. ბევრი ახალი რამ ვისწავლე და პრაქტიკაში გამოყენებაც შევძელი.",
    image: "/reviews/giga.jpg",
  },
];

function ReviewCard({ review }) {
  return (
    <article className="review-card">

      <div className="review-user">

        <img
          src={review.image}
          alt={review.name}
          className="review-avatar"
        />

        <div>
          <h3>{review.name}</h3>
          <span>{review.role}</span>
        </div>

      </div>

      <div className="review-stars">
        ★★★★★
      </div>

      <p>
        {review.text}
      </p>

    </article>
  );
}

function ReviewRow({ items, reverse = false }) {
  const duplicated = [...items, ...items];

  return (
    <div className="reviews-track-wrapper">

      <motion.div
        className="reviews-track"
        animate={{
          x: reverse
            ? ["-50%", "0%"]
            : ["0%", "-50%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >

        {duplicated.map((review, index) => (
          <ReviewCard
            review={review}
            key={`${review.name}-${index}`}
          />
        ))}

      </motion.div>

    </div>
  );
}

export default function Reviews() {
  const firstRow = reviews.slice(0, 5);
  const secondRow = reviews.slice(3, 8);

  return (
    <section className="reviews-section">

      <div className="reviews-heading">

        <span>STUDENT REVIEWS</span>

        <h2>
          რას ამბობენ
          <br />
          <strong>ჩვენი სტუდენტები.</strong>
        </h2>

      </div>

      <div className="reviews-wall">

        <ReviewRow items={firstRow} />

        <ReviewRow
          items={secondRow}
          reverse
        />

      </div>

    </section>
  );
}