import type { ScoreLevel } from "../../types";
import { getScoreColor } from "../../utils/scoring";

interface ScoreSelectorProps {
  value: ScoreLevel;
  onChange: (score: ScoreLevel) => void;
}

const scores: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

export function ScoreSelector({ value, onChange }: ScoreSelectorProps) {
  return (
    <div className="flex gap-2">
      {scores.map((score) => {
        const isSelected = value === score;
        const baseColor = getScoreColor(score);

        return (
          <button
            key={score}
            onClick={() => onChange(score)}
            className={`
              w-10 h-10 rounded-lg font-bold text-lg transition-all duration-200
              ${
                isSelected
                  ? `${baseColor} text-white shadow-lg scale-110`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {score}
          </button>
        );
      })}
    </div>
  );
}
