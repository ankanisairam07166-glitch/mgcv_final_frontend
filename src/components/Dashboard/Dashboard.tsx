// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // "use client";

// // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";

// // import { RefreshCw, Users, Target, Clock, Bell, AlertCircle} from "lucide-react";

// // import StatCard from "./subComponents/StatCard";
// // import PipelineRunner from "./subComponents/PipelineRunner";

// // import {
// //   ResponsiveContainer,
// //   CartesianGrid,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   BarChart,
// //   Bar,
// //   LineChart,
// //   Line,
// //   Legend,
// //   Cell,
// // } from "recharts";

// // import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // const Dashboard: React.FC = () => {
// //   const router = useRouter();
// //   const dispatch = useAppDispatch();
// //   const { jobs, candidates, recruitmentData, loading } = useAppSelector((state) => state.dashboard);  
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
// //   const [selectedTimeRange, setSelectedTimeRange] =useState<"week" | "month" | "quarter" | "year">("month");
// //   const [notifications, setNotifications] = useState<any[]>([]);
// //   const [pipelineStatus, setPipelineStatus] = useState<Record<string, any>>({});
// //   const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

// //   const fetchAll = useCallback(
// //     async (force = false) => {
// //       if (force) setRefreshing(true);
// //       try {
// //         await dispatch(dashboardRefreshAll()).unwrap();
// //         setLastFetchTime(new Date());
// //       } finally {
// //         setRefreshing(false);
// //       }
// //     },
// //     [dispatch]
// //   );

// //   useEffect(() => {
// //     fetchAll();
// //     const id = setInterval(() => fetchAll(true), 120000);
// //     return () => clearInterval(id);
// //   }, [fetchAll, selectedTimeRange]);

// //   const stats = useMemo(() => {
// //     const total = candidates.length;
// //     const shortlisted = candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// //     const interviews = candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length;
// //     const assessmentsSent = candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length;
// //     const assessmentsCompleted = candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length;
// //     const hires = candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length;
// //     const pendingAssessments = candidates.filter(
// //       (c) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     ).length;

// //     const now = new Date();
// //     const pendingInterviews = candidates.filter((c: { interview_date: string | number | Date; interview_scheduled: any }) => {
// //       if (!c?.interview_date) return false;
// //       return c?.interview_scheduled && new Date(c.interview_date) > now;
// //     }).length;

// //     const timeToHire = (() => {
// //       const hired = candidates.filter((c: { final_status: string; processed_date: any }) => c?.final_status === "Hired" && c?.processed_date);
// //       if (!hired.length) return 0;
// //       const totalDays = hired.reduce((acc: number, c: { processed_date: string | number | Date }) => {
// //         const start = new Date(c.processed_date).getTime();
// //         const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24));
// //         return acc + Math.max(days, 0);
// //       }, 0);
// //       return Math.round(totalDays / hired.length);
// //     })();

// //     return {
// //       totalApplications: total,
// //       activeInterviews: interviews,
// //       timeToHire,
// //       activeAssessments: pendingAssessments,
// //       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
// //       assessmentCompletionRate:
// //         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
// //       totalHires: hires,
// //       pendingActions: pendingAssessments + pendingInterviews,
// //     };
// //   }, [candidates]);

// //   useEffect(() => {
// //     const outs: any[] = [];
// //     const pendingAssessments = candidates.filter(
// //       (c: { exam_link_sent: any; exam_completed: any; link_expired: any }) =>
// //         c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
// //     );
// //     if (pendingAssessments.length) {
// //       outs.push({
// //         id: 1,
// //         type: "warning",
// //         message: `${pendingAssessments.length} candidates have pending assessments`,
// //         action: "View Candidates",
// //         route: "/candidates",
// //       });
// //     }
// //     const upcomingToday = candidates.filter((c: { interview_date: string | number | Date }) => {
// //       if (!c?.interview_date) return false;
// //       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / (1000 * 60 * 60);
// //       return diffHrs > 0 && diffHrs < 24;
// //     });
// //     if (upcomingToday.length) {
// //       outs.push({
// //         id: 2,
// //         type: "info",
// //         message: `${upcomingToday.length} interviews scheduled for today`,
// //         action: "View Schedule",
// //         route: "/scheduler",
// //       });
// //     }
// //     setNotifications(outs);
// //   }, [candidates]);

// //   const pipelineStages = useMemo(
// //     () => [
// //       { name: "Applied", value: candidates.length, color: "#3B82F6" },
// //       { name: "Screened", value: candidates.filter((c: { ats_score: number }) => c?.ats_score > 0).length, color: "#10B981" },
// //       { name: "Shortlisted", value: candidates.filter((c: { status: string }) => c?.status === "Shortlisted").length, color: "#F59E0B" },
// //       { name: "Assessment", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length, color: "#8B5CF6" },
// //       { name: "Interview", value: candidates.filter((c: { interview_scheduled: any }) => c?.interview_scheduled).length, color: "#EF4444" },
// //       { name: "Hired", value: candidates.filter((c: { final_status: string }) => c?.final_status === "Hired").length, color: "#059669" },
// //     ],
// //     [candidates]
// //   );

// //   const assessmentMetrics = useMemo(
// //     () => [
// //       { name: "Sent", value: candidates.filter((c: { exam_link_sent: any }) => c?.exam_link_sent).length },
// //       { name: "Started", value: candidates.filter((c: { exam_started: any }) => c?.exam_started).length },
// //       { name: "Completed", value: candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length },
// //       { name: "Passed", value: candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length },
// //     ],
// //     [candidates]
// //   );

