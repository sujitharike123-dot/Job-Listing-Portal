// Frontend/src/components/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const JOBS_PER_PAGE = 3;


const JOB_DATA = [
  {
    id: 1,
    company: "Amazon",
    title: "Senior UI/UX Designer",
    location: "Bengaluru, KA",
    schedule: "Full time",
    level: "Senior level",
    remoteType: "Hybrid",
    salaryInr: 250000, // per month
    postedOn: "2023-05-20",
    tags: ["Product design", "Figma", "Mobile"],
  },
  {
    id: 2,
    company: "Google",
    title: "Junior UI/UX Designer",
    location: "Hyderabad, TS",
    schedule: "Full time",
    level: "Junior level",
    remoteType: "Remote",
    salaryInr: 150000,
    postedOn: "2023-02-04",
    tags: ["Web apps", "User research"],
  },
  {
    id: 3,
    company: "Dribbble",
    title: "Senior Motion Designer",
    location: "Remote",
    schedule: "Part time",
    level: "Senior level",
    remoteType: "Remote",
    salaryInr: 180000,
    postedOn: "2023-01-29",
    tags: ["Animation", "After Effects"],
  },
  {
    id: 4,
    company: "Twitter",
    title: "UX Designer",
    location: "Mumbai, MH",
    schedule: "Full time",
    level: "Mid level",
    remoteType: "On-site",
    salaryInr: 120000,
    postedOn: "2023-04-11",
    tags: ["Dashboards", "Prototyping"],
  },
  {
    id: 5,
    company: "Airbnb",
    title: "Graphic Designer",
    location: "Remote",
    schedule: "Part time",
    level: "Mid level",
    remoteType: "Remote",
    salaryInr: 90000,
    postedOn: "2023-04-02",
    tags: ["Branding", "Illustration"],
  },
  {
    id: 6,
    company: "Apple",
    title: "Product Designer",
    location: "Bengaluru, KA",
    schedule: "Full time",
    level: "Senior level",
    remoteType: "On-site",
    salaryInr: 220000,
    postedOn: "2023-01-18",
    tags: ["Design systems", "Prototyping"],
  },
];

