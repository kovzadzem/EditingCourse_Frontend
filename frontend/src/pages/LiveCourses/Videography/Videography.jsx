import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaChevronRight,
  FaTimes,
  FaCamera,
  FaVideo,
  FaClock,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import "./Videography.css";

const mentor = {
  name: "ნიკოლოზ ამაშუკელი",
  role: "ლექტორი • Videography",
  experience: "5+ წელი გამოცდილება",
  students: "100+ სტუდენტი",
  image: "/images/CO.jpg",
};

const groups = [
  {
    title: "აუდიტორიაში",
    subtitle: "დასწრებით",
    price: "600 ₾",
    maxStudents: "15 სტუდენტი",
    duration: "6 კვირა",
    lectures: "12 ლექცია",
    experience: "0 გამოცდილება",
  },
  {
    title: "ონლაინ",
    subtitle: "დისტანციურად",
    price: "400 ₾",
    maxStudents: "15 სტუდენტი",
    duration: "6 კვირა",
    lectures: "12 ლექცია",
    experience: "0 გამოცდილება",
  },
];

export default function Videography() {
  const [showMentor, setShowMentor] = useState(false);

  return (
    <main className="videography-page">
      {/* HERO */}
      <section className="videography-hero">
        <div className="videography-hero-overlay" />

        <div className="videography-hero-content">
          <div className="videography-badge">
            <FaVideo />
            <span>LIVE COURSE</span>
          </div>

          <h1>
            ისწავლე
            <br />
            <span>ვიდეოგრაფია</span>
          </h1>

          <p>
            შეისწავლე ვიდეოგრაფიის საფუძვლები და პრაქტიკაში გაიგე,
            როგორ იქმნება ხარისხიანი ვიდეო — გადაღებიდან საბოლოო
            შედეგამდე.
          </p>

          <div className="videography-features">
            <div className="videography-feature">
              <FaMapMarkerAlt />
              <span>აუდიტორიაში / დასწრებით</span>
            </div>

            <div className="videography-feature">
              <FaVideo />
              <span>ონლაინ / დისტანციურად</span>
            </div>

            <div className="videography-feature">
              <FaCamera />
              <span>პრაქტიკა / რეალურ პროექტებზე</span>
            </div>

            <div className="videography-feature">
              <FaClock />
              <span>6 კვირა / სრული პროგრამა</span>
            </div>
          </div>

          <a
            href="#videography-groups"
            className="videography-hero-button"
          >
            კურსის არჩევა
            <FaChevronRight />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="videography-about">
        <div className="videography-container">
          <div className="videography-section-heading">
            <span>COURSE</span>
            <h2>რას ისწავლი?</h2>
            <p>
              კურსი შექმნილია მათთვის, ვისაც სურს ვიდეოგრაფიის
              პრაქტიკულად შესწავლა და საკუთარი პირველი პროექტების
              შექმნა.
            </p>
          </div>

          <div className="videography-learning-grid">
            <div className="videography-learning-card">
              <div className="learning-icon">
                <FaCamera />
              </div>
              <h3>კამერის გამოყენება</h3>
              <p>
                კამერის ძირითადი ფუნქციები, პარამეტრები და სწორი
                გადაღების პრინციპები.
              </p>
            </div>

            <div className="videography-learning-card">
              <div className="learning-icon">
                <FaVideo />
              </div>
              <h3>ვიდეოს გადაღება</h3>
              <p>
                კადრის დაგეგმვა, კომპოზიცია, მოძრაობა და სხვადასხვა
                ტიპის ვიდეოს გადაღება.
              </p>
            </div>

            <div className="videography-learning-card">
              <div className="learning-icon">
                <FaCamera />
              </div>
              <h3>განათება</h3>
              <p>
                განათების სწორად გამოყენება და კადრის ვიზუალური
                ხარისხის გაუმჯობესება.
              </p>
            </div>

            <div className="videography-learning-card">
              <div className="learning-icon">
                <FaVideo />
              </div>
              <h3>რეალური პროექტები</h3>
              <p>
                პრაქტიკული დავალებები და რეალურ სამუშაო პროცესთან
                მაქსიმალურად მიახლოებული გამოცდილება.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENTOR */}
      <section className="videography-mentor-section">
        <div className="videography-container">
          <div className="videography-mentor-card">
            <div className="videography-mentor-image-wrapper">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="videography-mentor-image"
              />
            </div>

            <div className="videography-mentor-info">
              <span className="mentor-label">YOUR MENTOR</span>

              <h2>{mentor.name}</h2>

              <p className="mentor-role">{mentor.role}</p>

              <div className="mentor-stats">
                <div>
                  <strong>5+</strong>
                  <span>წელი გამოცდილება</span>
                </div>

                <div>
                  <strong>100+</strong>
                  <span>სტუდენტი</span>
                </div>

                <div>
                  <strong>12</strong>
                  <span>ლექცია</span>
                </div>
              </div>

              <button
                className="mentor-more-button"
                onClick={() => setShowMentor(true)}
              >
                გაიგე მეტი
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GROUPS */}
      <section
        className="videography-groups-section"
        id="videography-groups"
      >
        <div className="videography-container">
          <div className="videography-section-heading center">
            <span>LIVE COURSES</span>
            <h2>აირჩიე შენთვის სასურველი ფორმატი</h2>
            <p>
              შეგიძლია კურსი გაიარო როგორც აუდიტორიაში, ისე ონლაინ.
            </p>
          </div>

          <div className="videography-groups-grid">
            {groups.map((group, index) => (
              <div
                className={`videography-group-card ${
                  index === 0 ? "featured" : ""
                }`}
                key={group.title}
              >
                {index === 0 && (
                  <div className="popular-badge">რეკომენდებული</div>
                )}

                <div className="group-icon">
                  {index === 0 ? <FaMapMarkerAlt /> : <FaVideo />}
                </div>

                <h3>{group.title}</h3>
                <span className="group-subtitle">
                  {group.subtitle}
                </span>

                <div className="group-price">
                  {group.price}
                </div>

                <div className="group-details">
                  <div>
                    <FaUsers />
                    <span>{group.maxStudents}</span>
                  </div>

                  <div>
                    <FaClock />
                    <span>{group.duration}</span>
                  </div>

                  <div>
                    <FaCheckCircle />
                    <span>{group.lectures}</span>
                  </div>

                  <div>
                    <FaCheckCircle />
                    <span>{group.experience}</span>
                  </div>
                </div>

                <button className="group-button">
                  რეგისტრაცია
                  <FaChevronRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="videography-location">
        <div className="videography-container">
          <div className="location-card">
            <div className="location-icon">
              <FaMapMarkerAlt />
            </div>

            <div className="location-content">
              <span>LOCATION</span>
              <h2>სად ჩატარდება კურსი?</h2>
              <p>
                კურსის დაწყებისას ზუსტი მისამართი და დეტალური
                ინფორმაცია მონაწილეებს მიეწოდებათ.
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/Tbilisi"
              target="_blank"
              rel="noreferrer"
              className="location-button"
            >
              რუკაზე ნახვა
              <FaChevronRight />
            </a>
          </div>
        </div>
      </section>

      {/* MENTOR MODAL */}
      {showMentor && (
        <div
          className="videography-modal"
          onClick={() => setShowMentor(false)}
        >
          <div
            className="videography-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="videography-modal-close"
              onClick={() => setShowMentor(false)}
            >
              <FaTimes />
            </button>

            <img
              src={mentor.image}
              alt={mentor.name}
            />

            <div className="modal-info">
              <span>YOUR MENTOR</span>

              <h2>{mentor.name}</h2>

              <p className="modal-role">
                {mentor.role}
              </p>

              <p>
                პრაქტიკოსი მენტორი, რომელიც სტუდენტებს ეხმარება
                ვიდეოგრაფიის ტექნიკის, გადაღების პროცესისა და
                რეალურ პროექტებზე მუშაობის შესწავლაში.
              </p>

              <div className="modal-stats">
                <div>
                  <strong>5+</strong>
                  <span>წელი გამოცდილება</span>
                </div>

                <div>
                  <strong>100+</strong>
                  <span>სტუდენტი</span>
                </div>

                <div>
                  <strong>12</strong>
                  <span>ლექცია</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}