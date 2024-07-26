import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateProblem() {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    category: "",
    solution: "",
    description: "",
    input: "",
    output: "",
    explanation: "",
    testCases: [{ input: "", output: "" }], // Default field
    solvedBy: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith("testcase")) {
      const index = parseInt(id.split('.')[0].replace('testcase', ''));
      const field = id.split('.')[1];
      setFormData(prev => {
        const testCases = [...prev.testCases];
        testCases[index] = { ...testCases[index], [field]: value };
        return { ...prev, testCases };
      });
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleAddTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", output: "" }]
    }));
  };

  const handleRemoveTestCase = (index) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/problem/createProblem`, formData);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Create Problem</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Form fields */}
        {["title", "difficulty", "category", "solution", "description", "input", "output", "explanation"].map(field => (
          <div key={field} className="flex flex-col gap-2">
            <label htmlFor={field} className="text-black font-medium">{`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              id={field}
              value={formData[field]}
              className="bg-slate-100 p-3 border rounded-md outline-none"
              onChange={handleChange}
            />
          </div>
        ))}
        
        {/* Test Cases */}
        {formData.testCases.map((testCase, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{`Test Case ${index + 1}`}</h2>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor={`testcase${index}.input`} className="text-black font-medium">Enter Input</label>
              <input
                type="text"
                placeholder={`Test case ${index + 1} input`}
                id={`testcase${index}.input`}
                value={testCase.input}
                className="bg-slate-100 p-3 border rounded-md outline-none"
                onChange={handleChange}
              />
              <label htmlFor={`testcase${index}.output`} className="text-black font-medium">Enter Output</label>
              <input
                type="text"
                placeholder={`Test case ${index + 1} output`}
                id={`testcase${index}.output`}
                value={testCase.output}
                className="bg-slate-100 p-3 border rounded-md outline-none"
                onChange={handleChange}
              />
            </div>
            <button type="button" onClick={() => handleRemoveTestCase(index)} className="text-red-500 mt-2">Remove Test Case</button>
          </div>
        ))}
        <button type="button" onClick={handleAddTestCase} className="bg-green-500 text-white p-3 rounded-md mb-4">Add Test Case</button>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
