const Button = ({ className, onClick, children }) => {
  return (
    <button
      type="button"
      className={`${className} text-white bg-gradient-to-br to-emerald-600 from-sky-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
