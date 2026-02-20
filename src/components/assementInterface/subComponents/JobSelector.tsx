import React from "react";
import type { Job } from "@/services/interfaces/CandidateScreening";
interface JobSelectorProps {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
}

const JobSelector: React.FC<JobSelectorProps> = ({ jobs, selectedJob, setSelectedJob }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">Select Job Position</label>
    <select
      value={selectedJob?.id || ""}
      onChange={(e) => {
        const job = jobs.find((j) => j.id == e.target.value);
        setSelectedJob(job || null);
      }}
      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
    >
      <option value="">Select a job...</option>
      {jobs.map((job) => (
        <option key={job.id} value={job.id}>
          {job.title} - {job.location}
        </option>
      ))}
    </select>
  </div>
);

export default JobSelector;