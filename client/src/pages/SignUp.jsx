import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
  
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // console.log("Response Data:", response.data);
      setLoading(false);
  
      if (!response.data.success) {
        setError(true);
        toast.error(response.data.message || "Signup failed");
        return;
      }
  
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
      const errorMsg = error.response ? error.response.data.message : error.message;
      toast.error(`Error occurred while submitting the form: ${errorMsg}`);
      console.error('Error:', error.response ? error.response.data : error);
    }
  };
  

  return (
    <div className="bg-dark-layer-2 h-screen text-white">
      <div className="p-3 max-w-lg mx-auto ">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg outline-none text-black"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg outline-none text-black"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg outline-none text-black"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        {/* <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p> */}
      </div>
      <ToastContainer />
    </div>
  );
}
