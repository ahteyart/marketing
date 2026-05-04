export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">ContentAI</h1>
          <p className="text-gray-500 mt-1 text-sm">AI-powered social media content</p>
        </div>
        {children}
      </div>
    </div>
  );
}
