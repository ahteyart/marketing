export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GL</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Agensi Perkerjaan</p>
                <p className="text-gray-400 text-xs leading-tight">Global Link Sdn Bhd</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your trusted partner for labour and manpower solutions across Malaysia.
              Licensed, compliant, and committed to quality placements.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Why Us", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Factory Workers</li>
              <li>Construction Labour</li>
              <li>Plantation Workers</li>
              <li>Hospitality Staff</li>
              <li>Logistics & Warehouse</li>
              <li>Technical Workers</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Agensi Perkerjaan Global Link Sdn Bhd. All rights reserved.</p>
          <p>Registered & Licensed Employment Agency — Malaysia</p>
        </div>
      </div>
    </footer>
  );
}
