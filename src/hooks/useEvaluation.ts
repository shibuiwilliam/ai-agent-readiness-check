import { useState, useCallback, useEffect } from "react";
import type { ScoreLevel, EvaluationState } from "../types";

const STORAGE_KEY = "ai-agent-readiness-evaluation";

export function useEvaluation() {
  const [state, setState] = useState<EvaluationState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { scores: {} };
      }
    }
    return { scores: {} };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setScore = useCallback((itemId: string, score: ScoreLevel) => {
    setState((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [itemId]: score,
      },
    }));
  }, []);

  const resetScores = useCallback(() => {
    setState({ scores: {} });
  }, []);

  const getScore = useCallback(
    (itemId: string): ScoreLevel => {
      return state.scores[itemId] ?? null;
    },
    [state.scores],
  );

  return {
    scores: state.scores,
    setScore,
    getScore,
    resetScores,
  };
}
