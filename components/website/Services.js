const services = [
  {
    icon: "🏭",
    title: "Factory / Production Workers",
    desc: "General and semi-skilled workers for assembly lines, production floors, packaging, and quality control in manufacturing plants.",
    tags: ["General Workers", "Operators", "Quality Control"],
  },
  {
    icon: "🏗️",
    title: "Construction Workers",
    desc: "Skilled and unskilled labour for building, civil engineering, and infrastructure projects including formwork, steel fixing, and general site work.",
    tags: ["Brickwork", "Steel Fixing", "Site Labour"],
  },
  {
    icon: "🌾",
    title: "Plantation & Agriculture",
    desc: "Experienced field workers for palm oil estates, fruit farms, and agro-industry operations across Peninsular Malaysia and Sabah/Sarawak.",
    tags: ["Palm Oil", "Harvesting", "Field Workers"],
  },
  {
    icon: "🍽️",
    title: "Hospitality & F&B",
    desc: "Kitchen helpers, cleaners, and service staff for hotels, restaurants, and food processing facilities.",
    tags: ["Kitchen Helpers", "Cleaners", "Service Staff"],
  },
  {
    icon: "🚛",
    title: "Logistics & Warehousing",
    desc: "Loaders, pickers, packers, and warehouse assistants for distribution centres, cold storage, and logistics companies.",
    tags: ["Loaders", "Pickers & Packers", "Store Assistants"],
  },
  {
    icon: "🔧",
    title: "Technical & Skilled Labour",
    desc: "Electricians, welders, plumbers, and other certified tradespeople for technical and maintenance roles across industries.",
    tags: ["Electricians", "Welders", "Plumbers"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Our Labour Services
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            We provide end-to-end labour supply solutions across a wide range of industries,
            ensuring the right workers are placed in the right roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-4xl mb-4">{svc.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Don&apos;t see your industry? We handle custom requests too.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Discuss Your Requirements
          </a>
        </div>
      </div>
    </section>
  );
}
