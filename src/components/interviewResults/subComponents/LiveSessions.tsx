// import React from "react";
// import { Activity, CircleDot } from "lucide-react";
// import { InterviewCandidate } from "@/services/api/interviewResultsAPI";

// const LiveSessions: React.FC<{
//   candidates: InterviewCandidate[];
//   liveStatuses: Record<number, any>;
//   onOpen: (id: number) => void;
// }> = ({ candidates, liveStatuses, onOpen }) => {
//   const live = candidates.filter((c) => c && liveStatuses[c.id]);

//   if (!live.length) return null;

//   return (
//     <div className="mb-6">
//       <h3 className="mb-3 flex items-center text-lg font-semibold">
//         <Activity className="mr-2 h-5 w-5 text-blue-600" />
//         Live Interview Sessions
//       </h3>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//         {live.map((c) => {
//           const s = liveStatuses[c.id];
//           return (
//             <div key={c.id} className="rounded-lg border bg-white p-4 shadow-sm">
//               <div className="mb-3 flex items-start justify-between">
//                 <div>
//                   <button
//                     className="font-semibold text-gray-900 hover:text-blue-600"
//                     onClick={() => onOpen(c.id)}
//                   >
//                     {c.name}
//                   </button>
//                   <p className="text-sm text-gray-600">{c.job_title}</p>
//                 </div>
//                 <CircleDot className={`h-4 w-4 ${s.is_active ? "text-green-600 animate-pulse" : "text-gray-400"}`} />
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Progress:</span>
//                   <span className="font-medium">{(s.progress ?? 0).toFixed(0)}%</span>
//                 </div>
//                 <div className="h-2 w-full rounded-full bg-gray-200">
//                   <div
//                     className="h-2 rounded-full bg-blue-600 transition-all"
//                     style={{ width: `${s.progress ?? 0}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default LiveSessions;

import React from "react";
import { Activity, CircleDot } from "lucide-react";

// Minimal local shape used by this component.
// Swap this for a shared export when you add one.
type InterviewCandidate = {
  id: number;
  name: string;
  email?: string | null;
  job_title?: string | null;

  interview_started_at?: string | null;
  interview_completed_at?: string | null;
  interview_ai_analysis_status?: "processing" | string | null;
};

type LiveStatus = {
  progress?: number;
  started_at?: string;
  // add anything else you surface (e.g., room, duration, etc.)
};

const LiveSessions: React.FC<{
  candidates: InterviewCandidate[];
  liveStatuses: Record<number, LiveStatus | undefined>;onOpen?: (id: number) => void;
}> = ({ candidates, liveStatuses }) => {
  // “Live” = has a live status entry, or started but not completed.
  const live = candidates.filter((c) => {
    const s = liveStatuses[c.id];
    const started = !!c.interview_started_at && !c.interview_completed_at;
    const hasLive = !!s && (s.progress ?? 0) >= 0;
    return started || hasLive;
  });

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Live Sessions</h3>
        </div>
        <span className="text-sm text-gray-500">{live.length} active</span>
      </div>

      {live.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No sessions are live right now</div>
      ) : (
        <ul className="divide-y">
          {live.map((c) => {
            const s = liveStatuses[c.id];
            const progress = Math.max(0, Math.min(100, Math.round(s?.progress ?? 0)));

            return (
              <li key={c.id} className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-green-600" />
                    <span className="truncate font-medium text-gray-900">{c.name}</span>
                  </div>
                  <div className="truncate text-sm text-gray-500">
                    {c.job_title ?? "—"} {c.email ? `• ${c.email}` : ""}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-green-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-xs text-gray-500">{progress}%</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LiveSessions;
