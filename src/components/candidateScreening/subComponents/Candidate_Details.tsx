// "use client";

// import React from "react";
// import { Eye, Send, Calendar, Download, Mail } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Candidate } from "@/services/interfaces/CandidateScreening";

// interface CandidateDetailsProps {
//   candidate: Candidate | null;
//   onSendReminder?: (candidateId: string | number) => void;
// }

// const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
//   const router = useRouter();

//   if (!candidate) {
//     return (
//       <div className="p-8 text-center text-gray-500">
//         <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//         <p className="text-lg font-medium">Select a candidate to view details</p>
//         <p className="text-sm mt-1">Choose a candidate from the list to see their information</p>
//       </div>
//     );
//   }

//   const StatusIcon = candidate.statusInfo?.icon;

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-6">
//         <div className="flex items-center space-x-4">
//           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-medium">
//             {candidate.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
//             <p className="text-gray-500">{candidate.job_title}</p>
//             <div className="flex items-center space-x-3 mt-2">
//               <a href={`mailto:${candidate.email}`} className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
//                 <Mail className="w-3 h-3 mr-1" />
//                 {candidate.email}
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-100 bg-white">
//             <div>
//               <div className={`text-2xl font-bold ${candidate.scoreColor}`}>
//                 {(candidate.displayScore ?? 0).toFixed(0)}
//               </div>
//               <div className="text-xs text-gray-500">ATS Score</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Status */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-600 mb-1">Current Status</p>
//             {StatusIcon && (
//               <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${candidate.statusInfo?.color}`}>
//                 <StatusIcon className="w-4 h-4 mr-1.5" />
//                 {candidate.displayStatus}
//               </span>
//             )}
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-600 mb-1">Applied</p>
//             <p className="font-medium">
//               {candidate.processed_date ? new Date(candidate.processed_date).toLocaleDateString() : "—"}
//             </p>
//           </div>
//         </div>

//         {candidate.exam_completed && (
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Assessment Score</p>
//                 <p className={`text-lg font-semibold ${(candidate.exam_percentage ?? 0) >= 70 ? "text-green-600" : "text-red-600"}`}>
//                   {candidate.exam_percentage?.toFixed(0)}%
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm text-gray-600">Completed</p>
//                 <p className="font-medium">{candidate.exam_completed ? "Yes" : "No"}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {candidate.interview_scheduled && (
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Interview Status</p>
//                 <p className="text-green-600 font-medium">Scheduled</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="space-y-3">
//         {candidate.resume_path && (
//           <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//             <Download className="w-4 h-4 mr-2" />
//             Download Resume
//           </button>
//         )}

//         {candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired && onSendReminder && (
//           <button
//             onClick={() => onSendReminder(candidate.id)}
//             className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
//           >
//             <Send className="w-4 h-4 mr-2" />
//             Send Assessment Reminder
//           </button>
//         )}

//         {candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled && (
//           <button
//             onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
//             className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//           >
//             <Calendar className="w-4 h-4 mr-2" />
//             Schedule Interview
//           </button>
//         )}

//         <button
//           onClick={() => router.push(`/candidates/${candidate.id}`)} 
//           className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Eye className="w-4 h-4 mr-2" />
//           View Full Profile
//         </button>
//       </div>

//       {/* Additional Info */}
//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h3>
//         <div className="space-y-2">
//           <div className="flex items-center justify-between text-sm">
//             <span className="text-gray-600">Job ID</span>
//             <span className="font-medium">{candidate.job_id}</span>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <span className="text-gray-600">Candidate ID</span>
//             <span className="font-medium">{candidate.id}</span>
//           </div>
//           {candidate.status && (
//             <div className="flex items-center justify-between text-sm">
//               <span className="text-gray-600">Initial Status</span>
//               <span className="font-medium">{candidate.status}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(CandidateDetails);
"use client";

import React from "react";
import {
  Eye, Send, Calendar, Download, Mail,
  CheckCircle, XCircle, AlertTriangle,
  ThumbsUp, ThumbsDown, Clock, Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Candidate } from "@/services/interfaces/CandidateScreening";

interface CandidateDetailsProps {
  candidate: Candidate | null;
  onSendReminder?: (candidateId: string | number) => void;
}

// ── Shortlist reasons ─────────────────────────────────────────────────────────
function getShortlistReasons(c: Candidate): string[] {
  const reasons: string[] = [];
  const score = c?.ats_score ?? 0;

  if (score >= 85)
    reasons.push(`Excellent ATS score of ${score.toFixed(0)}/100 — top 10% of applicants`);
  else if (score >= 70)
    reasons.push(`Strong ATS score of ${score.toFixed(0)}/100 — meets the shortlist threshold`);
  else if (score >= 60)
    reasons.push(`Acceptable ATS score of ${score.toFixed(0)}/100 — manually reviewed and approved`);

  if (c?.exam_completed && (c?.exam_percentage ?? 0) >= 70)
    reasons.push(`Passed assessment with ${c.exam_percentage?.toFixed(0)}% — above the 70% pass mark`);

  if (c?.interview_scheduled)
    reasons.push("Interview scheduled — progressed through all screening stages");

  if (c?.final_status === "Hired")
    reasons.push("Offer accepted — candidate successfully hired");

  if (reasons.length === 0)
    reasons.push("Met minimum qualification criteria set for this job role");

  return reasons;
}

