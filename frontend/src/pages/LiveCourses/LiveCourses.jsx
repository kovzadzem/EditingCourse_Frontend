import { useState } from "react";
import { FaMapMarkerAlt, FaChevronRight, FaTimes } from "react-icons/fa";
import "./LiveCourses.css";

// ===============================
// MENTOR
// ===============================

const mentor = {
  name: "ნიკოლოზ ამაშუკელი",
  role: "ლექტორი • Video Editing",
  experience: "5+ წელი გამოცდილება",
  students: "100+ სტუდენტი",
  image: "/images/CO.jpg",
};

// ===============================
// GROUPS
// ===============================

const groups = [
  {
    id: 1,
    title: "აუდიტორიაში",
    students: 0,
    maxStudents: 15,
    duration: "6 კვირა",
    lectures: "12 ლექცია",
    experience: "0 გამოცდილება",
    price: "600 ₾",
    status: "რეგისტრაცია ღიაა",
  },
  {
    id: 2,
    title: "ონლაინ ",
    students: 0,
    maxStudents: 15,
    duration: "6 კვირა",
    lectures: "12 ლექცია",
    experience: "0 გამოცდილება",
    price: "400 ₾",
    status: "რეგისტრაცია ღიაა",
  },
];

function LiveCourses() {
  const [showMentor, setShowMentor] = useState(false);

  return (
    <main className="live-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="live-hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span className="hero-dot"></span>
            LIVE COURSE
          </div>

          <h1>
            ისწავლე ვიდეო მონტაჟი
            <span></span>
          </h1>

          <p className="hero-description">
            რეალურ სამუშაო პროცესში მუშაობ - არა შაბლონურ ფაილებზე,
            არამედ რეალურ ვიდეომასალასთან, რეალურ პროექტებსა და
            პროფესიონალურ workflow-ზე.
          </p>

          <div className="hero-features">
            <div>
              <strong>აუდიტორიაში</strong>
              <span>დასწრებით</span>
            </div>

            <div>
              <strong>ონლაინ</strong>
              <span>დისტანციურად</span>
            </div>

            <div>
              <strong>პრაქტიკა</strong>
              <span>რეალურ პროექტებზე</span>
            </div>

            <div>
              <strong>6 კვირა</strong>
              <span>სრული პროგრამა</span>
            </div>
          </div>

        </div>

        {/* =====================================================
            MENTOR CARD
        ===================================================== */}

        <div className="mentor-wrapper">

          <button
            className="mentor-image-card"
            onClick={() => setShowMentor(true)}
            aria-label="მენტორის ინფორმაციის ნახვა"
          >

            <div className="mentor-image">
              <img
                src={mentor.image}
                alt={mentor.name}
              />
            </div>

            <div className="mentor-overlay"></div>

            <div className="mentor-card-top">
              <span>MENTOR</span>

              <span className="pro-badge">
                PRO
              </span>
            </div>

            <div className="mentor-card-bottom">

              <div>
                <small>ლექტორი</small>

                <h3>
                  {mentor.name}
                </h3>
              </div>

              <div className="mentor-arrow">
                <FaChevronRight />
              </div>

            </div>

          </button>

        </div>

      </section>


      {/* =====================================================
          GROUPS
      ===================================================== */}

      <section className="groups-section">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              LIVE PROGRAM
            </span>

            <h2>
              აირჩიე შენთვის სასურველი ჯგუფი
            </h2>
          </div>

          <p>
            მცირე ჯგუფები, ინდივიდუალური ყურადღება და
            პრაქტიკული სწავლება რეალურ პროექტებზე.
          </p>

        </div>


        <div className="groups-grid">

          {groups.map((group) => {

            const available =
              group.maxStudents - group.students;

            const progress =
              (group.students / group.maxStudents) * 100;

            return (
              <article
                className="group-card"
                key={group.id}
              >

                <div className="group-card-header">

                  <div>
                    <span className="group-label">
                      LIVE GROUP
                    </span>

                    <h3>
                      {group.title}
                    </h3>
                  </div>

                  <span className="group-status">
                    {group.status}
                  </span>

                </div>


                <div className="group-availability">

                  <div className="availability-top">

                    <span>
                      ადგილები
                    </span>

                    <strong>
                      {available}
                      <small>
                        / {group.maxStudents}
                      </small>
                    </strong>

                  </div>

                  <div className="availability-bar">

                    <span
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <div className="availability-bottom">
                    <span>
                      {available} თავისუფალი ადგილი
                    </span>

                    <span>
                      მაქს. {group.maxStudents} სტუდენტი
                    </span>
                  </div>

                </div>


                <div className="group-info-grid">

                  <div>
                    <span>
                      გამოცდილება
                    </span>

                    <strong>
                      {group.experience}
                    </strong>
                  </div>

                  <div>
                    <span>
                      ხანგრძლივობა
                    </span>

                    <strong>
                      {group.duration}
                    </strong>
                  </div>

                  <div>
                    <span>
                      ლექციები
                    </span>

                    <strong>
                      {group.lectures}
                    </strong>
                  </div>

                </div>


                <div className="group-footer">

                  <div className="price">

                    <span>
                      კურსის ღირებულება
                    </span>

                    <strong>
                      {group.price}
                    </strong>

                  </div>

                  <button className="group-button">
                    ჯგუფის არჩევა
                    <FaChevronRight />
                  </button>

                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="location-section">

        <div className="location-card">

          <div className="location-icon">
            <FaMapMarkerAlt />
          </div>

          <div className="location-text">

            <span>
              LOCATION
            </span>

            <h3>
              სასწავლო სივრცე
            </h3>

            <p>
              ლოკაცია დაემატება რეგისტრაციის დაწყებისას.
            </p>

          </div>

         <button
  className="location-button"
  type="button"
  onClick={() =>
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Tbilisi,Georgia",
      "_blank"
    )
  }
>
  რუკაზე ნახვა
  <FaChevronRight />
</button>

        </div>

      </section>


      {/* =====================================================
          MENTOR MODAL
      ===================================================== */}

      {showMentor && (

        <div
          className="mentor-modal"
          onClick={() => setShowMentor(false)}
        >

          <div
            className="mentor-modal-card"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="mentor-close"
              onClick={() => setShowMentor(false)}
            >
              <FaTimes />
            </button>


            <div className="modal-image">

              <img
                src={mentor.image}
                alt={mentor.name}
              />

            </div>


            <div className="modal-content">

              <div className="modal-badge">
                PRO MENTOR
              </div>

              <h2>
                {mentor.name}
              </h2>

              <p className="modal-role">
                {mentor.role}
              </p>


              <div className="mentor-stats">

                <div>
                  <strong>
                    5+
                  </strong>

                  <span>
                    წელი გამოცდილება
                  </span>
                </div>

                <div>
                  <strong>
                    100+
                  </strong>

                  <span>
                    სტუდენტი
                  </span>
                </div>

                <div>
                  <strong>
                    12
                  </strong>

                  <span>
                    ლექცია
                  </span>
                </div>

              </div>


              <p className="modal-description">
                სწავლება ეფუძნება რეალურ სამუშაო პროცესს,
                პრაქტიკულ დავალებებსა და ვიდეომასალაზე მუშაობას.
                მიზანია სტუდენტმა კურსის დასრულების შემდეგ
                დამოუკიდებლად შეძლოს პროფესიონალური ვიდეო
                მონტაჟის შესრულება.
              </p>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default LiveCourses;