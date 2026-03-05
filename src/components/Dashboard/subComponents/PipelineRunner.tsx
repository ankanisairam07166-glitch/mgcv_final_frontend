// "use client";

// import React, { useState } from "react";
// import { X, FileText, Zap, CheckCircle, XCircle } from "lucide-react";
// import { runFullPipeline } from "@/services/api/pipelineAPI";

// type Props = {
//   job: { id: number | string; title: string; location?: string; description?: string };
//   onPipelineStart?: () => void;
//   onPipelineComplete?: () => void;
//   onClose?: () => void;
// };

// const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
//   const [showConfirm, setShowConfirm] = useState(true);
//   const [isRunning, setIsRunning] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);

//   const run = async (createAssessment: boolean) => {
//     setShowConfirm(false);
//     setIsRunning(true);
//     setStatus("Starting pipeline...");
//     onPipelineStart?.();

//     try {
//       await runFullPipeline({
//         job_id: job.id,
//         job_title: job.title,
//         job_desc: job.description || "",
//         create_assessment: createAssessment,
//       });
//       setStatus("Pipeline completed successfully");
//       setTimeout(() => {
//         onPipelineComplete?.();
//         onClose?.();
//       }, 2000);
//     } catch (e: any) {
//       setStatus(`Error: ${e?.message || "Pipeline failed"}`);
//       setIsRunning(false);
//     }
//   };

//   if (!showConfirm && status) {
//     const isError = status.startsWith("Error");
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
//           {isError ? (
//             <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
//           ) : (
//             <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
//           )}
//           <p className="text-gray-900">{status}</p>
//           {!isRunning && (
//             <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
//               Close
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">Configure Pipeline</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="bg-gray-50 p-3 rounded-lg mb-4">
//           <p className="font-medium text-gray-900">{job.title}</p>
//           {job.location && <p className="text-sm text-gray-500">{job.location}</p>}
//         </div>

//         <div className="space-y-3">
//           <button
//             onClick={() => run(true)}
//             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
//           >
//             <div className="flex items-start">
//               <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
//               <div className="text-left flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Full Pipeline with Assessment</h4>
//                 <p className="text-sm text-gray-500 mt-1">• Scrape resumes<br/>• Create Testlify assessment<br/>• AI screening & scoring</p>
//                 <p className="text-xs text-blue-600 mt-2">~5-10 minutes</p>
//               </div>
//             </div>
//           </button>

//           <button
//             onClick={() => run(false)}
//             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
//           >
//             <div className="flex items-start">
//               <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
//               <div className="text-left flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-green-600">Quick Pipeline (No Assessment)</h4>
//                 <p className="text-sm text-gray-500 mt-1">• Scrape resumes<br/>• AI screening & scoring only</p>
//                 <p className="text-xs text-green-600 mt-2">~3-5 minutes</p>
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PipelineRunner;

// "use client";

// import React, { useState } from "react";
// import { X, FileText, Zap, CheckCircle, XCircle } from "lucide-react";
// import { runFullPipeline } from "@/services/api/pipelineAPI";

// type Props = {
//   job: { id: number | string; title: string; location?: string; description?: string };
//   onPipelineStart?: () => void;
//   onPipelineComplete?: () => void;
//   onClose?: () => void;
// };

// // Allowed providers
// type Provider = "testlify" | "criteria";

// const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
//   const [showConfirm, setShowConfirm] = useState(true);
//   const [isRunning, setIsRunning] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);

//   const run = async (provider: Provider) => {
//     setShowConfirm(false);
//     setIsRunning(true);
//     setStatus("Starting pipeline...");
//     onPipelineStart?.();

//     try {
//       await runFullPipeline({
//         job_id: job.id,
//         job_title: job.title,
//         job_desc: job.description || "",
//         create_assessment: true,          // always create an assessment
//         assessment_provider: provider,     // <-- NEW: choose Testlify or Criteria
//       });

