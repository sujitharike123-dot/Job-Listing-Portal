import React from "react";

export default function CNavbar() {
  const email = localStorage.getItem("user_email");

  const logout = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_email");
    window.location.href = "/candidate-login";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white">
      <div className="font-bold text-lg">JobPortal</div>

      <input
        type="text"
        placeholder="Search jobs"
        className="px-3 py-1 rounded bg-gray-700 text-white"
      />

      <div className="flex items-center gap-4">
        <span>{email}</span>
        <button className="bg-red-500 px-3 py-1 rounded" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
