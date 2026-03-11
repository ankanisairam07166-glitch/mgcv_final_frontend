// // "use client";

// // import React, { useState } from "react";
// // import { X, FileText, Zap, CheckCircle, XCircle } from "lucide-react";
// // import { runFullPipeline } from "@/services/api/pipelineAPI";

// // type Props = {
// //   job: { id: number | string; title: string; location?: string; description?: string };
// //   onPipelineStart?: () => void;
// //   onPipelineComplete?: () => void;
// //   onClose?: () => void;
// // };

// // const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
// //   const [showConfirm, setShowConfirm] = useState(true);
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [status, setStatus] = useState<string | null>(null);

// //   const run = async (createAssessment: boolean) => {
// //     setShowConfirm(false);
// //     setIsRunning(true);
// //     setStatus("Starting pipeline...");
// //     onPipelineStart?.();

// //     try {
// //       await runFullPipeline({
// //         job_id: job.id,
// //         job_title: job.title,
// //         job_desc: job.description || "",
// //         create_assessment: createAssessment,
// //       });
// //       setStatus("Pipeline completed successfully");
// //       setTimeout(() => {
// //         onPipelineComplete?.();
// //         onClose?.();
// //       }, 2000);
// //     } catch (e: any) {
// //       setStatus(`Error: ${e?.message || "Pipeline failed"}`);
// //       setIsRunning(false);
// //     }
// //   };

// //   if (!showConfirm && status) {
// //     const isError = status.startsWith("Error");
// //     return (
// //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //         <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
// //           {isError ? (
// //             <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
// //           ) : (
// //             <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
// //           )}
// //           <p className="text-gray-900">{status}</p>
// //           {!isRunning && (
// //             <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
// //               Close
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
// //         <div className="flex justify-between items-start mb-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Configure Pipeline</h3>
// //           <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         <div className="bg-gray-50 p-3 rounded-lg mb-4">
// //           <p className="font-medium text-gray-900">{job.title}</p>
// //           {job.location && <p className="text-sm text-gray-500">{job.location}</p>}
// //         </div>

// //         <div className="space-y-3">
// //           <button
// //             onClick={() => run(true)}
// //             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
// //           >
// //             <div className="flex items-start">
// //               <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
// //               <div className="text-left flex-1">
// //                 <h4 className="font-medium text-gray-900 group-hover:text-blue-600">Full Pipeline with Assessment</h4>
// //                 <p className="text-sm text-gray-500 mt-1">• Scrape resumes<br/>• Create Testlify assessment<br/>• AI screening & scoring</p>
// //                 <p className="text-xs text-blue-600 mt-2">~5-10 minutes</p>
// //               </div>
// //             </div>
// //           </button>

// //           <button
// //             onClick={() => run(false)}
// //             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
// //           >
// //             <div className="flex items-start">
// //               <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
// //               <div className="text-left flex-1">
// //                 <h4 className="font-medium text-gray-900 group-hover:text-green-600">Quick Pipeline (No Assessment)</h4>
// //                 <p className="text-sm text-gray-500 mt-1">• Scrape resumes<br/>• AI screening & scoring only</p>
// //                 <p className="text-xs text-green-600 mt-2">~3-5 minutes</p>
// //               </div>
// //             </div>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PipelineRunner;

// // "use client";

// // import React, { useState } from "react";
// // import { X, FileText, Zap, CheckCircle, XCircle } from "lucide-react";
// // import { runFullPipeline } from "@/services/api/pipelineAPI";

// // type Props = {
// //   job: { id: number | string; title: string; location?: string; description?: string };
// //   onPipelineStart?: () => void;
// //   onPipelineComplete?: () => void;
// //   onClose?: () => void;
// // };

// // // Allowed providers
// // type Provider = "testlify" | "criteria";

// // const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
// //   const [showConfirm, setShowConfirm] = useState(true);
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [status, setStatus] = useState<string | null>(null);

// //   const run = async (provider: Provider) => {
// //     setShowConfirm(false);
// //     setIsRunning(true);
// //     setStatus("Starting pipeline...");
// //     onPipelineStart?.();

