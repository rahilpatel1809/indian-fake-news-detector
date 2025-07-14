import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const baseClasses = `
      block
      px-5 py-3
      rounded-lg
      text-xl
      font-semibold
      transition-all duration-300 ease-in-out
      text-center
    `;
    const inactiveClasses = `
      text-gray-300
      hover:text-white
      hover:bg-gray-700
      hover:shadow-md
      transform hover:scale-105
    `;
    const activeClasses = `
      bg-indigo-600
      text-white
      shadow-lg
      transform scale-100
      border border-indigo-500
    `;

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="w-64 bg-gray-900 text-white p-8 flex flex-col min-h-screen shadow-lg"
    >
      <h2 className="text-3xl font-extrabold mb-12 text-indigo-400 text-center">
        Menu
      </h2>
      <nav className="flex-grow">
        <ul className="space-y-6">
          <li>
            <Link
              to="/detection"
              className={getLinkClasses("/detection")}
            >
              Detection
            </Link>
          </li>
          <li>
            <Link
              to="/dataset"
              className={getLinkClasses("/dataset")}
            >
              Dataset
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto text-center text-sm text-gray-500 pt-8 border-t border-gray-700">
        <p className="text-white text-md font-semibold mb-3">Created by Rahil Patel</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.linkedin.com/in/rahilpatel1809"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <img src="/icons8-linkedin.svg" alt="LinkedIn" className="h-8 w-8" />
          </a>
          <a
            href="https://github.com/rahilpatel1809"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <img src="/icons8-github.svg" alt="GitHub" className="h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
  );
}