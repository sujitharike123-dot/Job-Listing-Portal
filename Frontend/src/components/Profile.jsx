import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    axios
      .get(`http://127.0.0.1:8000/api/accounts/candidate/profile/?email=${email}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {profile ? (
        <div className="bg-[#111827] p-6 rounded-xl w-96">
          <img
            src={
              profile.profile_image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-24 h-24 rounded-full mb-4 mx-auto"
          />

          <h2 className="text-center text-2xl font-semibold">
            {profile.username}
          </h2>

          <p className="text-center text-gray-300">{profile.email}</p>
          <p className="text-center text-gray-300">
            {profile.mobile_number}
          </p>

          {profile.resume && (
            <a
              href={`http://127.0.0.1:8000${profile.resume}`}
              target="_blank"
              className="block text-blue-400 mt-4 text-center"
            >
              View Resume
            </a>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
