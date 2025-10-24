import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSavedJobs, removeSavedJob } from "../apiCalls/authCalls";
import Navbar from "../components/NavBar";

const Saved = () => {
  const { userData } = useSelector((state) => state.user);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const jobs = await getSavedJobs();
        setSavedJobs(jobs || []);
      } catch (error) {
        setErrorMsg(error.message || "Failed to load saved jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const handleRemove = async (jobId) => {
    try {
      const res = await removeSavedJob(jobId);
      alert(res.message || "Job removed from saved list.");
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      alert(err.message || "Unable to remove job.");
    }
  };

  if (loading) return <p className="text-center py-20">Loading saved jobs...</p>;
  if (errorMsg) return <p className="text-center py-20 text-red-500">{errorMsg}</p>;
  if (!userData) return <p className="text-center py-20 text-gray-700">Please sign in to view saved jobs.</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-24 py-10 px-5 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-black mb-4 text-center">
            Saved Jobs
          </h1>
          <p className="text-gray-700 text-center mb-8">
            All the jobs you’ve saved to check out later.
          </p>

          {savedJobs.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              You haven’t saved any jobs yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-black mb-2">
                      {job.title}
                    </h2>
                    <p className="text-gray-700 mb-3">
                      {job.description || "No description provided."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skillsRequired?.length > 0 ? (
                        job.skillsRequired.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-black rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">No skills listed.</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(job._id)}
                    className="bg-gradient-to-r from-[#48c6ef] to-[#6f86d6] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Saved;
