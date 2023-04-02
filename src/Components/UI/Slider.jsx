const Slider = ({ label, min, max, value, step, onChange, className }) => {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={onChange}
      />
    </div>
  );
};

export default Slider;
