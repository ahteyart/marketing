const reasons = [
  {
    step: "01",
    title: "Licensed & Compliant",
    desc: "We hold a valid JTKSM licence and operate strictly within Malaysian labour and immigration law, protecting both our clients and the workers we place.",
  },
  {
    step: "02",
    title: "Thorough Worker Screening",
    desc: "Every worker undergoes background checks, health screenings, and skills assessment before placement to ensure quality and reliability.",
  },
  {
    step: "03",
    title: "Transparent Pricing",
    desc: "No hidden fees. We provide clear, upfront quotations so you can plan your manpower budget with confidence.",
  },
  {
    step: "04",
    title: "Fast Mobilisation",
    desc: "Our extensive network allows us to deploy workers quickly — reducing production downtime and keeping your operations running smoothly.",
  },
  {
    step: "05",
    title: "Ongoing Support",
    desc: "We don't disappear after placement. Our team provides continuous after-sales support including worker management and replacement when needed.",
  },
  {
    step: "06",
    title: "Multilingual Team",
    desc: "Our team communicates fluently in Bahasa Malaysia, English, and Mandarin — making coordination seamless for all our clients.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            The Global Link Advantage
          </h2>
          <p className="text-blue-200 text-base max-w-2xl mx-auto">
            We go beyond simply filling positions — we build long-term workforce partnerships
            that support your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item) => (
            <div
              key={item.step}
              className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 border border-blue-700 hover:border-yellow-400 transition-colors"
            >
              <span className="text-yellow-400 text-3xl font-extrabold">{item.step}</span>
              <h3 className="text-white font-bold text-lg mt-3 mb-2">{item.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
