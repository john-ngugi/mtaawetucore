// KisiiForm.tsx

import { useState } from "react";

interface KisiiFormProps {
  options: string[];
  heading: string;
  onChange: (value: string) => void;
  subOptions?: { [key: string]: string[] };
  onSubOptionChange?: (value: string) => void;
}

const KisiiForm = ({ options, heading, onChange, subOptions, onSubOptionChange }: KisiiFormProps) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  const handleSubOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (onSubOptionChange) {
      onSubOptionChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label className="text-white mb-2">{heading}</label>
      <select
        className="p-2 w-full rounded text-gray-700 border border-gray-300 focus:outline-none focus:border-blue-500"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Select {heading}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      
      {/* Show sub-options dropdown if available for the selected option */}
      {selectedOption && subOptions && subOptions[selectedOption] && (
        <div className="mt-2">
          <label className="text-white mb-2">Sub-option for {selectedOption}</label>
          <select
            className="p-2 w-full rounded text-gray-700 border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleSubOptionChange}
          >
            <option value="">Select a Sub-option</option>
            {subOptions[selectedOption].map((subOption) => (
              <option key={subOption} value={subOption}>
                {subOption}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default KisiiForm;
