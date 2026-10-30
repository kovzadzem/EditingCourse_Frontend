
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaChevronRight,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import { supabase } from "../../../supabase";
import "./VideoEditing.css";

// =====================================================
// MENTOR
// =====================================================

const mentor = {
  name: "ნიკოლოზ ამაშუკელი",
  role: "ლექტორი • Video Editing",
  experience: "5+ წელი გამოცდილება",
  students: "100+ სტუდენტი",
  image: "/images/CO.jpg",
};

// =====================================================
// GROUPS — PRICES
// =====================================================

const groups = [
  {
    id: 1,
    title: "აუდიტორიაში",
    mode: "in-person",
    students: 0,
    maxStudents: 15,
    duration: "6 კვირა",
    lectures: "12 ლექცია",
    experience: "0 გამოცდილება",
    price: 600,
    payment: "ერთჯერადი გადახდა",
    status: "რეგისტრაცია ღიაა",
    featured: true,
  },
  {
    id: 2,
    title: "ონლაინ",
    mode: "online",
    students: 0,
    maxStudents: 15,
    duration: "6 კვირა",
    lectures: "12 ლექცია",
    experience: "0 გამოცდილება",
    price: 400,
    payment: "ერთჯერადი გადახდა",
    status: "რეგისტრაცია ღიაა",
    featured: false,
  },
];

// =====================================================
// COMPONENT
// =====================================================

