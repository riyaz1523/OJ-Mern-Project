import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProblemsTable from "../components/ProblemsTable/ProblemsTable";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative overflow-x-auto mx-auto h-screen px-6 pb-10 bg-dark-layer-2 text-white">
      {currentUser && (
        <>
          <ProblemsTable />
        </>
      )}
      {!currentUser && (
        <>
          <h1 className="text-3xl font-bold  mb-4 text-white">
            Welcome to my Online Judge
          </h1>
          <p className="mb-4 text-white"></p>
          <p className="mb-4 text-white">
            The front-end of the application is built with React and uses React
            Router for client-side routing. The back-end is built with Node.js
            and Express, and uses MongoDB as the database. Authentication is
            implemented using JSON Web Tokens (JWT).
          </p>
          {/* <p className='mb-4 text-slate-700'>
      This application is intended as a starting point for building full-stack
      web applications with authentication using the MERN stack.
    </p> */}
        </>
      )}
    </div>
  );
}
