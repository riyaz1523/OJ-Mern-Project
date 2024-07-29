import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProblemsTable from "../components/ProblemsTable/ProblemsTable";
import SignIn from "./SignIn"
import AdminPage from '../pages/Admin/AdminPage'
import LandingPage from "../components/LandingPage";
export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative overflow-x-auto mx-auto h-screen px-6 pb-10 bg-dark-layer-2 text-black">
      {currentUser ? <ProblemsTable /> : <LandingPage />}
      {currentUser?.isAdmin && <AdminPage />}
    </div>
  );
}
