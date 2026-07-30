import "./Syllabus.css";

const modules = [
  {
    id: "01",
    title: "Introduction & Interface",
    lessons: [
      "Premiere Pro Interface",
      "Project Setup",
      "Keyboard Shortcuts",
    ],
  },
  {
    id: "02",
    title: "Timeline & Editing",
    lessons: [
      "Timeline Basics",
      "Cuts",
      "Ripple Edit",
    ],
  },
  {
    id: "03",
    title: "Audio Editing",
    lessons: [
      "Sound Cleanup",
      "Music",
      "Mixing",
    ],
  },
  {
    id: "04",
    title: "Color Grading",
    lessons: [
      "Lumetri Color",
      "Looks",
      "Skin Tones",
    ],
  },
];

const Syllabus = () => {
  return (
    <main className="syllabus">

      <section className="syllabus-hero">

        <span>COURSE SYLLABUS</span>

        <h1>
          Adobe Premiere Pro
          <br />
          სრული სასწავლო პროგრამა
        </h1>

        <p>
          ეტაპობრივად გაივლი ყველა საჭირო თემას,
          რომელიც პროფესიონალ ვიდეო ედიტორს სჭირდება.
        </p>

      </section>

      <section className="course-overview">

        <div className="overview-card">
          <h2>12</h2>
          <span>ლექცია</span>
        </div>

        <div className="overview-card">
          <h2>365</h2>
          <span>დღიანი წვდომა</span>
        </div>

        <div className="overview-card">
          <h2>20+</h2>
          <span>საათი ვიდეო</span>
        </div>

        <div className="overview-card">
          <h2>100%</h2>
          <span>პრაქტიკა</span>
        </div>

      </section>

      <section className="modules">

        <h2>კურსის პროგრამა</h2>

        {modules.map((module) => (

          <details key={module.id}>

            <summary>

              <span>{module.id}</span>

              {module.title}

            </summary>

            <div className="lessons">

              {module.lessons.map((lesson) => (

                <p key={lesson}>
                  {lesson}
                </p>

              ))}

            </div>

          </details>

        ))}

      </section>

      <section className="learn">

        <h2>
          რას ისწავლი?
        </h2>

        <div className="learn-grid">

          <div>✓ პროფესიონალური მონტაჟი</div>

          <div>✓ Motion Graphics</div>

          <div>✓ Color Grading</div>

          <div>✓ Sound Design</div>

          <div>✓ Storytelling</div>

          <div>✓ Export Workflow</div>

        </div>

      </section>

      <section className="cta">

        <h2>
          მზად ხარ დასაწყებად?
        </h2>

        <button>
          შეიძინე კურსი
        </button>

      </section>

    </main>
  );
};

export default Syllabus;