// //     try {
// //       await runFullPipeline({
// //         job_id: job.id,
// //         job_title: job.title,
// //         job_desc: job.description || "",
// //         create_assessment: true,          // always create an assessment
// //         assessment_provider: provider,     // <-- NEW: choose Testlify or Criteria
// //       });

// //       setStatus("Pipeline completed successfully");
// //       setTimeout(() => {
// //         onPipelineComplete?.();
// //         onClose?.();
// //       }, 2000);
// //     } catch (e: unknown) {
// //       // Type guard to safely extract error message
// //       const errorMessage = e instanceof Error ? e.message : "Pipeline failed";
// //       setStatus(`Error: ${errorMessage}`);
// //       setIsRunning(false);
// //     }
// //   };

// //   if (!showConfirm && status) {
// //     const isError = status.startsWith("Error");
// //     return (
// //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //         <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
// //           {isError ? (
// //             <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
// //           ) : (
// //             <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
// //           )}
// //           <p className="text-gray-900">{status}</p>
// //           {!isRunning && (
// //             <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
// //               Close
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
// //         <div className="flex justify-between items-start mb-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Configure Pipeline</h3>
// //           <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         <div className="bg-gray-50 p-3 rounded-lg mb-4">
// //           <p className="font-medium text-gray-900">{job.title}</p>
// //           {job.location && <p className="text-sm text-gray-500">{job.location}</p>}
// //         </div>

// //         <div className="space-y-3">
// //           {/* Option 1: Testlify */}
// //           <button
// //             onClick={() => run("testlify")}
// //             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
// //           >
// //             <div className="flex items-start">
// //               <FileText className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
// //               <div className="text-left flex-1">
// //                 <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
// //                   Full Pipeline (Testlify)
// //                 </h4>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   • Scrape resumes<br />• Create <b>Testlify</b> assessment<br />• AI screening &amp; scoring
// //                 </p>
// //                 <p className="text-xs text-blue-600 mt-2">~5–10 minutes</p>
// //               </div>
// //             </div>
// //           </button>

// //           {/* Option 2: Criteria */}
// //           <button
// //             onClick={() => run("criteria")}
// //             className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
// //           >
// //             <div className="flex items-start">
// //               <Zap className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
// //               <div className="text-left flex-1">
// //                 <h4 className="font-medium text-gray-900 group-hover:text-green-600">
// //                   Quick Pipeline (Criteria)
// //                 </h4>
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   • Scrape resumes<br />• Create <b>Criteria</b> assessment<br />• AI screening &amp; scoring
// //                 </p>
// //                 <p className="text-xs text-green-600 mt-2">~5–10 minutes</p>
// //               </div>
// //             </div>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PipelineRunner;
// "use client";

// import React, { useState } from "react";
// import { Loader2, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
// import { runFullPipeline } from "@/services/api/pipelineAPI";

// type Props = {
//   job: { id: number | string; title: string; location?: string; description?: string };
//   onPipelineStart?: () => void;
//   onPipelineComplete?: () => void;
//   onClose?: () => void;
// };

// type State = "loading" | "started" | "already_running" | "rate_limited" | "error";

// const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
//   const [state, setState]     = useState<State>("loading");
//   const [errorMsg, setErrorMsg] = useState<string>("");

//   React.useEffect(() => {
//     const run = async () => {
//       onPipelineStart?.();

//       const result = await runFullPipeline({
//         job_id:            job.id,
//         job_title:         job.title,
//         job_desc:          job.description || "",
//         create_assessment: true,
//       });

//       if (result.ok) {
//         setState("started");
//         setTimeout(() => { onPipelineComplete?.(); onClose?.(); }, 2000);
//       } else if (result.reason === "already_running") {
//         setState("already_running");
//         setTimeout(() => onClose?.(), 3000);
//       } else if (result.reason === "rate_limited") {
//         setState("rate_limited");
//       } else {
//         setErrorMsg(result.message);
//         setState("error");
//       }
//     };

//     run();
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">

//         {state === "loading" && (
//           <>
//             <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
//             <p className="text-gray-700 font-medium">Starting pipeline for</p>
//             <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
//             <p className="text-sm text-gray-400 mt-2">Please wait...</p>
//           </>
//         )}

