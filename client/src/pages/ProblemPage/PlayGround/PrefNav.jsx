import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PrefNav({ selectedLanguage, setSelectedLanguage }) {
  const options = ['cpp','java', 'py'];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue); // Update selectedLanguage instead of selectedOption
  };

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <div className="text-m text-label-2 dark:text-dark-label-2">
          <form>
              
              <select
                value={selectedLanguage}
                onChange={handleOptionChange}
                className="ml-2 p-2 rounded bg-dark-fill-3 text-white border border-transparent focus:outline-none focus:ring-gray-400"
              >
                <option style={{ backgroundColor:`black` }}>Select Option</option>
                {options.map(option => (
                  <option key={option} value={option} style={{ backgroundColor: "gray" }}>{option}</option>
                ))}
              </select>
          </form>
        </div>
      </div>
    </div>
  );
}
