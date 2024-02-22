import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateProblem() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    category: "",
    solution: "",
    description: "",
    input: ""
  });
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id: fieldId, value } = e.target; // Renamed id to fieldId
    setFormData({ ...formData, [fieldId]: value }); // Use fieldId here
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, difficulty, category, solution, description, input, output, explanation, testcase1 } = formData;
  
    try {
      const result = await axios.put(`/problem/updateproblems/${id}`, {
        title,
        difficulty,
        category,
        solution,
        description,
        input,
        output,
        explanation,
        testcase1,
      });
      // console.log(result);
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
          placeholder="difficulty"
          id="difficulty"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.difficulty}
        />
        <input
          type="text"
          placeholder="category"
          id="category"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          value={formData.category}
        />
        <input
          type="text"
          placeholder="solution"
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
        <label htmlFor="output" className="text-black font-medium ">Enter Sample Output</label>
        <input
          type="text"
          placeholder="output"
          id="output"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
          value={formData.output}
        />
        <label htmlFor="explanation" className="text-black font-medium ">Enter Explanation</label>
        <input
          type="text"
          placeholder="Explanation"
          id="explanation"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
          value={formData.explanation}
        />
        <label htmlFor="testcase1" className="text-black font-medium ">Enter Test case 1</label>
        <input
          type="text"
          placeholder="Test case1"
          id="testcase1"
          className="bg-slate-100 p-3  outline-none"
          onChange={handleChange}
          value={formData.testcase1}
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
