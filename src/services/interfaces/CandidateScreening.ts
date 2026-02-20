// Types

export interface AssessmentResultRow {
  id?: string | number;
  type: "testlify" | "criteria" | string;
  score?: number | null;
  completed?: boolean;
  invite_link?: string | null;
  completed_date?: string | null;
  feedback?: string | null;
}

export interface StatusInfo {
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  priority: number;
}
// export interface Candidate {
//   id: number | string;

//   // BASIC (backend often missing)
//   name?: string;
//   email: string;

//   job_id: string;
//   job_title: string;
//   status: string;

//   processed_date: string;

//   assessment_invite_link: string | null;

//   final_status: string;
//   ats_score: number;
//   resume_path: string;

//   // Assessment states
//   exam_link_sent: boolean;
//   exam_started: boolean;
//   exam_link_sent_date: string | null;
//   exam_time_taken: number | null;
//   exam_completed: boolean;
//   exam_percentage: number;
//   link_expired: boolean;
//   interview_scheduled: boolean;

//   // UI related
//   displayStatus: string;
//   displayScore: number;
//   scoreColor: string;
//   statusInfo: StatusInfo;

//   // Legacy Testlify fields
//   testlify_score: number;
//   testlify_completed: boolean;
//   testlify_invite_link: string | null;
//   testlify_completed_date: string | null;

//   // Legacy Criteria fields
//   criteria_score: number;
//   criteria_completed: boolean;
//   criteria_invite_link: string | null;
//   criteria_completed_date: string | null;

//   // Unified assessment array
//   assessment_results: AssessmentResultRow[];

//   // Extra backend info
//   exam_feedback: string;
// }

export interface Candidate {
  id: number | string;

  // Basic fields (optional)
  name?: string;
  email?: string;

  // Job info (optional)
  job_id?: string;
  job_title?: string;
  status?: string;
  processed_date?: string | null;

  // ATS + resume (optional)
  final_status?: string;
  ats_score?: number;
  resume_path?: string;

  // Exam fields (optional)
  exam_link_sent?: boolean;
  exam_started?: boolean;
  exam_link_sent_date?: string | null;
  exam_time_taken?: number | null;
  exam_completed?: boolean;
  exam_percentage?: number;
  link_expired?: boolean;
  interview_scheduled?: boolean;

  // UI helpers (optional)
  displayStatus?: string;
  displayScore?: number;
  scoreColor?: string;

  // Assessment links (optional)
  assessment_invite_link?: string | null;

  // Testlify (optional)
  testlify_score?: number;
  testlify_completed?: boolean;
  testlify_invite_link?: string | null;
  testlify_completed_date?: string | null;

  // Criteria (optional)
  criteria_score?: number;
  criteria_completed?: boolean;
  criteria_invite_link?: string | null;
  criteria_completed_date?: string | null;

  // Multi-assessment (optional)
  assessment_results?: AssessmentResultRow[];
  statusInfo?: StatusInfo;

  // Feedback (optional)
  exam_feedback?: string;
}

export interface AssessmentResultRow {
  id?: string | number;
  type: "testlify" | "criteria" | string;
  score?: number | null;
  completed?: boolean;
  invite_link?: string | null;
  completed_date?: string | null;
  feedback?: string | null;
}



export interface Job {
  id: string | number;
  title: string;
  location: string;
  description: string;
  requirements?: string;
  created_at?: string;
  status?: string;
}
export interface AssessmentStats {
  totalSent: number;
  totalCompleted: number;
  avgScore: number;
  passRate: number;
}


