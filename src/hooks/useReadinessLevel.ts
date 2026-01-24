import { useMemo } from "react";
import type { ReadinessLevelInfo, ScoreLevel } from "../types";
import type { Translations } from "../i18n/translations";
import { calculateTotalScore } from "../utils/scoring";

export function useReadinessLevel(
  scores: Record<string, ScoreLevel>,
  t: Translations,
): ReadinessLevelInfo {
  return useMemo(() => {
    const totalScore = calculateTotalScore(scores);
    return getReadinessLevel(totalScore, t);
  }, [scores, t]);
}

export function getReadinessLevel(
  totalScore: number,
  t: Translations,
): ReadinessLevelInfo {
  if (totalScore <= 40) {
    return {
      level: 1,
      name: t.levels.experimental.name,
      range: "0-40",
      action: t.levels.experimental.action,
    };
  } else if (totalScore <= 65) {
    return {
      level: 2,
      name: t.levels.beta.name,
      range: "41-65",
      action: t.levels.beta.action,
    };
  } else if (totalScore <= 80) {
    return {
      level: 3,
      name: t.levels.productionReady.name,
      range: "66-80",
      action: t.levels.productionReady.action,
    };
  } else {
    return {
      level: 4,
      name: t.levels.autonomousGrade.name,
      range: "81-95",
      action: t.levels.autonomousGrade.action,
    };
  }
}
