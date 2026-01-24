import { useState } from "react";
import type { CheckItem } from "../../data/rubrics";
import type { ScoreLevel } from "../../types";
import { useLanguage } from "../../i18n";
import { ScoreSelector } from "./ScoreSelector";
import { LevelDescription } from "./LevelDescription";
import { getToolUrl } from "../../utils/links";

interface CheckItemCardProps {
  item: CheckItem;
  score: ScoreLevel;
  onScoreChange: (score: ScoreLevel) => void;
}

export function CheckItemCard({
  item,
  score,
  onScoreChange,
}: CheckItemCardProps) {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      id={`item-${item.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {item.id}. {item.name[language]}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {language === "ja" ? item.name.en : item.name.ja}
          </p>
          <p className="text-gray-600 mt-2">{item.description[language]}</p>
        </div>
        <div className="flex-shrink-0">
          <ScoreSelector value={score} onChange={onScoreChange} />
        </div>
      </div>

      {/* Toggle for detailed information */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        <span>{showDetails ? "▼" : "▶"}</span>
        <span>
          {language === "ja"
            ? showDetails
              ? "詳細を非表示"
              : "評価目的・重要性・チェック方法を表示"
            : showDetails
              ? "Hide details"
              : "Show purpose, importance & how to check"}
        </span>
      </button>

      {/* Collapsible details section */}
      {showDetails && (
        <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg text-sm">
          {/* Evaluation Purpose */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              {language === "ja" ? "📋 評価の目的" : "📋 Evaluation Purpose"}
            </h4>
            <p className="text-gray-600">{item.purpose[language]}</p>
          </div>

          {/* Production Importance */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              {language === "ja"
                ? "⚠️ 実運用の重要性"
                : "⚠️ Production Importance"}
            </h4>
            <p className="text-gray-600">{item.importance[language]}</p>
          </div>

          {/* How to Check */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              {language === "ja" ? "🔍 チェック方法" : "🔍 How to Check"}
            </h4>
            <ol className="list-decimal list-inside text-gray-600 space-y-1">
              {item.howToCheck[language].map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Recommended Tools */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              {language === "ja" ? "🛠️ 推奨ツール" : "🛠️ Recommended Tools"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool, index) => {
                const url = getToolUrl(tool);
                return url ? (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    {tool} ↗
                  </a>
                ) : (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                  >
                    {tool}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <LevelDescription levels={item.levels} selectedScore={score} />
    </div>
  );
}
