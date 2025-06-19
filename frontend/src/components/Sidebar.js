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
      <h2 className="text-3xl font-extrabold mb-12 text-indigo-400 text-center"> {}
        Menu
      </h2>
      <nav className="flex-grow"> {}
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
      </div>
    </div>
  );
}