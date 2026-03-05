// // import React from "react";
// // import { Send, Download, Activity } from "lucide-react";
// // import { Candidate} from "@/services/interfaces/CandidateScreening";


// // interface AssessmentStats {
// //   totalSent: number;
// //   totalCompleted: number;
// // }

// // interface OverviewTabProps {
// //   candidates: Candidate[];
// //   assessmentStats: AssessmentStats;
// // }

// // const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats }) => {
// //   const completedCount = candidates.filter((c) => c.exam_completed).length;
// //   const passedCount = candidates.filter((c) => c.exam_completed && c.exam_percentage >= 70).length;

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //       <div className="bg-white rounded-lg shadow-sm border p-6">
// //         <h3 className="text-lg font-semibold mb-4 text-gray-600">Assessment Progress</h3>
// //         <div className="space-y-4">
// //           <div>
// //             <p className="text-sm text-gray-600">Sent</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// //               <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
// //             </div>
// //           </div>

// //           <div>
// //             <p className="text-sm text-gray-600 mt-4">Completed</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// //               <div
// //                 className="bg-green-600 h-2 rounded-full"
// //                 style={{
// //                   width:
// //                     assessmentStats.totalSent > 0
// //                       ? `${(assessmentStats.totalCompleted / assessmentStats.totalSent) * 100}%`
// //                       : "0%",
// //                 }}
// //               ></div>
// //             </div>
// //           </div>

// //           <div>
// //             <p className="text-sm text-gray-600 mt-4">Passed (≥70%)</p>
// //             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
// //               <div
// //                 className="bg-yellow-600 h-2 rounded-full"
// //                 style={{
// //                   width:
// //                     assessmentStats.totalSent > 0
// //                       ? `${(passedCount / assessmentStats.totalSent) * 100}%`
// //                       : "0%",
// //                 }}
// //               ></div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-lg shadow-sm border p-6">
// //         <h3 className="text-lg font-semibold mb-4 text-gray-600">Quick Actions</h3>
// //         <div className="space-y-3">
// //           <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// //             <div className="flex items-center">
// //               <Activity className="w-5 h-5 text-blue-600 mr-3" />
// //               <span className="font-medium text-gray-600">Check Results</span>
// //             </div>
// //             <span className="text-sm text-gray-500">{assessmentStats.totalSent - completedCount} pending</span>
// //           </button>

// //           <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// //             <div className="flex items-center">
// //               <Send className="w-5 h-5 text-green-600 mr-3" />
// //               <span className="font-medium text-gray-600">Send Reminders</span>
// //             </div>
// //             <span className="text-sm text-gray-500">Bulk action</span>
// //           </button>

// //           <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
// //             <div className="flex items-center">
// //               <Download className="w-5 h-5 text-purple-600 mr-3" />
// //               <span className="font-medium text-gray-600">Export Data</span>
// //             </div>
// //             <span className="text-sm text-gray-500">CSV format</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OverviewTab;
// import React from "react";

// import { Candidate, AssessmentStats } from "@/services/interfaces/CandidateScreening";

// interface OverviewTabProps {
//   candidates: Candidate[];
//   assessmentStats: AssessmentStats;
// }

// const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats }) => {
//   const completedCount = candidates.filter((c) => c.exam_completed).length;
//   const passedCount = candidates.filter(
//     (c) => c.exam_completed && (c.exam_percentage ?? 0) >= 70
//   ).length;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Assessment Progress */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="font-semibold mb-4 text-gray-600">
//           Assessment Progress
//         </h3>

//         <div className="space-y-4">
//           <div>
//             <p className="text-sm text-gray-600">Sent</p>
//             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full"
//                 style={{ width: "100%" }}
//               ></div>
//             </div>
//           </div>

//           <div>
//             <p className="text-sm text-gray-600">Completed</p>
//             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//               <div
//                 className="bg-green-600 h-2 rounded-full"
//                 style={{
//                   width:
//                     assessmentStats.totalSent > 0
//                       ? `${(assessmentStats.totalCompleted / assessmentStats.totalSent) * 100}%`
//                       : "0%",
//                 }}
//               ></div>
//             </div>
//           </div>

//           <div>
//             <p className="text-sm text-gray-600">Passed (≥70%)</p>
//             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//               <div
//                 className="bg-yellow-600 h-2 rounded-full"
//                 style={{
//                   width: assessmentStats.totalCompleted
//                     ? `${(passedCount / assessmentStats.totalCompleted) * 100}%`
//                     : "0%",
//                 }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Candidate Stats */}
//       <div className="bg-white rounded-lg shadow-sm border p-6">
//         <h3 className="font-semibold mb-4 text-gray-600">
//           Candidate Overview
//         </h3>

//         <div className="space-y-4">
//           <div className="flex justify-between">
//             <span className="text-sm text-gray-600">Total Candidates</span>
//             <span className="font-medium">{candidates.length}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-sm text-gray-600">Completed</span>
//             <span className="font-medium">{completedCount}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-sm text-gray-600">Passed</span>
//             <span className="font-medium">{passedCount}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewTab;
import React from "react";
import { Send, Activity, Download } from "lucide-react";
import { Candidate, AssessmentStats } from "@/services/interfaces/CandidateScreening";

interface OverviewTabProps {
  candidates: Candidate[];
  assessmentStats: AssessmentStats;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ candidates, assessmentStats }) => {
  const completedCount = candidates.filter((c) => c.exam_completed).length;
  const passedCount = candidates.filter(
    (c) => c.exam_completed && (c.exam_percentage ?? 0) >= 70
  ).length;

  const completionRate =
    assessmentStats.totalSent > 0
      ? (assessmentStats.totalCompleted / assessmentStats.totalSent) * 100
      : 0;

  const passRate =
    assessmentStats.totalCompleted > 0
      ? (passedCount / assessmentStats.totalCompleted) * 100
      : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Assessment Progress */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold mb-5 text-gray-700">Assessment Progress</h3>

        <div className="space-y-5">
          {/* Sent */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Assessments Sent</span>
              <span className="font-medium text-gray-800">{assessmentStats.totalSent}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }} />
            </div>
          </div>

          {/* Completed */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-gray-800">
                {assessmentStats.totalCompleted} ({completionRate.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          {/* Passed */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Passed (≥70%)</span>
              <span className="font-medium text-gray-800">
                {passedCount} ({passRate.toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all"
                style={{ width: `${passRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right column: stats + quick actions */}
      <div className="space-y-4">

        {/* Candidate Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold mb-4 text-gray-700">Candidate Summary</h3>
          <div className="space-y-3">
            {[
              { label: "Total Candidates", value: candidates.length },
              { label: "Assessment Sent", value: assessmentStats.totalSent },
              { label: "Completed", value: completedCount },
              { label: "Passed", value: passedCount },
              {
                label: "Not Yet Sent",
                value: candidates.filter((c) => c.status === "Shortlisted" && !c.exam_link_sent).length,
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <h3 className="font-semibold mb-3 text-gray-700">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-600">Check Results</span>
              </div>
              <span className="text-xs text-gray-400">
                {assessmentStats.totalSent - completedCount} pending
              </span>
            </button>

            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Send className="w-4 h-4 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-600">Send Reminders</span>
              </div>
              <span className="text-xs text-gray-400">Bulk action</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Download className="w-4 h-4 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-gray-600">Export Data</span>
              </div>
              <span className="text-xs text-gray-400">CSV format</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;