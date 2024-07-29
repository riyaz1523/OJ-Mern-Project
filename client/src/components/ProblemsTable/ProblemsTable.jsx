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

        const result = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/problem/`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        setProblems(result.data);
        setLoadingProblems(false);
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
      setProblems(problems.filter((problem) => problem._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
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
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </div>

      <div className="bg-dark-layer-2 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-dark-divider-border-2">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Solution</th>
              {currentUser?.isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-dark-layer-1 divide-y divide-dark-divider-border-2">
            {records
              .filter((problem) => problem.title.toLowerCase().includes(query))
              .map((problem, idx) => {
                const index = firstIndex + idx + 1;
                const difficultyColor = problem.difficulty === "Easy"
                  ? "text-green-500"
                  : problem.difficulty === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500";

                return (
                  <tr key={problem._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-dark-green-s">
                      {problem.solvedBy.some(sb => sb.user === currentUser._id && sb.status)
                        ? <BsCheckCircle fontSize={"18"} width="18" className="text-green-500" />
                        : <BsCheckCircle fontSize={"18"} width="18" className="text-gray-500" />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      <Link to={`/workspace/${problem._id}`} className="hover:text-blue-600 cursor-pointer">
                        {index}.{problem.title}
                      </Link>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${difficultyColor}`}>
                      {problem.difficulty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {problem.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      coming soon...
                    </td>
                    {currentUser?.isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-lg">
                        <Link to={`/updateProblem/${problem._id}`}>
                          <button className="text-16px"><FaEdit /></button>
                        </Link>
                        &nbsp;
                        <button className="text-16px" onClick={() => handleDelete(problem._id)}><MdDelete /></button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {loadingProblems && (
        <div className="w-full mt-4">
          <LoadingSkeleton />
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
    <div className="bg-dark-layer-2 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-dark-divider-border-2">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
              <div className="bg-dark-gray-6 h-4 rounded-md w-24"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
              <div className="bg-dark-gray-6 h-4 rounded-md w-32"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
              <div className="bg-dark-gray-6 h-4 rounded-md w-24"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
              <div className="bg-dark-gray-6 h-4 rounded-md w-24"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
              <div className="bg-dark-gray-6 h-4 rounded-md w-32"></div>
            </th>
            { /* Conditionally render the Actions column skeleton */ }
            {/* {currentUser?.isAdmin && (
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
                <div className="bg-dark-gray-6 h-4 rounded-md w-24"></div>
              </th>
            )} */}
          </tr>
        </thead>
        <tbody className="bg-dark-layer-1 divide-y divide-dark-divider-border-2">
          {[...Array(7)].map((_, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-dark-gray-6 h-6 rounded-md w-6"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-dark-gray-6 h-6 rounded-md w-32"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-dark-gray-6 h-6 rounded-md w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-dark-gray-6 h-6 rounded-md w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="bg-dark-gray-6 h-6 rounded-md w-32"></div>
              </td>
              {/* {currentUser?.isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="bg-dark-gray-6 h-6 rounded-md w-24"></div>
                </td>
              )} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