//         {state === "started" && (
//           <>
//             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
//               <CheckCircle className="w-6 h-6 text-green-600" />
//             </div>
//             <p className="text-gray-900 font-medium">Pipeline started!</p>
//             <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
//             <p className="text-sm text-gray-400 mt-2">Running in background...</p>
//           </>
//         )}

//         {state === "already_running" && (
//           <>
//             <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
//               <Clock className="w-6 h-6 text-amber-500" />
//             </div>
//             <p className="text-gray-900 font-medium">Already running</p>
//             <p className="text-blue-600 font-semibold mt-1">{job.title}</p>
//             <p className="text-sm text-gray-500 mt-2">This job's pipeline is already in progress.</p>
//             <button onClick={onClose} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">
//               Got it
//             </button>
//           </>
//         )}

//         {state === "rate_limited" && (
//           <>
//             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
//               <AlertTriangle className="w-6 h-6 text-orange-500" />
//             </div>
//             <p className="text-gray-900 font-medium">Too many requests</p>
//             <p className="text-sm text-gray-500 mt-2">Please wait a few minutes before starting another pipeline.</p>
//             <button onClick={onClose} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">
//               OK
//             </button>
//           </>
//         )}

//         {state === "error" && (
//           <>
//             <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
//             <p className="text-gray-900 font-medium">Something went wrong</p>
//             <p className="text-sm text-red-500 mt-1">{errorMsg}</p>
//             <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
//               Close
//             </button>
//           </>
//         )}

//       </div>
//     </div>
//   );
// };

// export default PipelineRunner;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, Loader2, FileSearch, Brain, ClipboardList, X } from "lucide-react";
import { runFullPipeline } from "@/services/api/pipelineAPI";

type Props = {
  job: { id: number | string; title: string; location?: string; description?: string };
  onPipelineStart?: () => void;
  onPipelineComplete?: () => void;
  onClose?: () => void;
};

type StepStatus = "waiting" | "running" | "done" | "error" | "skipped";

