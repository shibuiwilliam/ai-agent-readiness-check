import type { Rubric } from "../../data/rubrics";
import type { ScoreLevel } from "../../types";
import { useLanguage } from "../../i18n";
import { CheckItemCard } from "../check-item/CheckItemCard";
import { ProgressBar } from "../common/ProgressBar";
import {
  calculateRubricScore,
  getRubricMaxScore,
  getCompletedItemsCount,
} from "../../utils/scoring";
import { parseArxivReference } from "../../utils/links";

const PROGRESS_COLOR_THRESHOLDS = {
  high: 0.85,
  medium: 0.65,
  low: 0.45,
} as const;

interface RubricCardProps {
  rubric: Rubric;
  scores: Record<string, ScoreLevel>;
  onScoreChange: (itemId: string, score: ScoreLevel) => void;
}

export function RubricCard({ rubric, scores, onScoreChange }: RubricCardProps) {
  const { language, t } = useLanguage();
  const rubricScore = calculateRubricScore(rubric, scores);
  const maxScore = getRubricMaxScore(rubric);
  const completedCount = getCompletedItemsCount(rubric, scores);
  const totalItems = rubric.items.length;

  const getProgressColor = () => {
    const percentage = rubricScore / maxScore;
    if (percentage >= PROGRESS_COLOR_THRESHOLDS.high) return "bg-green-500";
    if (percentage >= PROGRESS_COLOR_THRESHOLDS.medium) return "bg-blue-500";
    if (percentage >= PROGRESS_COLOR_THRESHOLDS.low) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Extract rubric number from first item ID (e.g., "1-1" -> "1")
  const rubricId = rubric.items[0]?.id.split("-")[0] || "";

  return (
    <section id={`rubric-${rubricId}`} className="mb-8">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-t-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{rubric.name[language]}</h2>
            <p className="text-slate-300 text-sm mt-1">
              {rubric.description[language]}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {rubric.references.map((ref) => {
                const { text, url } = parseArxivReference(ref);
                return url ? (
                  <a
                    key={ref}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-slate-600 px-2 py-1 rounded hover:bg-slate-500 transition-colors cursor-pointer"
                  >
                    {text} ↗
                  </a>
                ) : (
                  <span
                    key={ref}
                    className="text-xs bg-slate-600 px-2 py-1 rounded"
                  >
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {rubricScore}
              <span className="text-lg text-slate-400">/{maxScore}</span>
            </div>
            <div className="text-sm text-slate-400">
              {completedCount}/{totalItems} {t.rubrics.items}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar
            value={rubricScore}
            max={maxScore}
            colorClass={getProgressColor()}
          />
        </div>
      </div>
      <div className="bg-gray-50 rounded-b-xl p-4 space-y-4">
        {rubric.items.map((item) => (
          <CheckItemCard
            key={item.id}
            item={item}
            score={scores[item.id] ?? null}
            onScoreChange={(score) => onScoreChange(item.id, score)}
          />
        ))}
      </div>
    </section>
  );
}
