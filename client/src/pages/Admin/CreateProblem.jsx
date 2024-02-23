import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateProblem() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/problem/createProblem", formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create Problem
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="title" className="text-black font-medium ">
          Enter Title
        </label>
        <input
          type="text"
          placeholder="Title"
          id="title"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="difficulty" className="text-black font-medium ">
          Enter Difficulty
        </label>
        <input
          type="text"
          placeholder="Difficulty"
          id="difficulty"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="category" className="text-black font-medium ">
          Enter Category
        </label>
        <input
          type="text"
          placeholder="Category"
          id="category"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="solution" className="text-black font-medium ">
          Enter Solution
        </label>
        <input
          type="text"
          placeholder="Solution"
          id="solution"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="description" className="text-black font-medium ">
          Enter Description
        </label>
        <textarea
          placeholder="Description"
          id="description"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="input" className="text-black font-medium ">
          Enter Sample Input
        </label>
        <input
          type="text"
          placeholder="Input"
          id="input"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="output" className="text-black font-medium ">
          Enter Sample Output
        </label>
        <input
          type="text"
          placeholder="Output"
          id="output"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="explanation" className="text-black font-medium ">
          Enter Explanation
        </label>
        <input
          type="text"
          placeholder="Explanation"
          id="explanation"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="testcase1.input" className="text-black font-medium ">
          Enter Sample Test Case 1 Input
        </label>
        <input
          type="text"
          placeholder="Test case 1 input"
          id="testcase1.input"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <label htmlFor="testcase1.output" className="text-black font-medium ">
          Enter Sample Test Case 1 Output
        </label>
        <input
          type="text"
          placeholder="Test case 1 output"
          id="testcase1.output"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
