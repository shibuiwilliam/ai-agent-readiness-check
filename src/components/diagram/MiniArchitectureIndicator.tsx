import React, { useState } from "react";

type RubricId = "1" | "2" | "3" | "4" | "5" | "6" | null;

interface MiniArchitectureIndicatorProps {
  activeRubric: RubricId;
  onRubricClick?: (rubricId: RubricId) => void;
}

const rubricNames: Record<string, string> = {
  "1": "Reliability",
  "2": "Efficacy",
  "3": "Safety",
  "4": "Observability",
  "5": "Security",
  "6": "Memory",
};

/**
 * A compact floating indicator showing which part of the architecture is being evaluated.
 * Can be positioned fixed in a corner of the screen.
 */
export const MiniArchitectureIndicator: React.FC<
  MiniArchitectureIndicatorProps
> = ({ activeRubric, onRubricClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="mini-architecture-indicator fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Collapsed View */}
      {!isExpanded && (
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-3 cursor-pointer hover:shadow-xl transition-shadow">
          <svg width="40" height="40" viewBox="0 0 120 160">
            {/* Simplified architecture blocks */}
            <rect x="10" y="10" width="100" height="20" rx="3" fill="#e5e7eb" />
            <rect
              x="10"
              y="40"
              width="100"
              height="30"
              rx="3"
              fill={activeRubric === "2" ? "#3b82f6" : "#e5e7eb"}
            />
            <rect
              x="10"
              y="80"
              width="45"
              height="25"
              rx="3"
              fill={activeRubric === "3" ? "#3b82f6" : "#e5e7eb"}
            />
            <rect
              x="65"
              y="80"
              width="45"
              height="25"
              rx="3"
              fill={activeRubric === "5" ? "#3b82f6" : "#e5e7eb"}
            />
            <rect
              x="10"
              y="115"
              width="45"
              height="20"
              rx="3"
              fill={activeRubric === "6" ? "#3b82f6" : "#e5e7eb"}
            />
            <rect
              x="65"
              y="115"
              width="45"
              height="20"
              rx="3"
              fill={activeRubric === "4" ? "#3b82f6" : "#e5e7eb"}
            />
            <rect
              x="10"
              y="145"
              width="100"
              height="10"
              rx="2"
              fill={activeRubric === "1" ? "#3b82f6" : "#e5e7eb"}
            />
          </svg>
          {activeRubric && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {activeRubric}
            </div>
          )}
        </div>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[200px]">
          <div className="text-xs font-semibold text-gray-600 mb-2">
            Architecture View
          </div>
          <svg
            width="120"
            height="160"
            viewBox="0 0 120 160"
            className="mx-auto"
          >
            {/* UI Layer */}
            <rect
              x="10"
              y="5"
              width="100"
              height="18"
              rx="3"
              fill="#e5e7eb"
              stroke="#9ca3af"
            />
            <text x="60" y="17" textAnchor="middle" fontSize="8" fill="#374151">
              UI
            </text>

            {/* Orchestrator */}
            <rect
              x="10"
              y="28"
              width="100"
              height="28"
              rx="3"
              fill={activeRubric === "2" ? "#3b82f6" : "#e5e7eb"}
              stroke={activeRubric === "2" ? "#1d4ed8" : "#9ca3af"}
              style={{ cursor: "pointer" }}
              onClick={() => onRubricClick?.("2")}
            />
            <text
              x="60"
              y="45"
              textAnchor="middle"
              fontSize="8"
              fill={activeRubric === "2" ? "#fff" : "#374151"}
            >
              Orchestrator (R2)
            </text>

            {/* Guardrails & Security Row */}
            <rect
              x="10"
              y="62"
              width="48"
              height="28"
              rx="3"
              fill={activeRubric === "3" ? "#3b82f6" : "#e5e7eb"}
              stroke={activeRubric === "3" ? "#1d4ed8" : "#9ca3af"}
              style={{ cursor: "pointer" }}
              onClick={() => onRubricClick?.("3")}
            />
            <text
              x="34"
              y="79"
              textAnchor="middle"
              fontSize="7"
              fill={activeRubric === "3" ? "#fff" : "#374151"}
            >
              Safety (R3)
            </text>

            <rect
              x="62"
              y="62"
              width="48"
              height="28"
              rx="3"
              fill={activeRubric === "5" ? "#3b82f6" : "#e5e7eb"}
              stroke={activeRubric === "5" ? "#1d4ed8" : "#9ca3af"}
              style={{ cursor: "pointer" }}
              onClick={() => onRubricClick?.("5")}
            />
            <text
              x="86"
              y="79"
              textAnchor="middle"
              fontSize="7"
              fill={activeRubric === "5" ? "#fff" : "#374151"}
            >
              Security (R5)
            </text>

            {/* Memory & HITL Row */}
            <rect
              x="10"
              y="96"
              width="48"
              height="28"
              rx="3"
              fill={activeRubric === "6" ? "#3b82f6" : "#e5e7eb"}
              stroke={activeRubric === "6" ? "#1d4ed8" : "#9ca3af"}
              style={{ cursor: "pointer" }}
              onClick={() => onRubricClick?.("6")}
            />
            <text
              x="34"
              y="113"
              textAnchor="middle"
              fontSize="7"
              fill={activeRubric === "6" ? "#fff" : "#374151"}
            >
              Memory (R6)
            </text>

            <rect
              x="62"
              y="96"
              width="48"
              height="28"
              rx="3"
              fill={activeRubric === "4" ? "#3b82f6" : "#e5e7eb"}
              stroke={activeRubric === "4" ? "#1d4ed8" : "#9ca3af"}
              style={{ cursor: "pointer" }}
              onClick={() => onRubricClick?.("4")}
            />
            <text
              x="86"
              y="113"
              textAnchor="middle"
              fontSize="7"
              fill={activeRubric === "4" ? "#fff" : "#374151"}
            >
              Ops (R4)
            </text>

            {/* External APIs / Reliability */}
            <rect
              x="10"
              y="130"
              width="100"
              height="20"
              rx="3"
              fill={activeRubric === "1" ? "#3b82f6" : "#e5e7eb"}
              stroke={activeRubric === "1" ? "#1d4ed8" : "#9ca3af"}
              style={{ cursor: "pointer" }}
              onClick={() => onRubricClick?.("1")}
            />
            <text
              x="60"
              y="143"
              textAnchor="middle"
              fontSize="7"
              fill={activeRubric === "1" ? "#fff" : "#374151"}
            >
              Reliability (R1)
            </text>
          </svg>

          {/* Active Rubric Info */}
          {activeRubric && (
            <div className="mt-2 pt-2 border-t border-gray-200 text-center">
              <span className="text-xs font-medium text-blue-600">
                Evaluating: {rubricNames[activeRubric]}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniArchitectureIndicator;