// ── Rejection — each point has a headline + 2–3 specific feedback bullets ────
interface RejectionPoint {
  headline: string;       // shown with ✗ or ℹ icon
  feedback: string[];     // detail bullets shown indented below the headline
  isJourney?: boolean;    // greyed context row — what happened before this stage
}

function getRejectionPoints(c: Candidate): RejectionPoint[] {
  const points: RejectionPoint[] = [];
  const score = c?.ats_score ?? 0;
  const exam  = c?.exam_percentage ?? 0;

  // ── Screened out at ATS — never reached assessment ────────────────────────
  if (!c?.exam_link_sent) {
    const gap = Math.max(70 - score, 0).toFixed(0);
    points.push({
      headline: score < 60
        ? `Low ATS score: ${score.toFixed(0)}/100 — minimum threshold is 60`
        : `ATS score ${score.toFixed(0)}/100 — below the shortlist cut-off of 70`,
      feedback: [
        `Score is ${gap} points below the shortlist threshold of 70`,
        "Resume keywords and experience don't closely match the job description",
        "Profile was filtered out at the automated screening stage before any manual review",
      ],
    });
    return points;
  }

  // ── Was shortlisted by ATS first — show as a greyed journey context row ──
  if (score >= 70) {
    points.push({
      headline: `Initially shortlisted — ATS score ${score.toFixed(0)}/100 met the threshold`,
      feedback: [],
      isJourney: true,
    });
  } else if (score >= 60) {
    points.push({
      headline: `Initially reviewed — ATS score ${score.toFixed(0)}/100 passed minimum screening`,
      feedback: [],
      isJourney: true,
    });
  }

  // ── Assessment link expired ───────────────────────────────────────────────
  if (c?.link_expired && !c?.exam_completed) {
    points.push({
      headline: "Assessment not completed — invitation link expired",
      feedback: [
        "Candidate received the assessment link but did not open or submit the test",
        "Assessment links have a fixed validity window — once expired they cannot be reused",
        "HR can decide whether to resend the link or close this application",
      ],
    });
    return points;
  }

  // ── Failed assessment ─────────────────────────────────────────────────────
  if (c?.exam_completed && exam < 70) {
    const gap = (70 - exam).toFixed(0);
    const severity =
      exam < 40
        ? "Very low score — significant gaps in core skills required for this role"
        : exam < 55
        ? "Score indicates partial understanding but insufficient depth in key technical areas"
        : `Score is close to the pass mark — candidate shows some ability but fell ${gap}% short`;

    points.push({
      headline: `Failed assessment: scored ${exam.toFixed(0)}% — required pass mark is 70%`,
      feedback: [
        `Achieved ${exam.toFixed(0)}% against the 70% pass mark — ${gap}% below the minimum`,
        severity,
        "Strong ATS resume score but technical skills were not demonstrated at the required level in the test",
      ],
    });
  }

  // ── Rejected after assessment by HR ──────────────────────────────────────
  if (c?.final_status === "Rejected After Exam") {
    points.push({
      headline: "Did not meet post-assessment criteria for the next stage",
      feedback: [
        "Overall evaluation after the assessment did not clear the bar set for this role",
        "Profile assessed holistically — skills, experience, and assessment result considered together",
        "HR review determined the candidate is not a strong enough fit at this stage",
      ],
    });
  }

  return points;
}

