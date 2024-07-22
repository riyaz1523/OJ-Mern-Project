import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ProblemsTable() {
  const { currentUser } = useSelector((state) => state.user);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState("");
  const [userCount, setUserCount] = useState([]);
  const [problemCount, setProblemCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = problems.slice(firstIndex, lastIndex);
  const npage = Math.ceil(problems.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const [result, countResult, problemCountResult] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/problem/status`, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }),
          // axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/countuser`),
          // axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/problem/countProblem`),
        ]);
        setProblems(result.data);
        // setUserCount(countResult.data);
        // setProblemCount(problemCountResult.data);
        setLoadingProblems(false);
        result.data.forEach(problem => {
          console.log(`Problem: ${problem.title}, Status: ${problem.status}`);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingProblems(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/problem/deleteProblem/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  function prePage() {
    if (currentPage != firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage != lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }



  return (
    <>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          className="search bg-gray-200 border border-gray-300 px-4 py-2 mt-10 mb-5 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <table className="text-sm text-left text-gray-500 text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
        <thead className="text-xs text-white uppercase dark:text-gray-400 border-b">
          <tr>
            <th scope="col" className="px-1 py-3 w-0 font-medium">Status</th>
            <th scope="col" className="px-6 py-3 w-0 font-medium w-32">Title</th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">Difficulty</th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">Category</th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">Solution</th>
            {currentUser?.isAdmin && (
              <th scope="col" className="px-6 py-3 w-0 font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="text-white">
          {problems
            .filter((problem) => problem.title.toLowerCase().includes(query))
            .slice(firstIndex, lastIndex)
            .map((problem, idx) => {
              const index = firstIndex + idx + 1;
              const difficultyColor = problem.difficulty === "Easy"
                ? "text-green-500"
                : problem.difficulty === "Medium"
                ? "text-yellow-500"
                : "text-red-500";

                <tr key={idx} className={`${idx % 2 === 1 ? "bg-dark-layer-1" : ""}`}>
                  <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                    {problem.solvedBy.status ? <BsCheckCircle fontSize={"18"} width="18" className="text-green-500" /> : <BsCheckCircle fontSize={"18"} width="18" className="text-gray-500"/>}
                  </th>
                  <td className="px-1 py-3 w-0 w-32">
                    <Link to={`/workspace/${problem._id}`} className="hover:text-blue-600 cursor-pointer">
                      {index}.{problem.title}
                    </Link>
                  </td>
                  <td className={`px-6 py-3 w-0 ${difficultyColor}`}>{problem.difficulty}</td>
                  <td className="px-6 py-3 w-0">{problem.category}</td>
                  <td className="px-6 py-3 w-0">coming soon...</td>
                  {currentUser?.isAdmin && (
                    <td className="px-6 py-3 w-0 text-lg">
                      <Link to={`/updateProblem/${problem._id}`}>
                        <button className="text-16px"><FaEdit /></button>
                      </Link>
                      &nbsp;
                      <button className="text-16px" onClick={(e) => handleDelete(problem._id)}><MdDelete /></button>
                    </td>
                  )}
                </tr>
              
            })}
        </tbody>
      </table>
      {loadingProblems && (
        <div className="w-full animate-pulse">
          {[...Array(recordsPerPage)].map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))}
        </div>
      )}
      <nav className="flex justify-center mt-4">
        <ul className="flex">
          <li>
            <button className="px-3 py-1 mr-1 bg-dark-fill-3 text-white rounded-md hover:bg-gray-8" onClick={prePage}>Prev</button>
          </li>
          {numbers.map((n, i) => (
            <li key={i}>
              <button className={`px-3 py-1 mx-1 rounded-md ${currentPage === n ? "bg-dark-fill-3 text-white" : "dark-fill-2 hover:bg-gray-8 text-white"}`} onClick={() => changeCPage(n)}>{n}</button>
            </li>
          ))}
          <li>
            <button className="px-3 py-1 ml-1 bg-dark-fill-3 text-white rounded-md hover:bg-gray-8" onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex text-left space-x-12 mt-4 px-6 sm:w-7/12 w-full max-w-[1200px] mx-auto">
      <div className="px-1 py-3 w-6 shrink-0 rounded-full bg-dark-layer-1 text-left"></div>
      <div className="px-6 py-3 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="px-6 py-3 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="px-6 py-3 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="px-6 py-3 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
