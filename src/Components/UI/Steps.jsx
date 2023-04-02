const Steps = ({ steps, maxHeight }) => {
  return (
    <ol
      className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400"
      style={{ maxHeight: maxHeight }}
    >
      {steps.map((step, index) => (
        <li className="mb-10 ml-6" key={index}>
          <span
            className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${
              step.completed ? "bg-green-200" : "bg-gray-100"
            }`}
          >
            {step.completed ? (
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </span>
          <h3 className="font-medium leading-tight">{step.title}</h3>
          <p className="text-sm">{step.details}</p>
        </li>
      ))}
    </ol>
  );
};

export default Steps;