function formatSalaryInr(num) {
  if (!num) return "₹0 / month";
  return `₹${num.toLocaleString("en-IN")}/month`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Home() {
  // ---------- PROFILE (same as before, just cleaned) ----------
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    axios
      .get(
        `http://127.0.0.1:8000/api/accounts/candidate/profile/?email=${email}`
      )
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ---------- JOBS / FILTERS / SORT / PAGINATION / SAVE ----------
  const [jobs] = useState(JOB_DATA);
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    fullTime: true,
    partTime: false,
    internship: false,
    remote: false,
    onsite: false,
    minSalary: 0,
    maxSalary: 300000,
  });
  const [savedJobs, setSavedJobs] = useState(new Set());

  // load saved jobs from localStorage (bookmarks)
  useEffect(() => {
    const saved = localStorage.getItem("saved_jobs");
    if (saved) {
      setSavedJobs(new Set(JSON.parse(saved)));
    }
  }, []);

  const updateSavedJobs = (nextSet) => {
    setSavedJobs(nextSet);
    localStorage.setItem("saved_jobs", JSON.stringify(Array.from(nextSet)));
  };

  const toggleSaveJob = (id) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("saved_jobs", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // change filter helpers
  const toggleFilter = (key) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSalaryChange = (e, key) => {
    const value = Number(e.target.value) || 0;
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  // apply filters + sorting
  const filteredAndSortedJobs = (() => {
    let result = [...jobs];

    // schedule filter
    const scheduleSelected = [];
    if (filters.fullTime) scheduleSelected.push("Full time");
    if (filters.partTime) scheduleSelected.push("Part time");
    if (filters.internship) scheduleSelected.push("Internship");

    if (scheduleSelected.length > 0) {
      result = result.filter((job) => scheduleSelected.includes(job.schedule));
    }

    // remote / onsite filter
    if (filters.remote && !filters.onsite) {
      result = result.filter((job) => job.remoteType === "Remote");
    } else if (!filters.remote && filters.onsite) {
      result = result.filter((job) => job.remoteType !== "Remote");
    }

    // salary range
    result = result.filter(
      (job) =>
        job.salaryInr >= filters.minSalary &&
        job.salaryInr <= filters.maxSalary
    );

    // sorting
    result.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.postedOn) - new Date(a.postedOn);
      }
      if (sortBy === "oldest") {
        return new Date(a.postedOn) - new Date(b.postedOn);
      }
      if (sortBy === "salary_high") {
        return b.salaryInr - a.salaryInr;
      }
      if (sortBy === "salary_low") {
        return a.salaryInr - b.salaryInr;
      }
      return 0;
    });

    return result;
  })();

  // pagination
  const totalPages = Math.ceil(filteredAndSortedJobs.length / JOBS_PER_PAGE);
  const startIndex = (page - 1) * JOBS_PER_PAGE;
  const visibleJobs = filteredAndSortedJobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages || 1, p + 1));

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex bg-[#0B0F19] text-white">
      {/* LEFT SIDEBAR – same look as before */}
      <div className="w-80 bg-[#111827] p-8 flex flex-col justify-between">
        <div>
          {/* Profile */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={
                profile?.profile_image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-14 h-14 rounded-full bg-white"
            />
            <div>
              <h2 className="text-white text-xl font-semibold">
                {profile?.username || "Loading..."}
              </h2>
              <p className="text-gray-400 text-sm">{profile?.email}</p>
              <a href="/profile" className="text-blue-400 text-sm cursor-pointer">
                View Profile →
              </a>
            </div>
          </div>

          <hr className="border-gray-700 my-4" />

          {/* Menu */}
          <div className="space-y-4 text-gray-300">
            <p className="hover:text-white cursor-pointer">
              Registrations / Applications
            </p>
            <p className="hover:text-white cursor-pointer">
              My Jobs & Internships
            </p>
            <p className="hover:text-white cursor-pointer">Watchlist</p>
            <p className="hover:text-white cursor-pointer">Recently Viewed</p>
            <p className="hover:text-white cursor-pointer">Settings</p>
          </div>

          <hr className="border-gray-700 my-6" />

          <p className="text-gray-500 text-sm mb-2">For Organizers</p>

          <div className="space-y-4 text-gray-300">
            <p className="hover:text-white cursor-pointer">
              Organizer Dashboard
            </p>
            <p className="hover:text-white cursor-pointer">Contact Us</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
          onClick={() => {
            localStorage.removeItem("user_type");
            localStorage.removeItem("email");
            window.location.href = "/candidate-login";
          }}
        >
          Logout
        </button>
      </div>

      {/* RIGHT SIDE – filters + job cards */}
      <div className="flex-1 p-10">
        {/* Header + Sort */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Recommended Jobs</h1>
            <p className="text-gray-400 text-sm">
              {filteredAndSortedJobs.length} jobs found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-[#111827] text-sm text-gray-200 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="salary_high">Salary: High to Low</option>
              <option value="salary_low">Salary: Low to High</option>
            </select>
          </div>
        </div>

        {/* Content: Filters column + cards grid */}
        <div className="flex gap-6">
          {/* Filters panel */}
          <div className="w-64 bg-[#111827] rounded-2xl p-5 border border-gray-800 h-fit">
            <h2 className="font-semibold mb-4">Filters</h2>

            <p className="text-xs text-gray-400 mb-2 uppercase">
              Working schedule
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.fullTime}
                  onChange={() => toggleFilter("fullTime")}
                />
                <span>Full time</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.partTime}
                  onChange={() => toggleFilter("partTime")}
                />
                <span>Part time</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.internship}
                  onChange={() => toggleFilter("internship")}
                />
                <span>Internship</span>
              </label>
            </div>

            <p className="text-xs text-gray-400 mb-2 uppercase">
              Work location
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.remote}
                  onChange={() => toggleFilter("remote")}
                />
                <span>Remote</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onsite}
                  onChange={() => toggleFilter("onsite")}
                />
                <span>On-site / Hybrid</span>
              </label>
            </div>

            <p className="text-xs text-gray-400 mb-2 uppercase">
              Salary (INR / month)
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-10 text-xs text-gray-400">Min</span>
                <input
                  type="number"
                  value={filters.minSalary}
                  onChange={(e) => handleSalaryChange(e, "minSalary")}
                  className="flex-1 bg-[#0B0F19] border border-gray-700 rounded px-2 py-1 text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10 text-xs text-gray-400">Max</span>
                <input
                  type="number"
                  value={filters.maxSalary}
                  onChange={(e) => handleSalaryChange(e, "maxSalary")}
                  className="flex-1 bg-[#0B0F19] border border-gray-700 rounded px-2 py-1 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Jobs cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white text-black rounded-3xl p-5 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{formatDate(job.postedOn)}</span>
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-lg cursor-pointer"
                      title={
                        savedJobs.has(job.id)
                          ? "Remove from saved"
                          : "Save this job"
                      }
                    >
                      {savedJobs.has(job.id) ? "★" : "☆"}
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 mb-1">{job.company}</p>
                  <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{job.location}</p>

                  <div className="flex flex-wrap gap-2 mb-3 text-[11px]">
                    <span className="px-2 py-1 rounded-full bg-gray-100">
                      {job.schedule}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100">
                      {job.level}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100">
                      {job.remoteType}
                    </span>
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded-full bg-gray-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-semibold">
                      {formatSalaryInr(job.salaryInr)}
                    </p>
                    <p className="text-[11px] text-gray-500">Salary per month</p>
                  </div>
                  <button className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-900 cursor-pointer">
                    Details
                  </button>
                </div>
              </div>
            ))}

            {visibleJobs.length === 0 && (
              <p className="text-gray-400 text-sm">
                No jobs match the current filters.
              </p>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-3 mt-8 text-sm">
            <button
              onClick={goPrev}
              disabled={page === 1}
              className="px-3 py-1 rounded-lg border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#111827] cursor-pointer"
            >
              Prev
            </button>
            <span className="text-gray-300">
              Page{" "}
              <span className="font-semibold text-white">
                {page}/{totalPages}
              </span>
            </span>
            <button
              onClick={goNext}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#111827] cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



