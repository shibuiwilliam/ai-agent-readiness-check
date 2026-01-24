import type { Rubric } from "../../data/rubrics";
import type { ScoreLevel, ReadinessLevelInfo } from "../../types";
import { useLanguage } from "../../i18n";
import {
  calculateTotalScore,
  getTotalCompletedItemsCount,
  getTotalItemsCount,
  getTotalMaxScore,
  getLevelColor,
} from "../../utils/scoring";

interface FloatingSummaryProps {
  rubrics: Rubric[];
  scores: Record<string, ScoreLevel>;
  level: ReadinessLevelInfo;
}

export function FloatingSummary({
  rubrics,
  scores,
  level,
}: FloatingSummaryProps) {
  const { t } = useLanguage();
  const totalScore = calculateTotalScore(scores);
  const completedItems = getTotalCompletedItemsCount(rubrics, scores);
  const totalItems = getTotalItemsCount(rubrics);
  const totalMaxScore = getTotalMaxScore(rubrics);
  const progress = (completedItems / totalItems) * 100;
  const levelColorClass = getLevelColor(level.level);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-500">
                {t.floatingSummary.progress}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {completedItems}/{totalItems}
                </span>
              </div>
            </div>
            <div className="border-l pl-6">
              <div className="text-sm text-gray-500">
                {t.floatingSummary.totalScore}
              </div>
              <div className="text-2xl font-bold">
                {totalScore}
                <span className="text-base text-gray-400">
                  /{totalMaxScore}
                </span>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg ${levelColorClass}`}>
            <span className="font-bold">
              L{level.level}: {level.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