// //   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

// //   if (loading && !lastFetchTime) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
// //           <p className="mt-4 text-gray-600">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen p-6 bg-white">
// //         <div className="flex items-center justify-between mb-6">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
// //             <div className="flex items-center mt-1 space-x-4">
// //               <p className="text-gray-600">Welcome back! Here&apos;s your recruitment overview</p>
// //               {lastFetchTime && (
// //                 <span className="text-xs text-gray-500">
// //                   Last updated: {lastFetchTime.toLocaleTimeString()}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //           <div className="flex items-center space-x-3">
// //             <button
// //               onClick={handleRefresh}
// //               disabled={refreshing}
// //               className="p-2 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
// //               title="Refresh Data"
// //             >
// //               <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
// //             </button>
// //             <select
// //               value={selectedTimeRange}
// //               onChange={(e) => setSelectedTimeRange(e.target.value as any)}
// //               className="border rounded-lg px-4 py-2 text-sm text-gray-500"
// //             >
// //               <option value="week">This Week</option>
// //               <option value="month">This Month</option>
// //               <option value="quarter">This Quarter</option>
// //               <option value="year">This Year</option>
// //             </select>
// //             <button
// //               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //             >
// //               New Pipeline
// //             </button>
// //           </div>
// //         </div>

// //         {/* Notifications */}
// //         {notifications.length > 0 && (
// //           <div className="mb-6 space-y-2">
// //             {notifications.map((n) => (
// //               <div
// //                 key={n.id}
// //                 className={`p-4 rounded-lg border flex items-center justify-between ${
// //                   n.type === "warning" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"
// //                 }`}
// //               >
// //                 <div className="flex items-center">
// //                   <AlertCircle
// //                     className={`w-5 h-5 mr-3 ${n.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
// //                   />
// //                   <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
// //                     {n.message}
// //                   </span>
// //                 </div>
// //                 <button
// //                   onClick={() => router.push(n.route)}
// //                   className={`px-3 py-1 rounded text-sm font-medium ${
// //                     n.type === "warning"
// //                       ? "bg-yellow-600 text-white hover:bg-yellow-700"
// //                       : "bg-blue-600 text-white hover:bg-blue-700"
// //                   }`}
// //                 >
// //                   {n.action}
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           <StatCard
// //             title="Total Applications"
// //             value={stats.totalApplications}
// //             change={12.5}
// //             icon={Users}
// //             color="bg-blue-600"
// //             subtitle="All time applications"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Shortlist Rate"
// //             value={`${stats.shortlistRate}%`}
// //             change={5.2}
// //             icon={Target}
// //             color="bg-green-600"
// //             subtitle="Candidates shortlisted"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Time-to-Hire"
// //             value={`${stats.timeToHire}d`}
// //             change={-8.3}
// //             icon={Clock}
// //             color="bg-yellow-600"
// //             subtitle="Average days to hire"
// //             loading={loading}
// //           />
// //           <StatCard
// //             title="Pending Actions"
// //             value={stats.pendingActions}
// //             icon={Bell}
// //             color="bg-purple-600"
// //             subtitle="Requires attention"
// //             loading={loading}
// //           />
// //         </div>

// //         {/* Charts */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={pipelineStages}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#3B82F6">
// //                   {pipelineStages.map((e, i) => (
// //                     <Cell key={i} fill={e.color} />
// //                   ))}
// //                 </Bar>
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>

// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={recruitmentData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="date" /> {/* change to "month" if your API provides that */}
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
// //                 <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
// //                 <Line type="monotone" dataKey="hires" stroke="#EF4444" strokeWidth={2} />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Jobs table */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
// //           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
// //             <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
// //             <button
// //               onClick={() => router.push("/candidates")}
// //               className="text-blue-600 hover:text-blue-700 text-sm font-medium"
// //             >
// //               View All Candidates →
// //             </button>
// //           </div>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
// //                   <th className="px-6 py-3">Position</th>
// //                   <th className="px-6 py-3">Department</th>
// //                   <th className="px-6 py-3">Location</th>
// //                   <th className="px-6 py-3">Applications</th>
// //                   <th className="px-6 py-3">Shortlisted</th>
// //                   <th className="px-6 py-3">In Progress</th>
// //                   <th className="px-6 py-3">Status</th>
// //                   <th className="px-6 py-3">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {jobs.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
// //                       <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
// //                       <p className="text-lg font-medium">No job positions found</p>
// //                       <p className="mt-1">Start a new recruitment pipeline to begin</p>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   jobs.map((job: any) => {
// //                     const jobCandidates = candidates.filter((c: { job_id: any }) => c?.job_id === job.id);
// //                     const shortlisted = jobCandidates.filter((c: { status: string }) => c?.status === "Shortlisted").length;
// //                     const inProgress = jobCandidates.filter(
// //                       (c: { exam_link_sent: any; interview_scheduled: any }) => c?.exam_link_sent || c?.interview_scheduled
// //                     ).length;