//       setStatus("Pipeline completed successfully");
//       setTimeout(() => {
//         onPipelineComplete?.();
//         onClose?.();
//       }, 2000);
//     } catch (e: unknown) {
//       // Type guard to safely extract error message
//       const errorMessage = e instanceof Error ? e.message : "Pipeline failed";
//       setStatus(`Error: ${errorMessage}`);
//       setIsRunning(false);
//     }
//   };

//   if (!showConfirm && status) {
//     const isError = status.startsWith("Error");
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
//           {isError ? (
//             <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
//           ) : (
//             <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
//           )}
//           <p className="text-gray-900">{status}</p>
//           {!isRunning && (
//             <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
//               Close
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <div className="flex justify-between items-start mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">Configure Pipeline</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="bg-gray-50 p-3 rounded-lg mb-4">
//           <p className="font-medium text-gray-900">{job.title}</p>
//           {job.location && <p className="text-sm text-gray-500">{job.location}</p>}
//         </div>

//         <div className="space-y-3">
//           {/* Option 1: Testlify */}
//           <button
//             onClick={() => run("testlify")}
//             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
//           >
//             <div className="flex items-start">
//               <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
//               <div className="text-left flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
//                   Full Pipeline (Testlify)
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   • Scrape resumes<br />• Create <b>Testlify</b> assessment<br />• AI screening &amp; scoring
//                 </p>
//                 <p className="text-xs text-blue-600 mt-2">~5–10 minutes</p>
//               </div>
//             </div>
//           </button>

//           {/* Option 2: Criteria */}
//           <button
//             onClick={() => run("criteria")}
//             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
//           >
//             <div className="flex items-start">
//               <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
//               <div className="text-left flex-1">
//                 <h4 className="font-medium text-gray-900 group-hover:text-green-600">
//                   Quick Pipeline (Criteria)
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   • Scrape resumes<br />• Create <b>Criteria</b> assessment<br />• AI screening &amp; scoring
//                 </p>
//                 <p className="text-xs text-green-600 mt-2">~5–10 minutes</p>
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PipelineRunner;
"use client";

import React, { useState } from "react";
import { Loader2, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { runFullPipeline } from "@/services/api/pipelineAPI";

type Props = {
  job: { id: number | string; title: string; location?: string; description?: string };
  onPipelineStart?: () => void;
  onPipelineComplete?: () => void;
  onClose?: () => void;
};

type State = "loading" | "started" | "already_running" | "rate_limited" | "error";

const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
  const [state, setState]     = useState<State>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");

  React.useEffect(() => {
    const run = async () => {
      onPipelineStart?.();

      const result = await runFullPipeline({
        job_id:            job.id,
        job_title:         job.title,
        job_desc:          job.description || "",
        create_assessment: true,
      });

      if (result.ok) {
        setState("started");
        setTimeout(() => { onPipelineComplete?.(); onClose?.(); }, 2000);
      } else if (result.reason === "already_running") {
        setState("already_running");
        setTimeout(() => onClose?.(), 3000);
      } else if (result.reason === "rate_limited") {
        setState("rate_limited");
      } else {
        setErrorMsg(result.message);
        setState("error");
      }
    };

    run();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">

        {state === "loading" && (
          <>
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-700 font-medium">Starting pipeline for</p>
            <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
            <p className="text-sm text-gray-400 mt-2">Please wait...</p>
          </>
        )}

        {state === "started" && (
          <>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-900 font-medium">Pipeline started!</p>
            <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
            <p className="text-sm text-gray-400 mt-2">Running in background...</p>
          </>
        )}

        {state === "already_running" && (
          <>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-gray-900 font-medium">Already running</p>
            <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
            <p className="text-sm text-gray-500 mt-2">This job's pipeline is already in progress.</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">
              Got it
            </button>
          </>
        )}

        {state === "rate_limited" && (
          <>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-gray-900 font-medium">Too many requests</p>
            <p className="text-sm text-gray-500 mt-2">Please wait a few minutes before starting another pipeline.</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">
              OK
            </button>
          </>
        )}

        {state === "error" && (
          <>
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-gray-900 font-medium">Something went wrong</p>
            <p className="text-sm text-red-500 mt-1">{errorMsg}</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
              Close
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default PipelineRunner;