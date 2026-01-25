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
  if (totalScore <= 45) {
    return {
      level: 1,
      name: t.levels.experimental.name,
      range: "0-45",
      action: t.levels.experimental.action,
    };
  } else if (totalScore <= 70) {
    return {
      level: 2,
      name: t.levels.beta.name,
      range: "46-70",
      action: t.levels.beta.action,
    };
  } else if (totalScore <= 90) {
    return {
      level: 3,
      name: t.levels.productionReady.name,
      range: "71-90",
      action: t.levels.productionReady.action,
    };
  } else {
    return {
      level: 4,
      name: t.levels.autonomousGrade.name,
      range: "91-105",
      action: t.levels.autonomousGrade.action,
    };
  }
}
