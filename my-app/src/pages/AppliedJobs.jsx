import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { getAppliedJobs } from "../apiCalls/authCalls";

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAppliedJobs();
        setJobs(data);
      } catch {
        setError("Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleJob = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 pt-24">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Jobs You Applied To
        </h1>

        {loading && <p className="text-gray-500">Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="text-gray-700">You haven’t applied to any jobs yet.</p>
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

                {/* Expanded job details */}
                {expandedJobId === job._id && (
                  <div className="mt-2 text-gray-700 space-y-1">
                    <p><strong>Company:</strong> {job.company || "N/A"}</p>
                    <p><strong>Description:</strong> {job.description}</p>
                    <p>
                      <strong>Skills Required:</strong>{" "}
                      {job.skillsRequired.join(", ")}
                    </p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <p>
                      <strong>Posted By:</strong>{" "}
                      {job.postedBy?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Posted At:</strong>{" "}
                      {new Date(job.postedAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Applied On:</strong>{" "}
                      {new Date(job.appliedAt).toLocaleDateString()}
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

export default AppliedJobs;
