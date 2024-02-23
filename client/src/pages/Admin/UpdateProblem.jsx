import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateProblem() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    category: "",
    solution: "",
    description: "",
    input: "",
    output: "",
    explanation: "",
    testcase1: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id: fieldId, value } = e.target;
    if (fieldId === "testcase1Input") {
      setFormData({
        ...formData,
        testcase1: {
          ...formData.testcase1,
          input: value,
        },
      });
    } else if (fieldId === "testcase1Output") {
      setFormData({
        ...formData,
        testcase1: {
          ...formData.testcase1,
          output: value,
        },
      });
    } else {
      setFormData({ ...formData, [fieldId]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`/problem/updateproblems/${id}`, formData);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    axios
      .get(`/problem/getProblemsparams/${id}`)
      .then((result) => {
        setFormData(result.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Update Problem
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          id="title"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          type="text"
          placeholder="Difficulty"
          id="difficulty"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.difficulty}
        />
        <input
          type="text"
          placeholder="Category"
          id="category"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.category}
        />
        <input
          type="text"
          placeholder="Solution"
          id="solution"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.solution}
        />
        <input
          type="text"
          placeholder="Description"
          id="description"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.description}
        />
        <input
          type="text"
          placeholder="Input"
          id="input"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.input}
        />
        <label htmlFor="output" className="text-black font-medium ">
          Enter Sample Output
        </label>
        <input
          type="text"
          placeholder="Output"
          id="output"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.output}
        />
        <label htmlFor="explanation" className="text-black font-medium ">
          Enter Explanation
        </label>
        <input
          type="text"
          placeholder="Explanation"
          id="explanation"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.explanation}
        />
        <label htmlFor="testcase1Input" className="text-black font-medium">
          Enter Test case 1 Input
        </label>
        <input
          type="text"
          placeholder="Test case 1 Input"
          id="testcase1Input"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.testcase1.input}
        />

        <label htmlFor="testcase1Output" className="text-black font-medium">
          Enter Test case 1 Output
        </label>
        <input
          type="text"
          placeholder="Test case 1 Output"
          id="testcase1Output"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.testcase1.output}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
