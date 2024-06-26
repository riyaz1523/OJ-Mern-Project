import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SideNav from './SideNav';

export default function index() {
  const [userCount, setUserCount] = useState([]);
  const [problemCount, setproblemCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const [countResult, problemCountResult] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/countuser`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/problem/countProblem`),
        ]);

        setUserCount(countResult.data);
        setproblemCount(problemCountResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='bg-dark-layer-2 h-screen'>
      <SideNav />
      {/* <h3 className="text-l text-center font-semibold text-white  ">
        Total Count of Users:
        <span className="text-green-500">{userCount.count}</span>
      </h3>
      <h3 className="text-l  text-center font-semibold text-white mt-4">
        Total Count of Problems:
        <span className="text-yellow-500">{problemCount.count}</span>
      </h3> */}
    </div>
  )
}
