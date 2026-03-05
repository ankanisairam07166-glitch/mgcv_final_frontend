// // import React from "react";
// // import { Award, CheckCircle, XCircle, AlertCircle, Send, Calendar, ExternalLink } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // // import { useNavigate } from "react-router-dom";

// // interface CandidatesTableProps {
// //   candidates: any[];
// //   activeTab: string;
// //   selectedJob: any;
// // }

// // const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, activeTab }) => {
// //   const router = useRouter();

// //   const getStatusDisplay = (candidate: any) => {
// //     if (candidate.exam_completed) {
// //       const passed = candidate.exam_percentage >= 70;
// //       return {
// //         text: passed ? "Passed" : "Failed",
// //         color: passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
// //         icon: passed ? CheckCircle : XCircle,
// //       };
// //     }
// //     if (candidate.link_expired) {
// //       return { text: "Expired", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// //     }
// //     if (candidate.exam_started) {
// //       return { text: "In Progress", color: "bg-blue-100 text-blue-800", icon: AlertCircle };
// //     }
// //     if (candidate.exam_link_sent) {
// //       return { text: "Sent", color: "bg-yellow-100 text-yellow-800", icon: Send };
// //     }
// //     return { text: "Not Sent", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
// //   };

// //   const getTimeRemaining = (candidate: any) => {
// //     if (!candidate.exam_link_sent_date || candidate.exam_completed || candidate.link_expired) return null;
// //     const sentDate = new Date(candidate.exam_link_sent_date);
// //     const expiryDate = new Date(sentDate.getTime() + 48 * 60 * 60 * 1000);
// //     const now = new Date();
// //     const hoursRemaining = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
// //     if (hoursRemaining <= 0) return "Expired";
// //     if (hoursRemaining <= 6) return `${hoursRemaining}h remaining`;
// //     if (hoursRemaining <= 24) return `${hoursRemaining}h remaining`;
// //     return `${Math.floor(hoursRemaining / 24)}d remaining`;
// //   };

// //   const filteredCandidates = candidates.filter((candidate) => {
// //     switch (activeTab) {
// //       case "pending":
// //         return candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired;
// //       case "completed":
// //         return candidate.exam_completed;
// //       case "expired":
// //         return candidate.exam_link_sent && !candidate.exam_completed && candidate.link_expired;
// //       case "not_sent":
// //         return candidate.status === "Shortlisted" && !candidate.exam_link_sent;
// //       default:
// //         return false;
// //     }
// //   });

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ATS Score</th>
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
// //               {activeTab === "completed" && (
// //                 <>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
// //                     Assessment Score
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Taken</th>
// //                 </>
// //               )}
// //               {activeTab === "pending" && (
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Remaining</th>
// //               )}
// //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {filteredCandidates.length === 0 ? (
// //               <tr>
// //                 <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// //                   <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// //                   <p className="text-lg font-medium">No candidates found</p>
// //                 </td>
// //               </tr>
// //             ) : (
// //               filteredCandidates.map((candidate) => {
// //                 const status = getStatusDisplay(candidate);
// //                 const StatusIcon = status.icon;
// //                 const timeRemaining = getTimeRemaining(candidate);

