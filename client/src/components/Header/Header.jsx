import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../Logout/Logout";
import { useState, useEffect, useRef } from "react";
import { signOut } from "../../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false); // Close the dropdown when location changes
  }, [location]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
          await fetch('/api/auth/signout');
          dispatch(signOut())
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="bg-dark-layer-1 text-white" >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold text-xl">Online Judge</h1>
        </Link>
        {currentUser?.isAdmin && (
          <Link to="/createProblem">
            <button
              disabled={loading}
              className="bg-dark-layer-2 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-center"
            >
              <p className="flex">Add problems</p>
            </button>
          </Link>
        )}
        <ul className="flex gap-4">
        {/* <input
          type="text"
          className="search bg-gray-200 border border-gray-300  rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          // onChange={(e) => setQuery(e.target.value)}
        /> */}
          {currentUser && <li><h2>Hi {currentUser.username}</h2></li>}
          {currentUser ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <img
                  onClick={toggleDropdown}
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover cursor-pointer"
                />
                {isDropdownOpen && (
                  <div
                    className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                    style={{ top: "calc(100% + 10px)", right: -70 }}
                  >
                    <ul>
                      <li>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg">Profile</Link>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Earnings</a>
                      </li>
                      <li>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-lg" onClick={handleSignOut}>Sign out</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* <Logout /> */}
            </>
          ) : (
            <Link to="/profile">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
