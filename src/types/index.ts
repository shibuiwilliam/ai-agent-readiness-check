export type ScoreLevel = 1 | 2 | 3 | 4 | 5 | null;

export interface EvaluationState {
  scores: Record<string, ScoreLevel>;
}

export interface ReadinessLevelInfo {
  level: 1 | 2 | 3 | 4;
  name: string;
  range: string;
  action: string;
}

// Re-export from rubrics for convenience
export type { Rubric, CheckItem, LevelInfo } from "../data/rubrics";
