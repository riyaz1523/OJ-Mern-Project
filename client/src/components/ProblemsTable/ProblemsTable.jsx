import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ProblemsTable() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [problems, setProblems] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [problemCount, setproblemCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstindex = lastIndex - recordsPerPage;
  const records = problems.slice(firstindex, lastIndex);
  const npage = Math.ceil(problems.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading delay for 3000ms
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const result = await axios.get("http://localhost:3000/problem/");
        setProblems(result.data);
        setLoadingProblems(false); // Set loading state to false after data fetching

        const countResult = await axios.get(
          "http://localhost:3000/api/user/countuser"
        );
        setUserCount(countResult.data);

        const problemCountResult = await axios.get(
          "http://localhost:3000/problem/countProblem"
        );
        setproblemCount(problemCountResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingProblems(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/problem/deleteProblem/${id}`
      );
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
      <h1
        className="text-2xl text-center text-gray-700 text-white font-medium
					uppercase mt-10 mb-5"
      >
        &ldquo; A New Way to Learn &rdquo;
      </h1>
      <h3 className="text-l text-center font-semibold text-white mt-6">
        Total Count of Users:{" "}
        <span className="text-green-500">{userCount.count}</span>
      </h3>
      <h3 className="text-l  text-center font-semibold text-white mt-4">
        Total Count of Problems:{" "}
        <span className="text-yellow-500">{problemCount.count}</span>
      </h3>

      <table className="text-sm text-left text-gray-500 text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
        <thead className="text-xs text-white uppercase dark:text-gray-400 border-b">
          <tr className={`${problems.title % 2 == 1 ? "red" : ""}`}>
            <th scope="col" className="px-1 py-3 w-0 font-medium">
              Status
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium w-32">
              Title
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Difficulty
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Category
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Solution
            </th>
            <th scope="col" className="px-6 py-3 w-0 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-white">
          {records.map((problems, idx) => {
            const difficulyColor =
              problems.difficulty === "Easy"
                ? "text-green-500"
                : problems.difficulty === "Medium"
                ? "text-yellow-500"
                : "text-red-500";

            return (
              <tr
                key={idx}
                className={`${idx % 2 === 1 ? "bg-dark-layer-1" : ""}`}
              >
                <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                  {/* <BsCheckCircle fontSize={"18"} width="18" /> */}
                  {problems.status ? `active` : `inactive`}
                </th>
                <td className="px-1 py-3 w-0 w-32">
                  {problems.link ? (
                    <Link
                      to={`/workspace/${problems._id}`}
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      {problems.title}
                    </Link>
                  ) : (
                    <Link
                      to={`/workspace/${problems._id}`}
                      className="hover:text-blue-600 cursor-pointer w-32"
                    >
                      {problems.title}
                    </Link>
                  )}
                </td>
                <td className={`px-6 py-3 w-0 ${difficulyColor}`}>
                  {problems.difficulty}
                </td>
                <td className="px-6 py-3 w-0">{problems.category}</td>
                <td className="px-6 py-3 w-0">coming soon...</td>
                <td className="px-6 py-3 w-0 text-lg">
                  <Link to={`/updateProblem/${problems._id}`}>
                    <button className="text-16px">
                      <FaEdit />
                    </button>
                  </Link>
                  &nbsp;
                  <button
                    className="text-16px"
                    onClick={(e) => handleDelete(problems._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
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
            <button
              className="px-3 py-1 mr-1 bg-dark-fill-3 text-white rounded-md hover:bg-gray-8"
              onClick={prePage}
            >
              Prev
            </button>
          </li>
          {numbers.map((n, i) => (
            <li key={i}>
              <button
                className={`px-3 py-1 mx-1 rounded-md ${
                  currentPage === n
                    ? "bg-dark-fill-3 text-white"
                    : "dark-fill-2 hover:bg-gray-8 text-white"
                }`}
                onClick={() => changeCPage(n)}
              >
                {n}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 ml-1 bg-dark-fill-3 text-white rounded-md hover:bg-gray-8"
              onClick={nextPage}
            >
              Next
            </button>
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
