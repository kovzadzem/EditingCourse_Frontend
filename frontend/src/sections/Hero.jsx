export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Build something amazing
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Simple hero section made with React and Tailwind CSS.
          Create, customize and launch your ideas faster.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Get Started
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-white transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}