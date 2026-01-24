import type { Rubric } from "../../data/rubrics";
import type { ScoreLevel, ReadinessLevelInfo } from "../../types";
import { useLanguage } from "../../i18n";
import { exportToMarkdown } from "../../utils/export";

interface ExportButtonsProps {
  rubrics: Rubric[];
  scores: Record<string, ScoreLevel>;
  level: ReadinessLevelInfo;
}

export function ExportButtons({ rubrics, scores, level }: ExportButtonsProps) {
  const { language, t } = useLanguage();

  const handleExportMarkdown = () => {
    exportToMarkdown({ rubrics, scores, level, language });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{t.export.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{t.export.description}</p>
      <button
        onClick={handleExportMarkdown}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {t.export.downloadMarkdown}
      </button>
    </div>
  );
}
