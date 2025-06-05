import { useState } from "react";
import { Link } from "react-router";
import UserDropdown from "./UserDropdown";

const Header = ({ onClick, onToggle }) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          
          <button
            className="block w-10 h-10 text-gray-500 lg:hidden dark:text-gray-400"
            onClick={onToggle}
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583 1A0.75 0.75 0 0 1 1.333 0.25h13.334a0.75 0.75 0 0 1 0 1.5H1.333A0.75 0.75 0 0 1 0.583 1zm0 10a0.75 0.75 0 0 1 0.75-0.75h13.334a0.75 0.75 0 0 1 0 1.5H1.333a0.75 0.75 0 0 1-0.75-0.75zM1.333 5.25a0.75 0.75 0 0 0 0 1.5h6.667a0.75 0.75 0 0 0 0-1.5H1.333z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            onClick={onClick}
            className="items-center justify-center hidden w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
          >
            <svg
              className="fill-current"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583 1A0.75 0.75 0 0 1 1.333 0.25h13.334a0.75 0.75 0 0 1 0 1.5H1.333A0.75 0.75 0 0 1 0.583 1zm0 10a0.75 0.75 0 0 1 0.75-0.75h13.334a0.75 0.75 0 0 1 0 1.5H1.333a0.75 0.75 0 0 1-0.75-0.75zM1.333 5.25a0.75 0.75 0 0 0 0 1.5h6.667a0.75 0.75 0 0 0 0-1.5H1.333z"
                fill="currentColor"
              />
            </svg>
          </button>

          

          {/* App menu toggle */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm12 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Right side of the header, like user dropdown */}
        <div className="flex items-center justify-end w-full px-3 py-2 lg:py-0 lg:px-0">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
