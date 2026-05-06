export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="inline-block bg-blue-500 bg-opacity-30 text-blue-100 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-400 border-opacity-40">
          Licensed Labour Agency — Malaysia
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Your Trusted Partner for
          <span className="block text-yellow-400 mt-2">Labour Solutions</span>
        </h1>

        <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Agensi Perkerjaan Global Link Sdn Bhd connects businesses with skilled and
          semi-skilled workers across Malaysia. Fast, reliable, and compliant recruitment
          tailored to your operational needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3.5 rounded-lg text-base transition-colors shadow-lg"
          >
            Request Workers Now
          </a>
          <a
            href="#services"
            className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-colors border border-white border-opacity-30"
          >
            Our Services
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Workers Placed" },
            { value: "100+", label: "Client Companies" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white bg-opacity-10 rounded-xl p-4 border border-white border-opacity-20">
              <p className="text-yellow-400 text-2xl font-extrabold">{stat.value}</p>
              <p className="text-blue-100 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
