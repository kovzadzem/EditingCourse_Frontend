import "./LiveCourses.css";

const groups = [
  {
    id: 1,
    name: "Group A",
    start: "15 September 2026",
    time: "19:00 - 21:00",
    location: "Tbilisi • Saburtalo",
    students: 20,
    maxStudents: 25,
    price: "₾790",
    status: "Enrollment Open",
  },
  {
    id: 2,
    name: "Group B",
    start: "28 September 2026",
    time: "19:00 - 21:00",
    location: "Tbilisi • Saburtalo",
    students: 18,
    maxStudents: 25,
    price: "₾790",
    status: "Few Places Left",
  },
];

const LiveCourses = () => {
  return (
    <section className="live-courses">

      <div className="live-header">

        <span className="section-tag">
          LIVE CLASSES
        </span>

        <h2>
          აირჩიე სასურველი
          <br />
          სასწავლო ჯგუფი
        </h2>

        <p>
          ლექციები ტარდება მცირე ჯგუფებში,
          რათა თითოეულ სტუდენტს მიექცეს
          ინდივიდუალური ყურადღება.
        </p>

      </div>

      <div className="groups-grid">

        {groups.map((group) => {

          const percent =
            (group.students / group.maxStudents) * 100;

          return (

            <div
              className="group-card"
              key={group.id}
            >

              <div className="group-top">

                <div>

                  <span className="status">
                    {group.status}
                  </span>

                  <h3>
                    {group.name}
                  </h3>

                </div>

                <h2 className="price">
                  {group.price}
                </h2>

              </div>

              <div className="group-info">

                <div className="info-row">

                  <span>დაწყება</span>

                  <strong>
                    {group.start}
                  </strong>

                </div>

                <div className="info-row">

                  <span>საათი</span>

                  <strong>
                    {group.time}
                  </strong>

                </div>

                <div className="info-row">

                  <span>ლოკაცია</span>

                  <strong>
                    {group.location}
                  </strong>

                </div>

              </div>

              <div className="students">

                <div className="students-top">

                  <span>
                    სტუდენტები
                  </span>

                  <strong>
                    {group.students}
                    /
                    {group.maxStudents}
                  </strong>

                </div>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${percent}%`,
                    }}
                  />

                </div>

              </div>
                            <div className="places">

                <div className="places-card">

                  <h4>
                    დარჩენილი ადგილები
                  </h4>

                  <span>
                    {group.maxStudents - group.students}
                  </span>

                </div>

                <div className="places-card">

                  <h4>
                    ფორმატი
                  </h4>

                  <span>
                    Live
                  </span>

                </div>

              </div>

              <div className="course-features">

                <div className="feature">
                  ✔ 12 პრაქტიკული ლექცია
                </div>

                <div className="feature">
                  ✔ ჩანაწერებზე წვდომა
                </div>

                <div className="feature">
                  ✔ რეალური პროექტები
                </div>

                <div className="feature">
                  ✔ კითხვები ლექტორთან
                </div>

                <div className="feature">
                  ✔ Premiere Pro Workflow
                </div>

              </div>

              <div className="group-buttons">

                <button className="details-btn">
                  დეტალურად
                </button>

                <button className="join-btn">
                  დაჯავშნე ადგილი
                </button>

              </div>

            </div>

          );

        })}

      </div>

      <div className="live-bottom">

        <div className="bottom-card">

          <h3>
            არ იცი რომელი ჯგუფი აირჩიო?
          </h3>

          <p>
            დაგვიკავშირდი და დაგეხმარებით
            საუკეთესო ჯგუფის შერჩევაში.
          </p>

        </div>

        <div className="bottom-card">

          <h3>
            ყველა ლაივი იწერება
          </h3>

          <p>
            თუ რომელიმე ლექციას გამოტოვებ,
            ჩანაწერი ავტომატურად დაგხვდება
            შენს პირად კაბინეტში.
          </p>

        </div>

        <div className="bottom-card">

          <h3>
            მცირე ჯგუფები
          </h3>

          <p>
            თითოეულ ჯგუფში ადგილები
            შეზღუდულია, რათა ყველა
            სტუდენტს მიექცეს ყურადღება.
          </p>

        </div>

      </div>

    </section>
  );
};

export default LiveCourses;