interface Step {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  status: StepStatus;
  detail?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const PipelineRunner: React.FC<Props> = ({ job, onPipelineStart, onPipelineComplete, onClose }) => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "scrape",
      label: "Resume Scraping",
      description: "Downloading resumes from HR dashboard",
      icon: <FileSearch className="w-5 h-5" />,
      status: "waiting",
    },
    {
      id: "assessment",
      label: "Assessment Creation",
      description: "Creating exam via assessment platform",
      icon: <ClipboardList className="w-5 h-5" />,
      status: "waiting",
    },
    {
      id: "screening",
      label: "AI Screening & Scoring",
      description: "GPT scoring resumes & sending emails",
      icon: <Brain className="w-5 h-5" />,
      status: "waiting",
    },
  ]);

  const [overallStatus, setOverallStatus] = useState<"running" | "completed" | "error">("running");
  const [errorMsg, setErrorMsg] = useState("");
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef(false);

  const updateStep = (id: string, status: StepStatus, detail?: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, detail: detail ?? s.detail } : s))
    );
  };

  // Map backend progress % to step statuses
  const applyProgress = (progress: number, message: string, status: string) => {
    const msg = (message || "").toLowerCase();

    if (status === "completed") {
      setSteps((prev) => prev.map((s) => ({ ...s, status: s.status === "error" ? "error" : "done" })));
      setOverallStatus("completed");
      return;
    }

    if (status === "error") {
      setOverallStatus("error");
      setErrorMsg(message);
      // mark currently running step as error
      setSteps((prev) =>
        prev.map((s) => (s.status === "running" ? { ...s, status: "error" } : s))
      );
      return;
    }

    // Step 1: Scraping (0–40%)
    if (progress <= 10) {
      updateStep("scrape", "running", "Initializing...");
    } else if (progress <= 40 || msg.includes("scrap")) {
      updateStep("scrape", "running", message);
    }

    // Step 2: Assessment (40–70%)
    if (progress > 40 && progress <= 45) {
      updateStep("scrape", "done", "Resumes downloaded");
      updateStep("assessment", "running", "Starting assessment creation...");
    } else if (progress > 45 && progress <= 70 || msg.includes("assessment")) {
      updateStep("scrape", "done");
      updateStep("assessment", "running", message);
    }

    // Step 3: Screening (70–95%)
    if (progress > 70 && progress <= 75) {
      updateStep("assessment", "done", "Assessment link created");
      updateStep("screening", "running", "Starting AI screening...");
    } else if (progress > 75 || msg.includes("screen") || msg.includes("ai")) {
      updateStep("assessment", "done");
      updateStep("screening", "running", message);
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const start = async () => {
      onPipelineStart?.();

      // Mark step 1 as running immediately
      updateStep("scrape", "running", "Starting...");

      try {
        const res = await fetch(`${API_BASE}/api/run_full_pipeline`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_id: job.id,
            job_title: job.title,
            job_desc: job.description || "",
            create_assessment: true,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          if (res.status === 409) {
            setOverallStatus("error");
            setErrorMsg("Pipeline already running for this job.");
            setSteps((prev) => prev.map((s) => ({ ...s, status: "waiting" })));
            return;
          }
          throw new Error(data.message || "Failed to start pipeline");
        }

        // Poll status every 3 seconds
        pollRef.current = setInterval(async () => {
          try {
            const statusRes = await fetch(`${API_BASE}/api/pipeline_status/${job.id}`);
            const statusData = await statusRes.json();

            if (!statusData.success) return;

            const { status, message, progress } = statusData.status;
            applyProgress(progress ?? 0, message ?? "", status ?? "running");

            if (status === "completed" || status === "error") {
              if (pollRef.current) clearInterval(pollRef.current);
              if (status === "completed") {
                setTimeout(() => {
                  onPipelineComplete?.();
                }, 2500);
              }
            }
          } catch {
            // ignore poll errors silently
          }
        }, 3000);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setOverallStatus("error");
        setErrorMsg(msg);
        setSteps((prev) => prev.map((s) => (s.status === "running" ? { ...s, status: "error" } : s)));
      }
    };

    start();

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const completedCount = steps.filter((s) => s.status === "done").length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-lg">Running Pipeline</h2>
            <p className="text-blue-200 text-sm mt-0.5 truncate max-w-[260px]">{job.title}</p>
          </div>
          {overallStatus !== "running" && (
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div
            className={`h-full transition-all duration-700 ${
              overallStatus === "error" ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{ width: overallStatus === "completed" ? "100%" : `${progressPct}%` }}
          />
        </div>

        {/* Steps */}
        <div className="px-6 py-5 space-y-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-start gap-4">
              {/* Icon circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  step.status === "done"
                    ? "bg-green-100 text-green-600"
                    : step.status === "running"
                    ? "bg-blue-100 text-blue-600"
                    : step.status === "error"
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.status === "done" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : step.status === "running" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : step.status === "error" ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{idx + 1}</span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-medium text-sm ${
                      step.status === "done"
                        ? "text-green-700"
                        : step.status === "running"
                        ? "text-blue-700"
                        : step.status === "error"
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.status === "running" && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium animate-pulse">
                      In progress
                    </span>
                  )}
                  {step.status === "done" && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {step.status === "running" && step.detail
                    ? step.detail
                    : step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          {overallStatus === "running" && (
            <div className="bg-blue-50 rounded-lg px-4 py-3 text-center">
              <p className="text-blue-700 text-sm font-medium">Pipeline running in background</p>
              <p className="text-blue-500 text-xs mt-0.5">You can close this — it will keep running</p>
              <button
                onClick={onClose}
                className="mt-3 text-xs text-blue-600 underline underline-offset-2 hover:text-blue-800"
              >
                Hide and continue
              </button>
            </div>
          )}

          {overallStatus === "completed" && (
            <div className="bg-green-50 rounded-lg px-4 py-3 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-green-700 text-sm font-medium">All steps completed!</p>
              <p className="text-green-500 text-xs mt-0.5">Candidates screened & emails sent</p>
              <button
                onClick={() => { onPipelineComplete?.(); onClose?.(); }}
                className="mt-3 px-5 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 font-medium"
              >
                View Results
              </button>
            </div>
          )}

          {overallStatus === "error" && (
            <div className="bg-red-50 rounded-lg px-4 py-3 text-center">
              <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
              <p className="text-red-700 text-sm font-medium">Pipeline encountered an error</p>
              <p className="text-red-400 text-xs mt-0.5 truncate">{errorMsg}</p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PipelineRunner;
