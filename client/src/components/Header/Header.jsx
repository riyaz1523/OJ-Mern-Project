import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/signout`);
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-dark-layer-1 text-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="text-white hover:text-gray-300 transition-colors">
          <h1 className="font-extrabold text-2xl tracking-wide">Online Judge</h1>
        </Link>
        {currentUser?.isAdmin && (
          <Link to="/createProblem">
            <button
              disabled={loading}
              className="bg-dark-layer-2 text-white p-3 rounded-lg uppercase hover:bg-dark-layer-3 transition-colors disabled:opacity-80"
            >
              <p className="flex text-lg font-semibold">Add problems</p>
            </button>
          </Link>
        )}
        <ul className="flex gap-6 items-center">
          {/* <input
            type="text"
            className="search bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            // onChange={(e) => setQuery(e.target.value)}
          /> */}
          {currentUser && (
            <>
              <li>
                <Link to='/problems'>
                  <h2 className="text-lg font-medium">Problems</h2>
                </Link>
              </li>
              <li>
                <h2 className="text-lg font-medium">Hi {currentUser.username}</h2>
              </li>
            </>
          )}
          {currentUser ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <img
                  onClick={toggleDropdown}
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer border-2 border-dark-gray-6 hover:border-gray-400 transition-all"
                />
                {isDropdownOpen && (
                  <div
                    className="absolute mt-2 w-48 bg-dark-layer-2 text-white rounded-lg shadow-lg z-10"
                    style={{ top: "calc(100% + 10px)", right: -70 }}
                  >
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm hover:bg-dark-layer-3 transition-colors"
                        >
                          Profile
                        </Link>
                      </li>
                      {/* <li>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-dark-layer-3">Settings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-dark-layer-3">Earnings</a>
                      </li> */}
                      <li>
                        <p
                          className="block px-4 py-2 text-sm hover:bg-dark-layer-3 cursor-pointer transition-colors"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/profile">
              <li className="text-lg font-medium hover:text-gray-300 transition-colors">Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
