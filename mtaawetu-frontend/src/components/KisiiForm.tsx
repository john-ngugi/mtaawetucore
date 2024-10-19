interface Props {
  options: string[];
  heading: string;
  onChange: (value: string) => void;
}

function KisiiForm({ options, heading, onChange }: Props) {
  return (
    <div className="rounded w-full mb-4">
      <label className="block mb-1 text-sm text-white mt-2 font-semibold">
        {heading}
      </label>
      <div className="w-full max-w-sm md:max-w-lg min-w-[200px]">
        <div className="relative">
          <select
            className="w-full bg-gray-800 text-white text-sm border border-gray-300 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-500 shadow-sm appearance-none cursor-pointer"
            defaultValue="" // Set the default value to an empty string
            onChange={(e) => onChange(e.target.value)}
          >
            {/* Default option as a placeholder */}
            <option value="" disabled>
              -- Select an option --
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default KisiiForm;