// //                     return (
// //                       <tr key={job.id} className="hover:bg-gray-50">
// //                         <td className="px-6 py-4">
// //                           <div className="text-sm font-medium text-gray-900">{job.title}</div>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
// //                         <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
// //                         <td className="px-6 py-4">
// //                           <span className="text-sm font-medium text-gray-900">
// //                             {jobCandidates.length}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className="text-sm font-medium text-green-600">{shortlisted}</span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className="text-sm font-medium text-blue-600">{inProgress}</span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className="inline-flex px-2 py-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
// //                             Active
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm">
// //                           <div className="flex space-x-2">
// //                             <button
// //                               onClick={() => router.push(`/candidates?job_id=${job.id}`)}
// //                               className="text-blue-600 hover:text-blue-900 font-medium"
// //                             >
// //                               View
// //                             </button>
// //                             <button
// //                               onClick={() => setSelectedPipelineJob(job)}
// //                               className="text-green-600 hover:text-green-900 font-medium"
// //                             >
// //                               Run Pipeline
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* Assessment metrics + Quick actions */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
// //             <ResponsiveContainer width="100%" height={200}>
// //               <BarChart data={assessmentMetrics}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#8B5CF6" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
// //               <div>
// //                 <p className="text-gray-500">Completion Rate</p>
// //                 <p className="text-xl font-semibold text-gray-500">{stats.assessmentCompletionRate}%</p>
// //               </div>
// //               <div>
// //                 <p className="text-gray-500">Pass Rate</p>
// //                 <p className="text-xl font-semibold text-gray-500">
// //                   {candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length > 0
// //                     ? (
// //                         (candidates.filter((c: { exam_percentage: number }) => c?.exam_percentage >= 70).length /
// //                           candidates.filter((c: { exam_completed: any }) => c?.exam_completed).length) *
// //                         100
// //                       ).toFixed(1)
// //                     : 0}
// //                   %
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
// //             <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
// //             <div className="space-y-3">
// //               <button
// //                 onClick={() => router.push("/assessments")}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">Manage Assessments</span>
// //                 <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
// //               </button>

// //               <button
// //                 onClick={() => router.push("/scheduler")}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">Schedule Interviews</span>
// //                 <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
// //               </button>

// //               <button
// //                 onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">Start New Recruitment</span>
// //                 <span className="text-sm text-gray-500">Run pipeline</span>
// //               </button>

// //               <button
// //                 onClick={() => router.push("/candidates")}
// //                 className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
// //               >
// //                 <span className="font-medium text-gray-700">View All Candidates</span>
// //                 <span className="text-sm text-gray-500">{candidates.length} total</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //       {selectedPipelineJob && (
// //         <PipelineRunner
// //           job={selectedPipelineJob}
// //           onPipelineStart={() =>
// //             setPipelineStatus((p) => ({
// //               ...p,
// //               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
// //             }))
// //           }
// //           onPipelineComplete={() => {
// //             fetchAll(true);
// //             setPipelineStatus((p) => ({
// //               ...p,
// //               [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
// //             }));
// //           }}
// //           onClose={() => setSelectedPipelineJob(null)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// "use client";

// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
// import {
//   RefreshCw, Users, Target, Clock, Bell, AlertCircle, CheckCircle, X,
// } from "lucide-react";
// import StatCard from "./subComponents/StatCard";
// import PipelineRunner from "./subComponents/PipelineRunner";
// import {
//   ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis,
//   BarChart, Bar, LineChart, Line, Legend, Cell,
// } from "recharts";
// import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface PipelineAlert {
//   id: number;
//   jobTitle: string;
//   candidateCount: number;
//   time: string;
//   read: boolean;
// }

// // ─── Bell Dropdown Component ──────────────────────────────────────────────────

// const BellAlertDropdown: React.FC<{
//   alerts: PipelineAlert[];
//   onClearAll: () => void;
//   onClose: () => void;
// }> = ({ alerts, onClearAll, onClose }) => (
//   <div
//     className="absolute right-0 top-12 z-50 w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
//     style={{ animation: "fadeSlideDown 0.18s ease" }}
//   >
//     <style>{`
//       @keyframes fadeSlideDown {
//         from { opacity: 0; transform: translateY(-8px); }
//         to   { opacity: 1; transform: translateY(0); }
//       }
//     `}</style>

//     {/* Header */}
//     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//       <span className="text-sm font-semibold text-gray-800">Pipeline Alerts</span>
//       <div className="flex items-center gap-3">
//         {alerts.length > 0 && (
//           <button
//             onClick={onClearAll}
//             className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Clear all
//           </button>
//         )}
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     </div>

//     {/* Alert list */}
//     <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
//       {alerts.length === 0 ? (
//         <div className="px-4 py-8 text-center">
//           <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//           <p className="text-sm text-gray-400">No alerts yet.</p>
//           <p className="text-xs text-gray-400 mt-1">Run a pipeline to see results here.</p>
//         </div>
//       ) : (
//         alerts.map((alert) => (
//           <div
//             key={alert.id}
//             className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//           >
//             {/* Green check icon */}
//             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//             </div>

//             {/* Content */}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900">Pipeline completed</p>
//               <p className="text-xs text-blue-600 font-medium mt-0.5 truncate">
//                 {alert.jobTitle}
//               </p>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 <span className="font-semibold text-gray-700">{alert.candidateCount}</span>{" "}
//                 candidates processed
//               </p>
//               <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
//             </div>

//             {/* Unread dot */}
//             {!alert.read && (
//               <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );

// // ─── Main Dashboard ───────────────────────────────────────────────────────────

// const Dashboard: React.FC = () => {
//   const router   = useRouter();
//   const dispatch = useAppDispatch();
//   const { jobs, candidates, recruitmentData, loading } = useAppSelector(
//     (state) => state.dashboard
//   );

