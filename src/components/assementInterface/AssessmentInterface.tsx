// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchJobsThunk,
//   fetchCandidatesThunk,
// } from "@/services/redux/thunk/assessmentThunk";
// import { RootState, AppDispatch } from "@/services/redux/store";
// // import Navigation from "@/components/Navigation";
// import JobSelector from "./subComponents/JobSelector";
// import StatsCards from "./subComponents/StatsCards";
// import Tabs from "./subComponents/Tabs";
// import CandidatesTable from "./subComponents/CandidatesTable";
// import OverviewTab from "./subComponents/OverviewTab";
// import ResultsManagement from "./subComponents/ResultsManagement";
// import { Navigation } from "lucide-react";

// const AssessmentInterface = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
//     (state: RootState) => state.assessment
//   );
//   const [selectedJob, setSelectedJob] = useState<any>(null);
//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     dispatch(fetchJobsThunk());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedJob) {
//       dispatch(fetchCandidatesThunk(selectedJob.id));
//     }
//   }, [selectedJob, activeTab, dispatch]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navigation />
//       <main className="flex-grow p-6">
//         <h1 className="text-2xl font-bold mb-4 text-gray-900">Assessment Management</h1>

//         <JobSelector jobs={jobs} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />

//         {message && (
//           <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg">{message}</div>
//         )}

//         {selectedJob ? (
//           <>
//             <StatsCards stats={assessmentStats} />
//             <Tabs
//               candidates={candidates}
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//               loading={isLoading}
//             />
//             {activeTab === "overview" && (
//               <OverviewTab candidates={candidates} assessmentStats={assessmentStats} />
//             )}
//             {activeTab === "results" && (
//               <ResultsManagement 
//               candidates={candidates} 
//               selectedJob={selectedJob} 
//               onRefreshCandidates={() =>{
//                 if (selectedJob) {
//                   dispatch(fetchCandidatesThunk(selectedJob.id));
//                 }
//               } } />
//             )}
//             {["pending", "completed", "not_sent", "expired"].includes(activeTab) && (
//               <CandidatesTable
//                 candidates={candidates}
//                 activeTab={activeTab}
//                 selectedJob={selectedJob}
//               />
//             )}
//           </>
//         ) : (
//           <div className="bg-white p-6 text-center rounded-lg border shadow-sm">
//             <p className="text-gray-500">Select a job position to view assessments</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AssessmentInterface;
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchJobsThunk,
  fetchCandidatesThunk,
} from "@/services/redux/thunk/assessmentThunk";

import { RootState, AppDispatch } from "@/services/redux/store";
import { Job, Candidate } from "@/services/interfaces/CandidateScreening";

import JobSelector from "./subComponents/JobSelector";
import StatsCards from "./subComponents/StatsCards";
import Tabs from "./subComponents/Tabs";
import CandidatesTable from "./subComponents/CandidatesTable";
import OverviewTab from "./subComponents/OverviewTab";
import ResultsManagement from "./subComponents/ResultsManagement";

import { Navigation } from "lucide-react";

const AssessmentInterface = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { jobs, candidates, assessmentStats, isLoading, message } = useSelector(
    (state: RootState) => ({
      jobs: state.assessment.jobs as Job[],
      candidates: state.assessment.candidates,
      assessmentStats: state.assessment.assessmentStats,
      isLoading: state.assessment.isLoading,
      message: state.assessment.message,
    })
  );

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch jobs on load
  useEffect(() => {
    dispatch(fetchJobsThunk());
  }, [dispatch]);

  // Fetch candidates when a job or tab changes
  useEffect(() => {
    if (selectedJob) {
      const idNum = Number(selectedJob.id);
      if (!isNaN(idNum)) dispatch(fetchCandidatesThunk(idNum));
    }
  }, [selectedJob, activeTab, dispatch]);

  // Normalize candidate IDs safely
  const normalizedCandidates: Candidate[] = candidates.map((c) => ({
    ...c,
    id: typeof c.id === "string" ? Number(c.id) : c.id,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Assessment Management
        </h1>

        <JobSelector
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />

        {message && (
          <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
            {message}
          </div>
        )}

        {selectedJob ? (
          <>
            <StatsCards stats={assessmentStats} />

            <Tabs
              candidates={normalizedCandidates}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              loading={isLoading}
            />

            {activeTab === "overview" && (
              <OverviewTab
                candidates={normalizedCandidates}
                assessmentStats={assessmentStats}
              />
            )}

            {activeTab === "results" && (
              <ResultsManagement
                candidates={normalizedCandidates}
                selectedJob={selectedJob}
                onRefreshCandidates={() => {
                  const idNum = Number(selectedJob.id);
                  if (!isNaN(idNum)) dispatch(fetchCandidatesThunk(idNum));
                }}
              />
            )}

            {["pending", "completed", "not_sent", "expired"].includes(
              activeTab
            ) && (
              <CandidatesTable
                candidates={normalizedCandidates}
                activeTab={activeTab}
                selectedJob={selectedJob}
              />
            )}
          </>
        ) : (
          <div className="bg-white p-6 text-center rounded-lg border shadow-sm">
            <p className="text-gray-500">
              Select a job position to view assessments
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssessmentInterface;
