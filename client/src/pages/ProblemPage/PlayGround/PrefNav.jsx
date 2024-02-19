import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PrefNav() {
  const [selectedOption, setSelectedOption] = useState("");

  const options = ['cpp', 'java', 'py'];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/problem/example', {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { selectedOption }, // Pass selectedOption as a query parameter
        });

        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, [selectedOption]); // Add selectedOption as a dependency to re-run useEffect when it changes

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <div className="text-m text-label-2 dark:text-dark-label-2">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="font-medium transition-all focus:outline-none bg-dark-fill-3 hover:bg-dark-fill-2 rounded-sm px-4 py-1 cursor-pointer whitespace-nowrap text-white"
          >
            <option value="" className="bg-dark-fill-3 hover:bg-dark-fill-2 text-white">Select an option</option>
            {options.map(option => (
              <option key={option} value={option} className="bg-dark-fill-3 hover:bg-dark-fill-2 text-white">{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
