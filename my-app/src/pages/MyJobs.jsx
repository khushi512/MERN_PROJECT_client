import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { getMyJobs } from "../apiCalls/authCalls";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await getMyJobs();
        setJobs(data);
      } catch {
        setError("Failed to load your jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  const toggleJob = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto pt-24 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">My Jobs</h1>

        {loading && <p className="text-gray-500">Loading your jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="text-gray-700">You haven’t posted any jobs yet.</p>
        )}

        {!loading && !error && jobs.length > 0 && (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="p-4 border rounded-md hover:shadow-md transition"
              >
                {/* Header clickable */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleJob(job._id)}
                >
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <span className="text-gray-400">
                    {expandedJobId === job._id ? "-" : "+"}
                  </span>
                </div>

                {/* Expanded details */}
                {expandedJobId === job._id && (
                  <div className="mt-2 text-gray-700 space-y-1">
                    <p><strong>Description:</strong> {job.description}</p>
                    <p>
                      <strong>Skills Required:</strong>{" "}
                      {job.skillsRequired.join(", ")}
                    </p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <p>
                      <strong>Applicants:</strong>{" "}
                      {job.applicants?.length > 0
                        ? job.applicants.map((a) => a.name).join(", ")
                        : "None"}
                    </p>
                    <p>
                      <strong>Posted At:</strong>{" "}
                      {new Date(job.postedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default MyJobs;