function VideoEditing() {
  const navigate = useNavigate();
  const [showMentor, setShowMentor] = useState(false);
  const [selectingGroup, setSelectingGroup] = useState(null);

  // =====================================================
  // SELECT GROUP
  // If logged in -> profile
  // Otherwise -> registration
  // =====================================================

  const handleSelectGroup = async (group) => {
    if (selectingGroup !== null) return;

    setSelectingGroup(group.id);

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      const selectedCourse = {
        course: "video-editing",
        courseTitle: "ვიდეო ედითინგი",
        groupId: group.id,
        group: group.title,
        mode: group.mode,
        price: group.price,
        currency: "GEL",
        duration: group.duration,
        lectures: group.lectures,
      };

      const params = new URLSearchParams({
        course: selectedCourse.course,
        courseTitle: selectedCourse.courseTitle,
        groupId: String(selectedCourse.groupId),
        group: selectedCourse.group,
        mode: selectedCourse.mode,
        price: String(selectedCourse.price),
        currency: selectedCourse.currency,
      });

      // Save selection for the next page.
      // The URL also carries the selection if sessionStorage is unavailable.
      try {
        sessionStorage.setItem(
          "editologiaSelectedCourse",
          JSON.stringify(selectedCourse)
        );
      } catch {
        // Continue using URL parameters.
      }

      const user = data.session?.user;

      if (user) {
        navigate(`/profile?${params.toString()}`);
      } else {
        navigate(`/register?${params.toString()}`);
      }
    } catch (error) {
      console.error("ჯგუფის არჩევის შეცდომა:", error);

      // If session verification fails, do not assume the user is logged in.
      const params = new URLSearchParams({
        course: "video-editing",
        courseTitle: "ვიდეო ედითინგი",
        groupId: String(group.id),
        group: group.title,
        mode: group.mode,
        price: String(group.price),
        currency: "GEL",
      });

      navigate(`/register?${params.toString()}`);
    } finally {
      setSelectingGroup(null);
    }
  };

  return (
    <main className="live-page">
      {/* HERO */}

      <section className="live-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-dot" />
            LIVE COURSE
          </div>

          <h1>
            ისწავლე ვიდეო მონტაჟი
            <span>პრაქტიკულად</span>
          </h1>

          <p className="hero-description">
            რეალურ სამუშაო პროცესში მუშაობ — არა შაბლონურ ფაილებზე,
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

        {/* MENTOR CARD */}

        <div className="mentor-wrapper">
          <button
            className="mentor-image-card"
            onClick={() => setShowMentor(true)}
            aria-label="მენტორის ინფორმაციის ნახვა"
            type="button"
          >
            <div className="mentor-image">
              <img src={mentor.image} alt={mentor.name} />
            </div>

            <div className="mentor-overlay" />

            <div className="mentor-card-top">
              <span>MENTOR</span>
              <span className="pro-badge">PRO</span>
            </div>

            <div className="mentor-card-bottom">
              <div>
                <small>ლექტორი</small>
                <h3>{mentor.name}</h3>
              </div>

              <div className="mentor-arrow">
                <FaChevronRight />
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* GROUPS */}

      <section className="groups-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">LIVE PROGRAM</span>
            <h2>აირჩიე შენთვის სასურველი ჯგუფი</h2>
          </div>

          <p>
            მცირე ჯგუფები, ინდივიდუალური ყურადღება და
            პრაქტიკული სწავლება რეალურ პროექტებზე.
          </p>
        </div>

        <div className="groups-grid">
          {groups.map((group) => {
            const available = Math.max(
              0,
              group.maxStudents - group.students
            );

            const progress =
              (group.students / group.maxStudents) * 100;

            const isFull = available === 0;
            const isSelecting = selectingGroup === group.id;

            return (
              <article
                className={`group-card ${
                  group.featured ? "featured-group" : ""
                }`}
                key={group.id}
              >
                {group.featured && (
                  <div className="featured-label">
                    რეკომენდებული
                  </div>
                )}

                <div className="group-card-header">
                  <div>
                    <span className="group-label">LIVE GROUP</span>
                    <h3>{group.title}</h3>
                  </div>

                  <span className="group-status">
                    {isFull ? "ადგილები შევსებულია" : group.status}
                  </span>
                </div>

                {/* AVAILABILITY */}

                <div className="group-availability">
                  <div className="availability-top">
                    <span>ადგილები</span>

                    <strong>
                      {available}
                      <small> / {group.maxStudents}</small>
                    </strong>
                  </div>

                  <div className="availability-bar">
                    <span style={{ width: `${progress}%` }} />
                  </div>

                  <div className="availability-bottom">
                    <span>{available} თავისუფალი ადგილი</span>
                    <span>მაქს. {group.maxStudents} სტუდენტი</span>
                  </div>
                </div>

                {/* GROUP INFO */}

                <div className="group-info-grid">
                  <div>
                    <span>გამოცდილება</span>
                    <strong>{group.experience}</strong>
                  </div>

                  <div>
                    <span>ხანგრძლივობა</span>
                    <strong>{group.duration}</strong>
                  </div>

                  <div>
                    <span>ლექციები</span>
                    <strong>{group.lectures}</strong>
                  </div>
                </div>

                {/* PRICE */}

                <div className="premium-price-box">
                  <div className="price-heading">
                    <span>კურსის ღირებულება</span>
                    <span className="payment-type">
                      {group.payment}
                    </span>
                  </div>

                  <div className="price-main">
                    <strong>
                      {group.price.toLocaleString("en-US")} ₾
                    </strong>
                    <span>სრული კურსი</span>
                  </div>

                  <div className="price-bottom">
                    <span>
                      <FaCheck />
                      სრული პროგრამა
                    </span>

                    <span>
                      <FaCheck />
                      პრაქტიკული სწავლება
                    </span>
                  </div>
                </div>

                {/* SELECT GROUP */}

                <button
                  className="group-button"
                  type="button"
                  disabled={isFull || selectingGroup !== null}
                  onClick={() => handleSelectGroup(group)}
                >
                  <span>
                    {isSelecting
                      ? "გადამისამართება..."
                      : isFull
                        ? "ადგილები შევსებულია"
                        : "ჯგუფის არჩევა"}
                  </span>

                  <span className="button-arrow">
                    <FaChevronRight />
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* LOCATION */}

      <section className="location-section">
        <div className="location-card">
          <div className="location-icon">
            <FaMapMarkerAlt />
          </div>

          <div className="location-text">
            <span>LOCATION</span>
            <h3>სასწავლო სივრცე</h3>
            <p>ლოკაცია დაზუსტდება რეგისტრაციის დაწყებისას.</p>
          </div>

          <button
            className="location-button"
            type="button"
            onClick={() =>
              window.open(
                "https://www.yell.ge/company.php?lan=geo&id=162006",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            რუკაზე ნახვა
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* MENTOR MODAL */}

      {showMentor && (
        <div
          className="mentor-modal"
          onClick={() => setShowMentor(false)}
        >
          <div
            className="mentor-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="mentor-close"
              onClick={() => setShowMentor(false)}
              type="button"
              aria-label="დახურვა"
            >
              <FaTimes />
            </button>

            <div className="modal-image">
              <img src={mentor.image} alt={mentor.name} />
            </div>

            <div className="modal-content">
              <div className="modal-badge">PRO MENTOR</div>

              <h2>{mentor.name}</h2>
              <p className="modal-role">{mentor.role}</p>

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

export default VideoEditing;