//   const [refreshing, setRefreshing]                   = useState(false);
//   const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
//   const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
//   const [notifications, setNotifications]             = useState<any[]>([]);
//   const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});
//   const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);

//   // ── Bell alert state ────────────────────────────────────────────────────────
//   const [pipelineAlerts, setPipelineAlerts] = useState<PipelineAlert[]>([]);
//   const [bellOpen, setBellOpen]             = useState(false);
//   const alertIdRef                          = useRef(0);
//   const bellRef                             = useRef<HTMLDivElement>(null);

//   const unreadCount = pipelineAlerts.filter((a) => !a.read).length;

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
//         setBellOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const addPipelineAlert = useCallback((jobTitle: string, candidateCount: number) => {
//     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     setPipelineAlerts((prev) => [
//       { id: ++alertIdRef.current, jobTitle, candidateCount, time, read: false },
//       ...prev,
//     ]);
//   }, []);

//   const clearAllAlerts = useCallback(() => {
//     setPipelineAlerts([]);
//     setBellOpen(false);
//   }, []);

//   const openBell = useCallback(() => {
//     setBellOpen((o) => !o);
//     // mark all read when opened
//     setPipelineAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
//   }, []);

//   // ── Data fetching ───────────────────────────────────────────────────────────
//   const fetchAll = useCallback(
//     async (force = false) => {
//       if (force) setRefreshing(true);
//       try {
//         await dispatch(dashboardRefreshAll()).unwrap();
//         setLastFetchTime(new Date());
//       } finally {
//         setRefreshing(false);
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     fetchAll();
//     const id = setInterval(() => fetchAll(true), 120000);
//     return () => clearInterval(id);
//   }, [fetchAll, selectedTimeRange]);

//   // ── Stats ───────────────────────────────────────────────────────────────────
//   const stats = useMemo(() => {
//     const total              = candidates.length;
//     const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
//     const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
//     const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
//     const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
//     const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
//     const pendingAssessments = candidates.filter(
//       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
//     ).length;
//     const now = new Date();
//     const pendingInterviews = candidates.filter((c: any) => {
//       if (!c?.interview_date) return false;
//       return c?.interview_scheduled && new Date(c.interview_date) > now;
//     }).length;
//     const timeToHire = (() => {
//       const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
//       if (!hired.length) return 0;
//       const total = hired.reduce((acc: number, c: any) => {
//         const days = Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86400000);
//         return acc + Math.max(days, 0);
//       }, 0);
//       return Math.round(total / hired.length);
//     })();
//     return {
//       totalApplications: total,
//       activeInterviews: interviews,
//       timeToHire,
//       activeAssessments: pendingAssessments,
//       shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
//       assessmentCompletionRate:
//         assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
//       totalHires: hires,
//       pendingActions: pendingAssessments + pendingInterviews,
//     };
//   }, [candidates]);

//   // ── Notification banners ────────────────────────────────────────────────────
//   useEffect(() => {
//     const outs: any[] = [];
//     const pendingAssessments = candidates.filter(
//       (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
//     );
//     if (pendingAssessments.length) {
//       outs.push({
//         id: 1, type: "warning",
//         message: `${pendingAssessments.length} candidates have pending assessments`,
//         action: "View Candidates", route: "/candidates",
//       });
//     }
//     const upcomingToday = candidates.filter((c: any) => {
//       if (!c?.interview_date) return false;
//       const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3600000;
//       return diffHrs > 0 && diffHrs < 24;
//     });
//     if (upcomingToday.length) {
//       outs.push({
//         id: 2, type: "info",
//         message: `${upcomingToday.length} interviews scheduled for today`,
//         action: "View Schedule", route: "/scheduler",
//       });
//     }
//     setNotifications(outs);
//   }, [candidates]);

//   const pipelineStages = useMemo(() => [
//     { name: "Applied",     value: candidates.length, color: "#3B82F6" },
//     { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length, color: "#10B981" },
//     { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
//     { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length, color: "#8B5CF6" },
//     { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length, color: "#EF4444" },
//     { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
//   ], [candidates]);

//   const assessmentMetrics = useMemo(() => [
//     { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
//     { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
//     { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
//     { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
//   ], [candidates]);

//   const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

//   if (loading && !lastFetchTime) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-white">

//       {/* ── Top bar ── */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
//           <div className="flex items-center mt-1 space-x-4">
//             <p className="text-gray-500 text-sm">
//               Welcome back! Here&apos;s your recruitment overview
//             </p>
//             {lastFetchTime && (
//               <span className="text-xs text-gray-500">
//                 Last updated: {lastFetchTime.toLocaleTimeString()}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           {/* Refresh */}
//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
//             title="Refresh Data"
//           >
//             <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
//           </button>

//           {/* Time range */}
//           <select
//             value={selectedTimeRange}
//             onChange={(e) => setSelectedTimeRange(e.target.value as any)}
//             className="border rounded-lg px-4 py-2 text-sm text-gray-500"
//           >
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//             <option value="quarter">This Quarter</option>
//             <option value="year">This Year</option>
//           </select>

//           {/* ── Bell icon ── */}
//           <div className="relative" ref={bellRef}>
//             <button
//               onClick={openBell}
//               className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
//               title="Pipeline Alerts"
//             >
//               <Bell className="w-5 h-5" />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
//                   {unreadCount > 9 ? "9+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {bellOpen && (
//               <BellAlertDropdown
//                 alerts={pipelineAlerts}
//                 onClearAll={clearAllAlerts}
//                 onClose={() => setBellOpen(false)}
//               />
//             )}
//           </div>

