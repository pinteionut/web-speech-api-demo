const Heading = ({ main, additional, subtext }) => {
  return (
    <>
      <h1 className="mt-10 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="mr-3 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {main}
        </span>
        {additional}
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {subtext}
      </p>
    </>
  );
};

export default Heading;
