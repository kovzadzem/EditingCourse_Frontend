import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-label">
            VIDEO EDITING ACADEMY
          </span>

          <h1>
            ისწავლე ვიდეოს შექმნა
            <br />
            <span>პროფესიონალურად.</span>
          </h1>

          <p>
            პრაქტიკული ონლაინ კურსები Adobe Premiere Pro-ზე —
            მონტაჟი, ხმა, ფერი, Motion და Storytelling.
          </p>

          <div className="hero-buttons">
            <Link to="/courses" className="primary-btn">
              კურსის ნახვა
            </Link>

            <Link to="/live-courses" className="secondary-btn">
              Live კურსები
            </Link>
          </div>

        </div>

        <div className="hero-visual">
          <div className="video-card">

            <div className="video-card-top">
              <span>PREMIERE PRO</span>
              <span>01 / 12</span>
            </div>

            <div className="video-preview">
              <div className="play-button">▶</div>
            </div>

            <div className="timeline">
              <span></span>
            </div>

          </div>
        </div>
      </section>


      {/* SHORT INTRO */}
      <section className="intro-section">

        <div className="section-heading">
          <span>WHY US</span>
          <h2>
            ყველაფერი, რაც საჭიროა
            <br />
            კარგი ედიტორისთვის.
          </h2>
        </div>

        <div className="intro-text">
          <p>
            ისწავლე არა მხოლოდ პროგრამის გამოყენება,
            არამედ როგორ შექმნა ვიდეო, რომელსაც აქვს
            სტილი, ხმა და საკუთარი ისტორია.
          </p>

          <Link to="/courses" className="text-link">
            გაიგე მეტი →
          </Link>
        </div>

      </section>


      {/* DIRECTIONS */}
      <section className="directions">

        <div className="direction-card">
          <span>01</span>
          <h3>Editing</h3>
          <p>
            პროფესიონალური მონტაჟის საფუძვლები
            Adobe Premiere Pro-ში.
          </p>
        </div>

        <div className="direction-card">
          <span>02</span>
          <h3>Sound</h3>
          <p>
            ხმა, მუსიკა და აუდიოს სწორად
            გამოყენება ვიდეოში.
          </p>
        </div>

        <div className="direction-card">
          <span>03</span>
          <h3>Color</h3>
          <p>
            ფერის კორექცია და ვიზუალური
            სტილის შექმნა.
          </p>
        </div>

        <div className="direction-card">
          <span>04</span>
          <h3>Storytelling</h3>
          <p>
            როგორ მოუყვე მაყურებელს
            საინტერესო ისტორია.
          </p>
        </div>

      </section>


      {/* COURSES */}
      <section className="courses-preview">

        <div className="section-heading centered">
          <span>LEARNING</span>

          <h2>
            აირჩიე შენი გზა
          </h2>

          <p>
            ორი განსხვავებული ფორმატი —
            ერთი პროფესიული მიზანი.
          </p>
        </div>


        <div className="course-options">

          {/* ON DEMAND */}
          <article className="course-card">

            <div className="course-number">
              01
            </div>

            <div>
              <span className="course-type">
                ON-DEMAND
              </span>

              <h3>
                ჩაწერილი კურსი
              </h3>

              <p>
                12 ლექცია, რომლის გავლაც
                შეგიძლია შენს საკუთარ ტემპში.
              </p>

              <div className="course-meta">
                <span>12 ლექცია</span>
                <span>365 დღე</span>
              </div>

              <Link to="/courses" className="course-link">
                კურსის ნახვა →
              </Link>
            </div>

          </article>


          {/* LIVE */}
          <article className="course-card live-card">

            <div className="course-number">
              02
            </div>

            <div>
              <span className="course-type">
                LIVE COURSE
              </span>

              <h3>
                ლაივ სწავლება
              </h3>

              <p>
                ისწავლე ჯგუფთან ერთად,
                რეალურ გარემოში და ლექტორთან
                პირდაპირი კომუნიკაციით.
              </p>

              <div className="course-meta">
                <span>2 ჯგუფი</span>
                <span>Live</span>
              </div>

              <Link
                to="/live-courses"
                className="course-link"
              >
                ჯგუფების ნახვა →
              </Link>
            </div>

          </article>

        </div>

      </section>


      {/* LIVE INFO */}
      <section className="live-preview">

        <div>
          <span className="hero-label">
            LIVE COURSES
          </span>

          <h2>
            ისწავლე
            <br />
            რეალურ დროში.
          </h2>

          <p>
            აირჩიე ჯგუფი, ნახე განრიგი და
            დაიწყე სწავლა ლექტორთან ერთად.
          </p>

          <Link
            to="/live-courses"
            className="primary-btn"
          >
            ჯგუფების ნახვა
          </Link>
        </div>

        <div className="live-info-card">

          <div>
            <small>AVAILABLE GROUPS</small>
            <strong>02</strong>
          </div>

          <div>
            <small>FORMAT</small>
            <strong>LIVE</strong>
          </div>

          <div>
            <small>LOCATION</small>
            <strong>STUDIO</strong>
          </div>

        </div>

      </section>


      {/* GALLERY PREVIEW */}
      <section className="gallery-preview">

        <div className="section-heading">
          <span>OUR SPACE</span>

          <h2>
            გარემო, სადაც
            <br />
            სწავლა ხდება.
          </h2>
        </div>

        <Link to="/gallery" className="text-link">
          გალერეის ნახვა →
        </Link>

      </section>


      {/* CTA */}
      <section className="final-cta">

        <span>
          START YOUR JOURNEY
        </span>

        <h2>
          მზად ხარ შენი
          <br />
          პირველი ვიდეოსთვის?
        </h2>

        <Link to="/courses" className="primary-btn">
          დაიწყე სწავლა
        </Link>

      </section>

    </main>
  );
}