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

export function getScoreColor(score: ScoreLevel): string {
  switch (score) {
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-orange-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-blue-500";
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
}

export function getScoreTextColor(score: ScoreLevel): string {
  switch (score) {
    case 1:
      return "text-red-600";
    case 2:
      return "text-orange-600";
    case 3:
      return "text-yellow-600";
    case 4:
      return "text-blue-600";
    case 5:
      return "text-green-600";
    default:
      return "text-gray-400";
  }
}

export function getLevelColor(level: 1 | 2 | 3 | 4): string {
  switch (level) {
    case 1:
      return "bg-red-100 border-red-500 text-red-800";
    case 2:
      return "bg-orange-100 border-orange-500 text-orange-800";
    case 3:
      return "bg-blue-100 border-blue-500 text-blue-800";
    case 4:
      return "bg-green-100 border-green-500 text-green-800";
  }
}
