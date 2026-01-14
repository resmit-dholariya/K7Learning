import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        Free Learning Platform
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Learn subjects step by step
      </p>

      <div className="max-w-md mx-auto grid gap-6">
        <Link
          to="/subject/english"
          className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center text-lg font-semibold"
        >
          English
        </Link>
      </div>
    </div>
  );
}
