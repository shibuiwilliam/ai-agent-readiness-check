import type { LevelInfo } from "../../data/rubrics";
import type { ScoreLevel } from "../../types";
import { useLanguage } from "../../i18n";
import { getScoreColor } from "../../utils/scoring";

interface LevelDescriptionProps {
  levels: LevelInfo[];
  selectedScore: ScoreLevel;
}

export function LevelDescription({
  levels,
  selectedScore,
}: LevelDescriptionProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-2 mt-4">
      {levels.map((level) => {
        const isSelected = selectedScore === level.score;
        const colorClass = getScoreColor(level.score);

        return (
          <div
            key={level.score}
            className={`
              p-3 rounded-lg border-2 transition-all duration-200
              ${
                isSelected
                  ? `border-l-4 ${colorClass.replace("bg-", "border-")} bg-gray-50`
                  : "border-transparent bg-gray-50 opacity-60"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${isSelected ? `${colorClass} text-white` : "bg-gray-200 text-gray-500"}
                `}
              >
                {level.score}
              </span>
              <span
                className={`font-semibold ${isSelected ? "text-gray-900" : "text-gray-500"}`}
              >
                {level.label[language]}
              </span>
            </div>
            <p
              className={`mt-1 text-sm ${isSelected ? "text-gray-700" : "text-gray-400"}`}
            >
              {level.description[language]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
