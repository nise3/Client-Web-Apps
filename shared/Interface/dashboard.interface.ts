export interface IDashboardStatistics {
  total_enroll: number | bigint;
  total_course: number | bigint;
  total_batch: number | bigint;
  total_running_students: number | bigint;
  total_trainers: number | bigint;
  total_training_centers: number | bigint;
  total_demand_from_industry: number | bigint;
  total_certificate_issue: number | bigint;
  total_trending_course: number | bigint;
}

export interface IDashboardMostDemandableCourse {
  value: number;
  name: string;
}
