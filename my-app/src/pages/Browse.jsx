import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllJobs, applyToJob, saveJob } from "../apiCalls/authCalls";
import Navbar from "../components/NavBar";

const Browse = () => {
  const { userData } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        const jobArray = Array.isArray(data) ? data : [];
        setJobs(jobArray);
        setFilteredJobs(jobArray);

        // Extract unique skills
        const skillsSet = new Set();
        jobArray.forEach((job) => {
          (job.skillsRequired || []).forEach((skill) => skillsSet.add(skill));
        });
        setAllSkills(Array.from(skillsSet).sort());
      } catch (err) {
        setError(err?.message || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let updatedJobs = [...jobs];

    if (searchTerm) {
      updatedJobs = updatedJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkills.length > 0) {
      updatedJobs = updatedJobs.filter((job) =>
        selectedSkills.every((skill) => job.skillsRequired?.includes(skill))
      );
    }

    setFilteredJobs(updatedJobs);
  }, [searchTerm, selectedSkills, jobs]);

  const toggleSkillFilter = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      const res = await applyToJob(jobId);
      alert(res?.message || "Job application submitted!");
    } catch (err) {
      alert(err?.message || err || "Failed to apply for job.");
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      const res = await saveJob(jobId);
      alert(res?.message || "Job saved successfully!");
    } catch (err) {
      alert(err?.message || err || "Failed to save job.");
    }
  };

  if (loading) return <p className="text-center py-20">Loading jobs...</p>;
  if (error)
    return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-24 px-5 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-black mb-6 text-center">
            Explore Jobs
          </h1>

          {/* Search + Dropdown Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between w-full">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md w-full sm:w-1/2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Skills dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-4 py-2 bg-white text-black rounded-md border border-gray-300 focus:outline-none flex justify-between items-center w-full sm:w-48"
              >
                {selectedSkills.length > 0
                  ? `Skills: ${selectedSkills.join(", ")}`
                  : "Filter by Skills"}
                <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-full sm:w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-56 overflow-y-auto p-2">
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkillFilter(skill)}
                      className={`block w-full text-left px-3 py-1 mb-1 rounded-md text-sm font-medium transition ${
                        selectedSkills.includes(skill)
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 text-black"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">
              No jobs found matching your criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const hasApplied = userData?.appliedJobs?.some(
                  (j) => j._id === job._id
                );
                const isSaved = userData?.savedJobs?.some(
                  (j) => j._id === job._id
                );
                const disabled = hasApplied || isSaved;

                return (
                  <div
                    key={job._id || Math.random()}
                    className={`bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between transition-all ${
                      disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-black mb-2">
                        {job.title || "Untitled Job"}
                      </h2>
                      <p className="text-gray-700 mb-3">
                        {job.description || "No description provided."}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(job.skillsRequired || []).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-black rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => !disabled && handleApplyJob(job._id)}
                        disabled={disabled}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                          disabled
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] text-white hover:opacity-90"
                        }`}
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => !disabled && handleSaveJob(job._id)}
                        disabled={disabled}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                          disabled
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] text-white hover:opacity-90"
                        }`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Browse;
