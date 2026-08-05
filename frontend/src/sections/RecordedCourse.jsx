import "./RecordedCourse.css";

const RecordedCourse = () => {
  return (
    <section className="recorded-course">

      <div className="recorded-left">

        <span className="section-tag">
          ON-DEMAND COURSE
        </span>

        <h2>
          ისწავლე შენი
          <br />
          ტემპით
        </h2>

        <p>
          მიიღე სრული წვდომა 12 ლექციაზე, უყურე ნებისმიერ დროს,
          განაახლე მასალა რამდენჯერაც დაგჭირდება და შეინარჩუნე
          პროგრესი მთელი სასწავლო პროცესის განმავლობაში.
        </p>

        <div className="recorded-features">

          <div className="record-item">
            <h3>12</h3>
            <span>პრაქტიკული ლექცია</span>
          </div>

          <div className="record-item">
            <h3>365</h3>
            <span>დღიანი წვდომა</span>
          </div>

          <div className="record-item">
            <h3>100%</h3>
            <span>ონლაინ სწავლება</span>
          </div>

          <div className="record-item">
            <h3>24/7</h3>
            <span>წვდომა</span>
          </div>

        </div>

        <button className="buy-course-btn">
          შეიძინე კურსი
        </button>

      </div>

      <div className="recorded-right">

        <div className="course-card">

          <div className="course-preview">

            <div className="preview-play">
              ▶
            </div>

          </div>

          <div className="course-info">

            <h3>
              Premiere Pro Masterclass
            </h3>

            <p>
              სრული ვიდეო კურსი დამწყებებიდან პროფესიონალამდე
            </p>

            <div className="progress-box">

              <div className="progress-top">

                <span>Progress</span>

                <strong>68%</strong>

              </div>

              <div className="progress-line">

                <div
                  className="progress-active"
                  style={{ width: "68%" }}
                />

              </div>

            </div>

            <div className="course-list">

              <div className="lesson">
                Lesson 01 — Introduction
              </div>

              <div className="lesson">
                Lesson 02 — Timeline
              </div>

              <div className="lesson">
                Lesson 03 — Sound Design
              </div>

              <div className="lesson">
                Lesson 04 — Color Grading
              </div>

              <div className="lesson">
                +8 Lessons
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default RecordedCourse;