//           {/* New Pipeline */}
//           <button
//             onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
//           >
//             New Pipeline
//           </button>
//         </div>
//       </div>

//       {/* ── Notification banners ── */}
//       {notifications.length > 0 && (
//         <div className="mb-6 space-y-2">
//           {notifications.map((n) => (
//             <div
//               key={n.id}
//               className={`p-4 rounded-lg border flex items-center justify-between ${
//                 n.type === "warning"
//                   ? "bg-yellow-50 border-yellow-200"
//                   : "bg-blue-50 border-blue-200"
//               }`}
//             >
//               <div className="flex items-center">
//                 <AlertCircle
//                   className={`w-5 h-5 mr-3 ${
//                     n.type === "warning" ? "text-yellow-600" : "text-blue-600"
//                   }`}
//                 />
//                 <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
//                   {n.message}
//                 </span>
//               </div>
//               <button
//                 onClick={() => router.push(n.route)}
//                 className={`px-3 py-1 rounded text-sm font-medium ${
//                   n.type === "warning"
//                     ? "bg-yellow-600 text-white hover:bg-yellow-700"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 {n.action}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Stats ── */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Total Applications" value={stats.totalApplications} change={12.5}  icon={Users}  color="bg-blue-600"   subtitle="All time applications"  loading={loading} />
//         <StatCard title="Shortlist Rate"     value={`${stats.shortlistRate}%`} change={5.2} icon={Target} color="bg-green-600"  subtitle="Candidates shortlisted" loading={loading} />
//         <StatCard title="Time-to-Hire"       value={`${stats.timeToHire}d`}   change={-8.3} icon={Clock}  color="bg-yellow-600" subtitle="Average days to hire"   loading={loading} />
//         <StatCard title="Pending Actions"    value={stats.pendingActions}                   icon={Bell}   color="bg-purple-600" subtitle="Requires attention"      loading={loading} />
//       </div>

//       {/* ── Charts ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={pipelineStages}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#3B82F6">
//                 {pipelineStages.map((e, i) => <Cell key={i} fill={e.color} />)}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={recruitmentData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
//               <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} />
//               <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* ── Jobs table ── */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
//           <button
//             onClick={() => router.push("/candidates")}
//             className="text-blue-600 hover:text-blue-700 text-sm font-medium"
//           >
//             View All Candidates →
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                 <th className="px-6 py-3">Position</th>
//                 <th className="px-6 py-3">Department</th>
//                 <th className="px-6 py-3">Location</th>
//                 <th className="px-6 py-3">Applications</th>
//                 <th className="px-6 py-3">Shortlisted</th>
//                 <th className="px-6 py-3">In Progress</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {jobs.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
//                     <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                     <p className="text-lg font-medium">No job positions found</p>
//                     <p className="mt-1">Start a new recruitment pipeline to begin</p>
//                   </td>
//                 </tr>
//               ) : (
//                 jobs.map((job: any) => {
//                   const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
//                   const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
//                   const inProgress    = jobCandidates.filter(
//                     (c: any) => c?.exam_link_sent || c?.interview_scheduled
//                   ).length;
//                   return (
//                     <tr key={job.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
//                       <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900">{jobCandidates.length}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-green-600">{shortlisted}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-blue-600">{inProgress}</td>
//                       <td className="px-6 py-4">
//                         <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
//                           Active
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => router.push(`/candidates?job_id=${job.id}`)}
//                             className="text-blue-600 hover:text-blue-900 font-medium"
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => setSelectedPipelineJob(job)}
//                             className="text-green-600 hover:text-green-900 font-medium"
//                           >
//                             Run Pipeline
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Assessment metrics + Quick actions ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={assessmentMetrics}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#8B5CF6" />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-500">Completion Rate</p>
//               <p className="text-xl font-semibold text-gray-700">{stats.assessmentCompletionRate}%</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Pass Rate</p>
//               <p className="text-xl font-semibold text-gray-700">
//                 {candidates.filter((c: any) => c?.exam_completed).length > 0
//                   ? (
//                       (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
//                         candidates.filter((c: any) => c?.exam_completed).length) * 100
//                     ).toFixed(1)
//                   : 0}%
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
//           <div className="space-y-3">
//             <button
//               onClick={() => router.push("/assessments")}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">Manage Assessments</span>
//               <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
//             </button>
//             <button
//               onClick={() => router.push("/scheduler")}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">Schedule Interviews</span>
//               <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
//             </button>
//             <button
//               onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">Start New Recruitment</span>
//               <span className="text-sm text-gray-500">Run pipeline</span>
//             </button>
//             <button
//               onClick={() => router.push("/candidates")}
//               className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium text-gray-700">View All Candidates</span>
//               <span className="text-sm text-gray-500">{candidates.length} total</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Pipeline Runner Modal ── */}
//       {selectedPipelineJob && (
//         <PipelineRunner
//           job={selectedPipelineJob}
//           onPipelineStart={() =>
//             setPipelineStatus((p) => ({
//               ...p,
//               [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
//             }))
//           }
//           onPipelineComplete={() => {
//             fetchAll(true).then(() => {
//               const jobCandidates = candidates.filter(
//                 (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
//               );
//               // ✅ Add bell alert with job title + candidate count
//               addPipelineAlert(selectedPipelineJob.title, jobCandidates.length);
//               setPipelineStatus((p) => ({
//                 ...p,
//                 [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
//               }));
//             });
//           }}
//           onClose={() => setSelectedPipelineJob(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import {
  RefreshCw, Users, Target, Clock, Bell, AlertCircle, CheckCircle, X, UserCheck, UserX,
} from "lucide-react";
import StatCard from "./subComponents/StatCard";
import PipelineRunner from "./subComponents/PipelineRunner";
import {
  ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis,
  BarChart, Bar, LineChart, Line, Legend, Cell,
} from "recharts";
import { dashboardRefreshAll } from "@/services/redux/thunk/dashboardThunk";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PipelineAlert {
  id: number;
  jobTitle: string;
  candidateCount: number;
  shortlisted: number;
  notShortlisted: number;
  time: string;
  read: boolean;
}

