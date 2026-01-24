import type { Rubric } from "../../data/rubrics";
import type { ScoreLevel } from "../../types";
import { RubricCard } from "./RubricCard";

interface RubricListProps {
  rubrics: Rubric[];
  scores: Record<string, ScoreLevel>;
  onScoreChange: (itemId: string, score: ScoreLevel) => void;
}

export function RubricList({
  rubrics,
  scores,
  onScoreChange,
}: RubricListProps) {
  return (
    <div>
      {rubrics.map((rubric) => (
        <RubricCard
          key={rubric.id}
          rubric={rubric}
          scores={scores}
          onScoreChange={onScoreChange}
        />
      ))}
    </div>
  );
}
