const List = ({ title, items }) => {
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {title}:
      </h2>
      {items.length ? (
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {items.map((item, index) => (
            <li className="flex items-center" key={index}>
              {item.done ? (
                <svg
                  className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              <span className={item.done ? "line-through" : ""}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nothing</p>
      )}
    </>
  );
};

export default List;
