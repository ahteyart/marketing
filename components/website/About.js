export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-6 leading-tight">
              Who We Are
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              <strong>Agensi Perkerjaan Global Link Sdn Bhd</strong> is a licensed employment
              agency based in Malaysia, dedicated to providing reliable manpower and labour
              solutions to businesses across various industries.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              We specialise in the recruitment, placement, and management of local and
              foreign workers — from general factory hands to skilled technical personnel.
              Our team ensures that every worker we supply is vetted, documented, and ready
              to contribute from day one.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              We are committed to full compliance with Malaysian labour law and JTKSM
              regulations, giving our clients complete peace of mind.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                JTKSM Licensed Agency
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                Local & Foreign Workers
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                Fast Deployment
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                Full Documentation Support
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: "🏭",
                title: "Industry Focus",
                desc: "Serving manufacturing, construction, hospitality, agriculture, and logistics sectors.",
              },
              {
                icon: "📋",
                title: "Full Compliance",
                desc: "All placements fully comply with Malaysian Employment Act and immigration regulations.",
              },
              {
                icon: "🤝",
                title: "Partnership Approach",
                desc: "We work closely with clients to understand their workforce needs and deliver accordingly.",
              },
              {
                icon: "⚡",
                title: "Quick Turnaround",
                desc: "Rapid mobilisation of workers to minimise downtime for your operations.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
