import type { Rubric } from "../../data/rubrics";
import type { ScoreLevel } from "../../types";
import { useLanguage } from "../../i18n";
import {
  calculateRubricScore,
  calculateTotalScore,
  getRubricMaxScore,
  getTotalMaxScore,
} from "../../utils/scoring";

interface ScoreSummaryProps {
  rubrics: Rubric[];
  scores: Record<string, ScoreLevel>;
}

export function ScoreSummary({ rubrics, scores }: ScoreSummaryProps) {
  const { language, t } = useLanguage();
  const totalScore = calculateTotalScore(scores);
  const totalMaxScore = getTotalMaxScore(rubrics);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {t.scoreSummary.title}
      </h3>
      <div className="space-y-3">
        {rubrics.map((rubric) => {
          const rubricScore = calculateRubricScore(rubric, scores);
          const rubricMaxScore = getRubricMaxScore(rubric);
          return (
            <div key={rubric.id} className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                {rubric.name[language]}
              </span>
              <span className="font-semibold">
                {rubricScore}
                <span className="text-gray-400">/{rubricMaxScore}</span>
              </span>
            </div>
          );
        })}
        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-bold text-gray-900">
            {t.scoreSummary.totalScore}
          </span>
          <span className="text-2xl font-bold">
            {totalScore}
            <span className="text-lg text-gray-400">/{totalMaxScore}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
