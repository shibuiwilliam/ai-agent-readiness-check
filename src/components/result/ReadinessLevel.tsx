import type { ReadinessLevelInfo } from "../../types";
import { useLanguage } from "../../i18n";
import { getLevelColor } from "../../utils/scoring";

interface ReadinessLevelProps {
  level: ReadinessLevelInfo;
}

export function ReadinessLevel({ level }: ReadinessLevelProps) {
  const { t } = useLanguage();
  const colorClass = getLevelColor(level.level);

  return (
    <div className={`rounded-xl border-2 p-6 ${colorClass}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl font-bold">L{level.level}</span>
        <div>
          <div className="text-xl font-bold">{level.name}</div>
          <div className="text-sm opacity-75">
            {t.readinessLevel.scoreRange}: {level.range}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed">{level.action}</p>
    </div>
  );
}