// //                 return (
// //                   <tr key={candidate.id} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4">
// //                       <div>
// //                         <p className="font-medium text-gray-900">{candidate.name}</p>
// //                         <p className="text-sm text-gray-500">{candidate.email}</p>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <span
// //                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
// //                       >
// //                         <StatusIcon className="w-3 h-3 mr-1" />
// //                         {status.text}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm">
// //                       <span
// //                         className={`font-medium ${
// //                           candidate.ats_score >= 70 ? "text-green-600" : "text-red-600"
// //                         }`}
// //                       >
// //                         {candidate.ats_score?.toFixed(0)}%
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       {candidate.exam_link_sent_date
// //                         ? new Date(candidate.exam_link_sent_date).toLocaleDateString()
// //                         : "—"}
// //                     </td>
// //                     {activeTab === "completed" && (
// //                       <>
// //                         <td className="px-6 py-4 text-sm">
// //                           <span
// //                             className={`font-medium ${
// //                               candidate.exam_percentage >= 70 ? "text-green-600" : "text-red-600"
// //                             }`}
// //                           >
// //                             {candidate.exam_percentage?.toFixed(0)}%
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">
// //                           {candidate.exam_time_taken ? `${candidate.exam_time_taken}m` : "—"}
// //                         </td>
// //                       </>
// //                     )}
// //                     {activeTab === "pending" && (
// //                       <td className="px-6 py-4 text-sm">
// //                         {timeRemaining && (
// //                           <span
// //                             className={`${
// //                               timeRemaining.includes("h") && parseInt(timeRemaining) <= 6
// //                                 ? "text-red-600 font-medium"
// //                                 : "text-gray-500"
// //                             }`}
// //                           >
// //                             {timeRemaining}
// //                           </span>
// //                         )}
// //                       </td>
// //                     )}
// //                     <td className="px-6 py-4 text-sm">
// //                       <div className="flex items-center space-x-2">
// //                         {candidate.assessment_invite_link && (
// //                           <a
// //                             href={candidate.assessment_invite_link}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="text-blue-600 hover:text-blue-900"
// //                           >
// //                             <ExternalLink className="w-4 h-4" />
// //                           </a>
// //                         )}
// //                         {candidate.exam_completed && candidate.exam_percentage >= 70 && !candidate.interview_scheduled && (
// //                           <button
// //                             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
// //                             className="text-green-600 hover:text-green-900"
// //                             title="Schedule Interview"
// //                           >
// //                             <Calendar className="w-4 h-4" />
// //                           </button>
// //                         )}
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 );
// //               })
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidatesTable; 

// import React from "react";
// import { Award, CheckCircle, XCircle, AlertCircle, Send, Calendar, ExternalLink } from "lucide-react";
// import { useRouter } from "next/navigation";
// import type { Candidate, Job } from "@/services/interfaces/CandidateScreening";

// // Define the CandidatesTableProps interface with proper types
// interface CandidatesTableProps {
//   candidates: Candidate[];
//   activeTab: string;
//   selectedJob: Job | null;  // This is assuming selectedJob is of type Job, or null if no job is selected
// }

// const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, activeTab }) => {
//   const router = useRouter();

//   // Helper function to get the candidate's status display
//   const getStatusDisplay = (candidate: Candidate) => {
//     if (candidate.exam_completed) {
//       const passed = (candidate.exam_percentage ?? 0) >= 70;
//       return {
//         text: passed ? "Passed" : "Failed",
//         color: passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
//         icon: passed ? CheckCircle : XCircle,
//       };
//     }
//     if (candidate.link_expired) {
//       return { text: "Expired", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
//     }
//     if (candidate.exam_started) {
//       return { text: "In Progress", color: "bg-blue-100 text-blue-800", icon: AlertCircle };
//     }
//     if (candidate.exam_link_sent) {
//       return { text: "Sent", color: "bg-yellow-100 text-yellow-800", icon: Send };
//     }
//     return { text: "Not Sent", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
//   };

//   // Helper function to calculate the time remaining for a candidate's exam
//   const getTimeRemaining = (candidate: Candidate) => {
//     if (!candidate.exam_link_sent_date || candidate.exam_completed || candidate.link_expired) return null;
//     const sentDate = new Date(candidate.exam_link_sent_date);
//     const expiryDate = new Date(sentDate.getTime() + 48 * 60 * 60 * 1000);  // Adding 48 hours
//     const now = new Date();
//     const hoursRemaining = Math.max(0, Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
//     if (hoursRemaining <= 0) return "Expired";
//     if (hoursRemaining <= 6) return `${hoursRemaining}h remaining`;
//     if (hoursRemaining <= 24) return `${hoursRemaining}h remaining`;
//     return `${Math.floor(hoursRemaining / 24)}d remaining`;
//   };

