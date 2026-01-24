import { Header } from "./components/layout/Header";
import { Container } from "./components/layout/Container";
import { RubricList } from "./components/rubric/RubricList";
import { ScoreSummary } from "./components/result/ScoreSummary";
import { ReadinessLevel } from "./components/result/ReadinessLevel";
import { FloatingSummary } from "./components/result/FloatingSummary";
import { ExportButtons } from "./components/result/ExportButtons";
import { MiniArchitectureIndicator } from "./components/diagram";
import { useEvaluation } from "./hooks/useEvaluation";
import { useReadinessLevel } from "./hooks/useReadinessLevel";
import { useActiveRubric } from "./hooks/useActiveRubric";
import { useLanguage } from "./i18n";
import { rubrics } from "./data/rubrics";

function App() {
  const { scores, setScore, resetScores } = useEvaluation();
  const { t } = useLanguage();
  const level = useReadinessLevel(scores, t);
  const { activeRubric, scrollToRubric } = useActiveRubric({ offset: 80 });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onReset={resetScores} />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RubricList
              rubrics={rubrics}
              scores={scores}
              onScoreChange={setScore}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <ScoreSummary rubrics={rubrics} scores={scores} />
              <ReadinessLevel level={level} />
              <ExportButtons rubrics={rubrics} scores={scores} level={level} />
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t.improvementTips.title}
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    <strong>{t.improvementTips.reliabilityLow}</strong>{" "}
                    {t.improvementTips.reliabilityTip}
                  </li>
                  <li>
                    <strong>{t.improvementTips.safetyLow}</strong>{" "}
                    {t.improvementTips.safetyTip}
                  </li>
                  <li>
                    <strong>{t.improvementTips.observabilityLow}</strong>{" "}
                    {t.improvementTips.observabilityTip}
                  </li>
                  <li>
                    <strong>{t.improvementTips.advancedSecurityLow}</strong>{" "}
                    {t.improvementTips.advancedSecurityTip}
                  </li>
                  <li>
                    <strong>{t.improvementTips.memoryLow}</strong>{" "}
                    {t.improvementTips.memoryTip}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <FloatingSummary rubrics={rubrics} scores={scores} level={level} />
      <MiniArchitectureIndicator
        activeRubric={activeRubric}
        onRubricClick={scrollToRubric}
      />
    </div>
  );
}

export default App;
