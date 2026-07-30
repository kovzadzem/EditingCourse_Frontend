import HeroVisual from "./HeroVisual";
import "./Hero"
function Hero() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">

      <section className="
        max-w-7xl
        mx-auto
        min-h-screen
        grid
        lg:grid-cols-2
        items-center
        px-6
      ">

        <div>
          <h1 className="
            text-white
            text-5xl
            md:text-7xl
            font-bold
          ">
            Build modern products
          </h1>

          <p className="
            text-white/50
            mt-6
            text-lg
          ">
            Beautiful React animations with glass UI.
          </p>
        </div>


        <HeroVisual />

      </section>

    </main>
  );
}

export default Hero;