//   // Filter candidates based on the selected tab (pending, completed, expired, not_sent)
//   const filteredCandidates = candidates.filter((candidate: Candidate) => {
//     switch (activeTab) {
//       case "pending":
//         return candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired;
//       case "completed":
//         return candidate.exam_completed;
//       case "expired":
//         return candidate.exam_link_sent && !candidate.exam_completed && candidate.link_expired;
//       case "not_sent":
//         return candidate.status === "Shortlisted" && !candidate.exam_link_sent;
//       default:
//         return false;
//     }
//   });

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ATS Score</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Date</th>
//               {activeTab === "completed" && (
//                 <>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                     Assessment Score
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Taken</th>
//                 </>
//               )}
//               {activeTab === "pending" && (
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Remaining</th>
//               )}
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredCandidates.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
//                   <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                   <p className="text-lg font-medium">No candidates found</p>
//                 </td>
//               </tr>
//             ) : (
//               filteredCandidates.map((candidate: Candidate) => {
//                 const status = getStatusDisplay(candidate);
//                 const StatusIcon = status.icon;
//                 const timeRemaining = getTimeRemaining(candidate);

//                 return (
//                   <tr key={candidate.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="font-medium text-gray-900">{candidate.name}</p>
//                         <p className="text-sm text-gray-500">{candidate.email}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
//                       >
//                         <StatusIcon className="w-3 h-3 mr-1" />
//                         {status.text}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       <span
//                         className={`font-medium ${
//                           candidate.exam_percentage && candidate.exam_percentage >= 70 ? "text-green-600" : "text-red-600"
//                         }`}
//                       >
//                         {candidate.ats_score?.toFixed(0)}%
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {candidate.exam_link_sent_date
//                         ? new Date(candidate.exam_link_sent_date).toLocaleDateString()
//                         : "—"}
//                     </td>
//                     {activeTab === "completed" && (
//                       <>
//                         <td className="px-6 py-4 text-sm">
//                           <span
//                             className={`font-medium ${
//                               candidate.exam_percentage && candidate.exam_percentage >= 70 ? "text-green-600" : "text-red-600"
//                             }`}
//                           >
//                             {candidate.exam_percentage?.toFixed(0)}%
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500">
//                           {candidate.exam_time_taken ? `${candidate.exam_time_taken}m` : "—"}
//                         </td>
//                       </>
//                     )}
//                     {activeTab === "pending" && (
//                       <td className="px-6 py-4 text-sm">
//                         {timeRemaining && (
//                           <span
//                             className={`${
//                               timeRemaining.includes("h") && parseInt(timeRemaining) <= 6
//                                 ? "text-red-600 font-medium"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {timeRemaining}
//                           </span>
//                         )}
//                       </td>
//                     )}
//                     <td className="px-6 py-4 text-sm">
//                       <div className="flex items-center space-x-2">
//                         {candidate.assessment_invite_link && (
//                           <a
//                             href={candidate.assessment_invite_link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:text-blue-900"
//                           >
//                             <ExternalLink className="w-4 h-4" />
//                           </a>
//                         )}
//                         {candidate.exam_completed && candidate.exam_percentage != null && candidate.exam_percentage >= 70 && !candidate.interview_scheduled && (
//                           <button
//                             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
//                             className="text-green-600 hover:text-green-900"
//                             title="Schedule Interview"
//                           >
//                             <Calendar className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CandidatesTable;
import React from "react";
import { Award, CheckCircle, XCircle, AlertCircle, Send, Calendar, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate, Job } from "@/services/interfaces/CandidateScreening";

interface CandidatesTableProps {
  candidates: Candidate[];
  activeTab: string;
  selectedJob: Job | null;
}

const getStatusDisplay = (candidate: Candidate) => {
  if (candidate.exam_completed) {
    const passed = (candidate.exam_percentage ?? 0) >= 70;
    return {
      text: passed ? "Passed" : "Failed",
      color: passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
      icon: passed ? CheckCircle : XCircle,
    };
  }
  if (candidate.link_expired)
    return { text: "Expired", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
  if (candidate.exam_started)
    return { text: "In Progress", color: "bg-blue-100 text-blue-800", icon: AlertCircle };
  if (candidate.exam_link_sent)
    return { text: "Sent", color: "bg-yellow-100 text-yellow-800", icon: Send };
  return { text: "Not Sent", color: "bg-gray-100 text-gray-800", icon: AlertCircle };
};

const getTimeRemaining = (candidate: Candidate): string | null => {
  if (!candidate.exam_link_sent_date || candidate.exam_completed || candidate.link_expired)
    return null;
  const deadline = new Date(candidate.exam_link_sent_date).getTime() + 48 * 60 * 60 * 1000;
  const hoursLeft = Math.max(0, Math.floor((deadline - Date.now()) / (1000 * 60 * 60)));
  if (hoursLeft <= 0) return "Expired";
  if (hoursLeft < 24) return `${hoursLeft}h remaining`;
  return `${Math.floor(hoursLeft / 24)}d remaining`;
};

const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates, activeTab }) => {
  const router = useRouter();

  const filtered = candidates.filter((c) => {
    switch (activeTab) {
      case "pending":
        return c.exam_link_sent && !c.exam_completed && !c.link_expired;
      case "completed":
        return c.exam_completed;
      case "expired":
        return c.exam_link_sent && !c.exam_completed && c.link_expired;
      case "not_sent":
        return c.status === "Shortlisted" && !c.exam_link_sent;
      default:
        return false;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ATS Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent Date
              </th>

              {/* Single domain: Assessment Score only when completed */}
              {activeTab === "completed" && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessment Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Taken
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                </>
              )}

              {activeTab === "pending" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Remaining
                </th>
              )}

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                  <Award className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p className="text-base font-medium">No candidates found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    No candidates match the <strong>{activeTab}</strong> filter
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((candidate) => {
                const status = getStatusDisplay(candidate);
                const StatusIcon = status.icon;
                const timeRemaining = getTimeRemaining(candidate);
                const atsScore = candidate.ats_score ?? 0;
                const examPct = candidate.exam_percentage ?? 0;

                return (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">

                    {/* Candidate */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-500">{candidate.email}</p>
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.text}
                      </span>
                    </td>

                    {/* ATS Score */}
                    <td className="px-6 py-4 text-sm">
                      <span className={`font-medium ${atsScore >= 70 ? "text-green-600" : "text-red-600"}`}>
                        {atsScore.toFixed(0)}
                      </span>
                      <span className="text-gray-400">/100</span>
                    </td>

                    {/* Sent date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {candidate.exam_link_sent_date
                        ? new Date(candidate.exam_link_sent_date).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Assessment score (completed tab only) — SINGLE DOMAIN */}
                    {activeTab === "completed" && (
                      <>
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-semibold ${examPct >= 70 ? "text-green-600" : "text-red-600"}`}>
                            {examPct.toFixed(0)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {candidate.exam_time_taken ? `${candidate.exam_time_taken}m` : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {candidate.exam_completed_date
                            ? new Date(candidate.exam_completed_date).toLocaleDateString()
                            : "—"}
                        </td>
                      </>
                    )}

                    {/* Time remaining (pending tab only) */}
                    {activeTab === "pending" && (
                      <td className="px-6 py-4 text-sm">
                        {timeRemaining ? (
                          <span className={
                            timeRemaining.includes("h") && parseInt(timeRemaining) <= 6
                              ? "text-red-600 font-medium"
                              : "text-gray-500"
                          }>
                            {timeRemaining}
                          </span>
                        ) : "—"}
                      </td>
                    )}

                    {/* Actions */}
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        {candidate.assessment_invite_link && (
                          <a
                            href={candidate.assessment_invite_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            title="View Assessment"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {candidate.exam_completed &&
                          examPct >= 70 &&
                          !candidate.interview_scheduled && (
                            <button
                              onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
                              className="text-green-600 hover:text-green-800"
                              title="Schedule Interview"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesTable;