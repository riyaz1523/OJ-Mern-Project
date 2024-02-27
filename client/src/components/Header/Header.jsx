import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";
import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-dark-layer-1 text-white">
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
          <Link to="/">
            <li>Home</li>
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile">
                <li>
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </li>
              </Link>
              <Logout />
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
