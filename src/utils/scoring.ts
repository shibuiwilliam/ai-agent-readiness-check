import type { ScoreLevel } from "../types";
import type { Rubric } from "../data/rubrics";

export function calculateTotalScore(
  scores: Record<string, ScoreLevel>,
): number {
  return Object.values(scores).reduce((sum, score) => {
    return sum + (score ?? 0);
  }, 0);
}

export function calculateRubricScore(
  rubric: Rubric,
  scores: Record<string, ScoreLevel>,
): number {
  return rubric.items.reduce((sum, item) => {
    return sum + (scores[item.id] ?? 0);
  }, 0);
}

export function getRubricMaxScore(rubric: Rubric): number {
  return rubric.items.length * 5;
}

export function getCompletedItemsCount(
  rubric: Rubric,
  scores: Record<string, ScoreLevel>,
): number {
  return rubric.items.filter((item) => scores[item.id] != null).length;
}

export function getTotalCompletedItemsCount(
  rubrics: Rubric[],
  scores: Record<string, ScoreLevel>,
): number {
  return rubrics.reduce((count, rubric) => {
    return count + getCompletedItemsCount(rubric, scores);
  }, 0);
}

export function getTotalItemsCount(rubrics: Rubric[]): number {
  return rubrics.reduce((count, rubric) => count + rubric.items.length, 0);
}

export function getTotalMaxScore(rubrics: Rubric[]): number {
  return rubrics.reduce((sum, rubric) => sum + getRubricMaxScore(rubric), 0);
}

const SCORE_BG_COLORS: Record<NonNullable<ScoreLevel>, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-blue-500",
  5: "bg-green-500",
};

const SCORE_TEXT_COLORS: Record<NonNullable<ScoreLevel>, string> = {
  1: "text-red-600",
  2: "text-orange-600",
  3: "text-yellow-600",
  4: "text-blue-600",
  5: "text-green-600",
};

const LEVEL_COLORS: Record<1 | 2 | 3 | 4, string> = {
  1: "bg-red-100 border-red-500 text-red-800",
  2: "bg-orange-100 border-orange-500 text-orange-800",
  3: "bg-blue-100 border-blue-500 text-blue-800",
  4: "bg-green-100 border-green-500 text-green-800",
};

export function getScoreColor(score: ScoreLevel): string {
  if (score === null) return "bg-gray-300";
  return SCORE_BG_COLORS[score];
}

export function getScoreTextColor(score: ScoreLevel): string {
  if (score === null) return "text-gray-400";
  return SCORE_TEXT_COLORS[score];
}

export function getLevelColor(level: 1 | 2 | 3 | 4): string {
  return LEVEL_COLORS[level];
}
