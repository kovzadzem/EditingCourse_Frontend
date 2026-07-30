import Hero from "../../sections/Hero";
import Features from "../../sections/Features";
import LiveCourses from "../../sections/LiveCourses";
import RecordedCourse from "../../sections/RecordedCourse";
import Syllabus from "../../sections/Syllabus";
import Portfolio from "../../sections/Portfolio";
import About from "../../sections/About";
import CTA from "../../sections/CTA";
import Contact from "../../sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <LiveCourses />
      <RecordedCourse />
      <Syllabus />
      <Portfolio />
      <About />
      <CTA />
      <Contact />
    </>
  );
};

export default Home;