// ─── Component ────────────────────────────────────────────────────────────────
const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onSendReminder }) => {
  const router = useRouter();

  if (!candidate) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Eye className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-lg font-medium">Select a candidate to view details</p>
        <p className="text-sm mt-1">Choose a candidate from the list to see their information</p>
      </div>
    );
  }

  const StatusIcon = candidate.statusInfo?.icon;

  // Final outcome always wins — never show both panels at once
  const isFinallyRejected =
    candidate.status === "Rejected" ||
    candidate.final_status === "Rejected After Exam" ||
    (candidate.exam_completed && (candidate.exam_percentage ?? 0) < 70) ||
    (candidate.link_expired && !candidate.exam_completed);

  const isShortlisted = !isFinallyRejected && (
    candidate.status === "Shortlisted" ||
    candidate.interview_scheduled ||
    candidate.final_status === "Hired"
  );

  const isRejected = isFinallyRejected;

  const shortlistReasons  = isShortlisted ? getShortlistReasons(candidate) : [];
  const rejectionPoints   = isRejected    ? getRejectionPoints(candidate)   : [];

  return (
    <div className="p-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-medium flex-shrink-0">
            {candidate.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
            <p className="text-gray-500">{candidate.job_title}</p>
            <a href={`mailto:${candidate.email}`} className="text-sm text-blue-600 hover:text-blue-700 flex items-center mt-2">
              <Mail className="w-3 h-3 mr-1" />
              {candidate.email}
            </a>
          </div>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-blue-100 bg-white">
            <div>
              <div className={`text-2xl font-bold ${candidate.scoreColor}`}>
                {(candidate.displayScore ?? 0).toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">ATS Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Current Status ── */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Status</p>
            {StatusIcon && (
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${candidate.statusInfo?.color}`}>
                <StatusIcon className="w-4 h-4 mr-1.5" />
                {candidate.displayStatus}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Applied</p>
            <p className="font-medium">
              {candidate.processed_date ? new Date(candidate.processed_date).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>

        {candidate.exam_completed && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assessment Score</p>
                <p className={`text-lg font-semibold ${(candidate.exam_percentage ?? 0) >= 70 ? "text-green-600" : "text-red-600"}`}>
                  {candidate.exam_percentage?.toFixed(0)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="font-medium">Yes</p>
              </div>
            </div>
          </div>
        )}

        {candidate.interview_scheduled && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Interview Status</p>
            <p className="text-green-600 font-medium">Scheduled</p>
          </div>
        )}
      </div>

      {/* ── ✅ Why Shortlisted ── */}
      {isShortlisted && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-green-100 border-b border-green-200">
            <ThumbsUp className="w-4 h-4 text-green-700 flex-shrink-0" />
            <span className="text-sm font-semibold text-green-800">Why Shortlisted</span>
          </div>
          <ul className="px-4 py-3 space-y-2">
            {shortlistReasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between text-xs text-green-700 mb-1">
              <span>ATS Score</span>
              <span className="font-semibold">{(candidate.ats_score ?? 0).toFixed(0)} / 100</span>
            </div>
            <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-2 bg-green-500 rounded-full transition-all"
                style={{ width: `${Math.min(candidate.ats_score ?? 0, 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* ── ❌ Why Rejected ── */}
      {isRejected && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 overflow-hidden">

          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-100 border-b border-red-200">
            <ThumbsDown className="w-4 h-4 text-red-700 flex-shrink-0" />
            <span className="text-sm font-semibold text-red-800">Why Rejected</span>
          </div>

          <div className="px-4 py-3 space-y-3">
            {rejectionPoints.map((pt, i) => (
              <div key={i}>
                {/* ── Headline row ── */}
                {pt.isJourney ? (
                  /* Greyed journey context — "what happened before" */
                  <div className="flex items-start gap-2 text-xs text-red-400 italic mb-1">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{pt.headline}</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-sm font-medium text-red-800">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{pt.headline}</span>
                  </div>
                )}

                {/* ── Feedback bullets indented under the headline ── */}
                {pt.feedback.length > 0 && (
                  <ul className="mt-1.5 ml-6 space-y-1">
                    {pt.feedback.map((fb, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-red-700">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{fb}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* ATS score bar */}
          <div className="px-4 pb-3 pt-2 border-t border-red-200">
            <div className="flex items-center justify-between text-xs text-red-700 mb-1">
              <span>ATS Score</span>
              <span className="font-semibold">{(candidate.ats_score ?? 0).toFixed(0)} / 100</span>
            </div>
            <div className="w-full h-2 bg-red-200 rounded-full overflow-hidden">
              <div className="h-2 bg-red-400 rounded-full transition-all"
                style={{ width: `${Math.min(candidate.ats_score ?? 0, 100)}%` }} />
            </div>
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              Minimum required score: 70 / 100
            </p>
          </div>
        </div>
      )}

      {/* Assessment Expired notice — fallback if not caught above */}
      {candidate.link_expired && !candidate.exam_completed && !isRejected && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
          <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Assessment link expired</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              The candidate did not complete the assessment before the deadline.
            </p>
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      <div className="space-y-3">
        {candidate.resume_path && (
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </button>
        )}

        {candidate.exam_link_sent && !candidate.exam_completed && !candidate.link_expired && onSendReminder && (
          <button
            onClick={() => onSendReminder(candidate.id)}
            className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Assessment Reminder
          </button>
        )}

        {candidate.exam_completed && (candidate.exam_percentage ?? 0) >= 70 && !candidate.interview_scheduled && (
          <button
            onClick={() => router.push(`/scheduler?candidate_id=${candidate.id}`)}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Interview
          </button>
        )}

        <button
          onClick={() => router.push(`/candidates/${candidate.id}`)}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Full Profile
        </button>
      </div>

      {/* ── Additional Info ── */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Job ID</span>
            <span className="font-medium">{candidate.job_id}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Candidate ID</span>
            <span className="font-medium">{candidate.id}</span>
          </div>
          {candidate.status && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Initial Status</span>
              <span className="font-medium">{candidate.status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CandidateDetails);