// ─── Pipeline Result Toast ────────────────────────────────────────────────────
// Stays on screen until HR explicitly clicks X. No auto-dismiss.

const PipelineResultToast: React.FC<{
  toasts: PipelineAlert[];
  onDismiss: (id: number) => void;
}> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{ animation: "toastIn 0.25s ease" }}
        >
          {/* Green header strip */}
          <div className="bg-green-500 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
              <span className="text-white text-sm font-semibold">Pipeline Completed</span>
            </div>
            {/* ✅ Only closes when HR clicks X — no auto-dismiss */}
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-green-100 hover:text-white transition-colors ml-2"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-3">
            {/* Job title */}
            <p className="text-sm font-semibold text-gray-900 truncate mb-3">
              {toast.jobTitle}
            </p>

            {/* Shortlisted vs Not shortlisted */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-600 font-medium">Shortlisted</p>
                  <p className="text-xl font-bold text-green-700 leading-tight">
                    {toast.shortlisted}
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 flex items-center gap-2">
                <UserX className="w-4 h-4 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-red-500 font-medium">Not Shortlisted</p>
                  <p className="text-xl font-bold text-red-600 leading-tight">
                    {toast.notShortlisted}
                  </p>
                </div>
              </div>
            </div>

            {/* Total + time */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Total processed:{" "}
                <span className="font-semibold text-gray-700">{toast.candidateCount}</span>
              </span>
              <span className="text-xs text-gray-400">{toast.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Bell Dropdown Component ──────────────────────────────────────────────────

const BellAlertDropdown: React.FC<{
  alerts: PipelineAlert[];
  onClearAll: () => void;
  onClose: () => void;
}> = ({ alerts, onClearAll, onClose }) => (
  <div
    className="absolute right-0 top-12 z-50 w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden"
    style={{ animation: "fadeSlideDown 0.18s ease" }}
  >
    <style>{`
      @keyframes fadeSlideDown {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>

    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <span className="text-sm font-semibold text-gray-800">Pipeline Alerts</span>
      <div className="flex items-center gap-3">
        {alerts.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Alert list */}
    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
      {alerts.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No alerts yet.</p>
          <p className="text-xs text-gray-400 mt-1">Run a pipeline to see results here.</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            {/* Green check icon */}
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Pipeline completed</p>
              <p className="text-xs text-blue-600 font-medium mt-0.5 truncate">
                {alert.jobTitle}
              </p>
              {/* Shortlisted / Not-shortlisted breakdown */}
              <div className="flex gap-3 mt-1">
                <span className="text-xs text-green-600 font-medium">
                  ✓ {alert.shortlisted} shortlisted
                </span>
                <span className="text-xs text-red-500 font-medium">
                  ✗ {alert.notShortlisted} not shortlisted
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
            </div>

            {/* Unread dot */}
            {!alert.read && (
              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Dashboard: React.FC = () => {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const { jobs, candidates, recruitmentData, loading } = useAppSelector(
    (state) => state.dashboard
  );

  const [refreshing, setRefreshing]                   = useState(false);
  const [selectedPipelineJob, setSelectedPipelineJob] = useState<any | null>(null);
  const [selectedTimeRange, setSelectedTimeRange]     = useState<"week" | "month" | "quarter" | "year">("month");
  const [notifications, setNotifications]             = useState<any[]>([]);
  const [pipelineStatus, setPipelineStatus]           = useState<Record<string, any>>({});
  const [lastFetchTime, setLastFetchTime]             = useState<Date | null>(null);

  // ── Bell alert state ────────────────────────────────────────────────────────
  const [pipelineAlerts, setPipelineAlerts] = useState<PipelineAlert[]>([]);
  const [bellOpen, setBellOpen]             = useState(false);
  const alertIdRef                          = useRef(0);
  const bellRef                             = useRef<HTMLDivElement>(null);

  // ── Persistent result toasts (NO auto-dismiss — stays until HR clicks X) ──
  const [resultToasts, setResultToasts] = useState<PipelineAlert[]>([]);

  const unreadCount = pipelineAlerts.filter((a) => !a.read).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /**
   * Called after pipeline completes.
   * Adds to the bell history AND shows a persistent toast.
   * Toast only closes when HR clicks the X button.
   */
  const addPipelineAlert = useCallback(
    (jobTitle: string, totalCount: number, shortlisted: number) => {
      const notShortlisted = totalCount - shortlisted;
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const id   = ++alertIdRef.current;

      const newAlert: PipelineAlert = {
        id,
        jobTitle,
        candidateCount: totalCount,
        shortlisted,
        notShortlisted,
        time,
        read: false,
      };

      // Add to bell history
      setPipelineAlerts((prev) => [newAlert, ...prev]);

      // Show persistent toast (HR must click X to dismiss)
      setResultToasts((prev) => [newAlert, ...prev]);
    },
    []
  );

  /** HR clicks X on toast — removes only that toast */
  const dismissToast = useCallback((id: number) => {
    setResultToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setPipelineAlerts([]);
    setBellOpen(false);
  }, []);

  const openBell = useCallback(() => {
    setBellOpen((o) => !o);
    // mark all read when opened
    setPipelineAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }, []);

  // ── Data fetching ───────────────────────────────────────────────────────────
  const fetchAll = useCallback(
    async (force = false) => {
      if (force) setRefreshing(true);
      try {
        await dispatch(dashboardRefreshAll()).unwrap();
        setLastFetchTime(new Date());
      } finally {
        setRefreshing(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAll();
    const id = setInterval(() => fetchAll(true), 120000);
    return () => clearInterval(id);
  }, [fetchAll, selectedTimeRange]);

  // ── Stats ───────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total              = candidates.length;
    const shortlisted        = candidates.filter((c: any) => c?.status === "Shortlisted").length;
    const interviews         = candidates.filter((c: any) => c?.interview_scheduled).length;
    const assessmentsSent    = candidates.filter((c: any) => c?.exam_link_sent).length;
    const assessmentsCompleted = candidates.filter((c: any) => c?.exam_completed).length;
    const hires              = candidates.filter((c: any) => c?.final_status === "Hired").length;
    const pendingAssessments = candidates.filter(
      (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
    ).length;
    const now = new Date();
    const pendingInterviews = candidates.filter((c: any) => {
      if (!c?.interview_date) return false;
      return c?.interview_scheduled && new Date(c.interview_date) > now;
    }).length;
    const timeToHire = (() => {
      const hired = candidates.filter((c: any) => c?.final_status === "Hired" && c?.processed_date);
      if (!hired.length) return 0;
      const total = hired.reduce((acc: number, c: any) => {
        const days = Math.floor((Date.now() - new Date(c.processed_date).getTime()) / 86400000);
        return acc + Math.max(days, 0);
      }, 0);
      return Math.round(total / hired.length);
    })();
    return {
      totalApplications: total,
      activeInterviews: interviews,
      timeToHire,
      activeAssessments: pendingAssessments,
      shortlistRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0,
      assessmentCompletionRate:
        assessmentsSent > 0 ? ((assessmentsCompleted / assessmentsSent) * 100).toFixed(1) : 0,
      totalHires: hires,
      pendingActions: pendingAssessments + pendingInterviews,
    };
  }, [candidates]);

  // ── Notification banners ────────────────────────────────────────────────────
  useEffect(() => {
    const outs: any[] = [];
    const pendingAssessments = candidates.filter(
      (c: any) => c?.exam_link_sent && !c?.exam_completed && !c?.link_expired
    );
    if (pendingAssessments.length) {
      outs.push({
        id: 1, type: "warning",
        message: `${pendingAssessments.length} candidates have pending assessments`,
        action: "View Candidates", route: "/candidates",
      });
    }
    const upcomingToday = candidates.filter((c: any) => {
      if (!c?.interview_date) return false;
      const diffHrs = (new Date(c.interview_date).getTime() - Date.now()) / 3600000;
      return diffHrs > 0 && diffHrs < 24;
    });
    if (upcomingToday.length) {
      outs.push({
        id: 2, type: "info",
        message: `${upcomingToday.length} interviews scheduled for today`,
        action: "View Schedule", route: "/scheduler",
      });
    }
    setNotifications(outs);
  }, [candidates]);

  const pipelineStages = useMemo(() => [
    { name: "Applied",     value: candidates.length, color: "#3B82F6" },
    { name: "Screened",    value: candidates.filter((c: any) => c?.ats_score > 0).length, color: "#10B981" },
    { name: "Shortlisted", value: candidates.filter((c: any) => c?.status === "Shortlisted").length, color: "#F59E0B" },
    { name: "Assessment",  value: candidates.filter((c: any) => c?.exam_completed).length, color: "#8B5CF6" },
    { name: "Interview",   value: candidates.filter((c: any) => c?.interview_scheduled).length, color: "#EF4444" },
    { name: "Hired",       value: candidates.filter((c: any) => c?.final_status === "Hired").length, color: "#059669" },
  ], [candidates]);

  const assessmentMetrics = useMemo(() => [
    { name: "Sent",      value: candidates.filter((c: any) => c?.exam_link_sent).length },
    { name: "Started",   value: candidates.filter((c: any) => c?.exam_started).length },
    { name: "Completed", value: candidates.filter((c: any) => c?.exam_completed).length },
    { name: "Passed",    value: candidates.filter((c: any) => c?.exam_percentage >= 70).length },
  ], [candidates]);

  const handleRefresh = useCallback(() => fetchAll(true), [fetchAll]);

  if (loading && !lastFetchTime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
          <div className="flex items-center mt-1 space-x-4">
            <p className="text-gray-500 text-sm">
              Welcome back! Here&apos;s your recruitment overview
            </p>
            {lastFetchTime && (
              <span className="text-xs text-gray-500">
                Last updated: {lastFetchTime.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Refresh */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-gray-500"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          </button>

          {/* Time range */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="border rounded-lg px-4 py-2 text-sm text-gray-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          {/* ── Bell icon ── */}
          <div className="relative" ref={bellRef}>
            <button
              onClick={openBell}
              className="relative p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
              title="Pipeline Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {bellOpen && (
              <BellAlertDropdown
                alerts={pipelineAlerts}
                onClearAll={clearAllAlerts}
                onClose={() => setBellOpen(false)}
              />
            )}
          </div>

          {/* New Pipeline */}
          <button
            onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
          >
            New Pipeline
          </button>
        </div>
      </div>

      {/* ── Notification banners ── */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg border flex items-center justify-between ${
                n.type === "warning"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-center">
                <AlertCircle
                  className={`w-5 h-5 mr-3 ${
                    n.type === "warning" ? "text-yellow-600" : "text-blue-600"
                  }`}
                />
                <span className={n.type === "warning" ? "text-yellow-800" : "text-blue-800"}>
                  {n.message}
                </span>
              </div>
              <button
                onClick={() => router.push(n.route)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  n.type === "warning"
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {n.action}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Applications" value={stats.totalApplications} change={12.5}  icon={Users}  color="bg-blue-600"   subtitle="All time applications"  loading={loading} />
        <StatCard title="Shortlist Rate"     value={`${stats.shortlistRate}%`} change={5.2} icon={Target} color="bg-green-600"  subtitle="Candidates shortlisted" loading={loading} />
        <StatCard title="Time-to-Hire"       value={`${stats.timeToHire}d`}   change={-8.3} icon={Clock}  color="bg-yellow-600" subtitle="Average days to hire"   loading={loading} />
        <StatCard title="Pending Actions"    value={stats.pendingActions}                   icon={Bell}   color="bg-purple-600" subtitle="Requires attention"      loading={loading} />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Pipeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineStages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6">
                {pipelineStages.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Recruitment Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recruitmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="interviews"   stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="hires"        stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Jobs table ── */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Active Job Positions</h3>
          <button
            onClick={() => router.push("/candidates")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All Candidates →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Applications</th>
                <th className="px-6 py-3">Shortlisted</th>
                <th className="px-6 py-3">In Progress</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-lg font-medium">No job positions found</p>
                    <p className="mt-1">Start a new recruitment pipeline to begin</p>
                  </td>
                </tr>
              ) : (
                jobs.map((job: any) => {
                  const jobCandidates = candidates.filter((c: any) => c?.job_id === job.id);
                  const shortlisted   = jobCandidates.filter((c: any) => c?.status === "Shortlisted").length;
                  const inProgress    = jobCandidates.filter(
                    (c: any) => c?.exam_link_sent || c?.interview_scheduled
                  ).length;
                  return (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{jobCandidates.length}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">{shortlisted}</td>
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{inProgress}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/candidates?job_id=${job.id}`)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setSelectedPipelineJob(job)}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            Run Pipeline
                          </button>
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

      {/* ── Assessment metrics + Quick actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Assessment Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={assessmentMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Completion Rate</p>
              <p className="text-xl font-semibold text-gray-700">{stats.assessmentCompletionRate}%</p>
            </div>
            <div>
              <p className="text-gray-500">Pass Rate</p>
              <p className="text-xl font-semibold text-gray-700">
                {candidates.filter((c: any) => c?.exam_completed).length > 0
                  ? (
                      (candidates.filter((c: any) => c?.exam_percentage >= 70).length /
                        candidates.filter((c: any) => c?.exam_completed).length) * 100
                    ).toFixed(1)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/assessments")}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
            >
              <span className="font-medium text-gray-700">Manage Assessments</span>
              <span className="text-sm text-gray-500">{stats.activeAssessments} pending</span>
            </button>
            <button
              onClick={() => router.push("/scheduler")}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
            >
              <span className="font-medium text-gray-700">Schedule Interviews</span>
              <span className="text-sm text-gray-500">{stats.activeInterviews} scheduled</span>
            </button>
            <button
              onClick={() => jobs.length > 0 && setSelectedPipelineJob(jobs[0])}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
            >
              <span className="font-medium text-gray-700">Start New Recruitment</span>
              <span className="text-sm text-gray-500">Run pipeline</span>
            </button>
            <button
              onClick={() => router.push("/candidates")}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
            >
              <span className="font-medium text-gray-700">View All Candidates</span>
              <span className="text-sm text-gray-500">{candidates.length} total</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Pipeline Runner Modal ── */}
      {selectedPipelineJob && (
        <PipelineRunner
          job={selectedPipelineJob}
          onPipelineStart={() =>
            setPipelineStatus((p) => ({
              ...p,
              [selectedPipelineJob.id]: { status: "running", message: "Pipeline running..." },
            }))
          }
          onPipelineComplete={() => {
            fetchAll(true).then(() => {
              const jobCandidates = candidates.filter(
                (c: any) => String(c?.job_id) === String(selectedPipelineJob.id)
              );
              const shortlistedCount = jobCandidates.filter(
                (c: any) => c?.status === "Shortlisted"
              ).length;

              // ✅ Shows persistent toast (shortlisted + not-shortlisted counts)
              // Toast only closes when HR clicks the X button — never auto-dismisses
              addPipelineAlert(
                selectedPipelineJob.title,
                jobCandidates.length,
                shortlistedCount
              );

              setPipelineStatus((p) => ({
                ...p,
                [selectedPipelineJob.id]: { status: "completed", message: "Pipeline completed!" },
              }));
            });
          }}
          onClose={() => setSelectedPipelineJob(null)}
        />
      )}

      {/* ── Persistent Pipeline Result Toast ── */}
      {/* Stays visible until HR clicks X — no auto-dismiss timer */}
      <PipelineResultToast
        toasts={resultToasts}
        onDismiss={dismissToast}
      />
    </div>
  );
};

export default Dashboard;
