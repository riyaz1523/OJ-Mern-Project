import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/user/userRanking`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching top users:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-dark-layer-1 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Top 10 Users</h1>
      {loading ? (
        <SkeletonLoader /> 
      ) : (
        <div className="bg-dark-layer-2 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-dark-divider-border-2">
            <thead className="bg-dark-layer-2">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">Solved Problems</th>
              </tr>
            </thead>
            <tbody className="bg-dark-layer-1 divide-y divide-dark-divider-border-2">
              {users.map((user) => (
                <tr key={user.username}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.solvedProblemsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const SkeletonLoader = () => {
    return (
      <div className="bg-dark-layer-2 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-dark-divider-border-2">
          <thead className="bg-dark-layer-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
                <div className="bg-dark-gray-6 h-4 rounded-md w-24"></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
                <div className="bg-dark-gray-6 h-4 rounded-md w-32"></div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-gray-7 uppercase tracking-wider">
                <div className="bg-dark-gray-6 h-4 rounded-md w-32"></div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark-layer-1 divide-y divide-dark-divider-border-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-10 h-10 bg-dark-gray-6 rounded-full"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-gray-6">
                  <div className="bg-dark-gray-6 h-4 rounded-md w-32"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-gray-6">
                  <div className="bg-dark-gray-6 h-4 rounded-md w-24"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };  

export default Dashboard;
