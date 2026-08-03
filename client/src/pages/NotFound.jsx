import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-9xl font-extrabold text-indigo-600 tracking-widest">
          404
        </div>
        <div className="bg-indigo-600 text-white px-2 py-1 text-xs font-semibold rounded rotate-12 inline-block">
          Page Not Found
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-4">
          Looking for something?
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          The page you are trying to access does not exist or has been moved.
        </p>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition shadow"
          >
            Back to Safety
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;