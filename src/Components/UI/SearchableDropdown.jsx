import { useState } from "react";

const SearchableDropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const search = (e) => {
    setSearchTerm(e.target.value);
  };

  let availableOptions = options;
  if (searchTerm) {
    availableOptions = availableOptions.filter(
      (option) =>
        option.main.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const optionClickHandler = (option) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      <button
        className="text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        {title}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen ? (
        <div className="z-10 mt-1 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600">
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 max-h-80 overflow-y-scroll">
            <div className="py-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  onChange={search}
                />
              </div>
            </div>
            {availableOptions.length ? (
              availableOptions.map((option, index) => (
                <li key={index} onClick={optionClickHandler.bind(this, option)}>
                  <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    <div className="ml-2 text-sm cursor-pointer">
                      <label className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                        <div>{option.main}</div>
                        <p
                          id="helper-radio-text-4"
                          className="text-xs font-normal text-gray-500 dark:text-gray-300 cursor-pointer"
                        >
                          {option.desc}
                        </p>
                      </label>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-2">No results.</li>
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default SearchableDropdown;
