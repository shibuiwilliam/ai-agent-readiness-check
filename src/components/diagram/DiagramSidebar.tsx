import React from "react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

type RubricId = "1" | "2" | "3" | "4" | "5" | "6" | null;

interface DiagramSidebarProps {
  activeRubric: RubricId;
  activeItem?: string | null;
  onRubricClick?: (rubricId: RubricId) => void;
  isSticky?: boolean;
}

const rubricInfo: Record<string, { name: string; items: string[] }> = {
  "1": {
    name: "Reliability & Robustness",
    items: [
      "1-1 Execution Consistency",
      "1-2 Input Robustness",
      "1-3 Fault Tolerance",
    ],
  },
  "2": {
    name: "Efficacy & Logic",
    items: ["2-1 Goal-Plan-Action", "2-2 Cost Efficiency", "2-3 Latency/UX"],
  },
  "3": {
    name: "Safety & Governance",
    items: [
      "3-1 Risk Boundary",
      "3-2 Adversarial Resistance",
      "3-3 Permission Scoping",
    ],
  },
  "4": {
    name: "Observability & Ops",
    items: ["4-1 Traceability", "4-2 Human Control", "4-3 Continuous Eval"],
  },
  "5": {
    name: "Advanced Security",
    items: [
      "5-1 MCP Hardening",
      "5-2 Secure Sandbox",
      "5-3 Database Guardrails",
    ],
  },
  "6": {
    name: "Memory & Context",
    items: [
      "6-1 Memory Quality",
      "6-2 Haystack Robustness",
      "6-3 Self-Correction",
      "6-4 Selective Forgetting",
    ],
  },
};

export const DiagramSidebar: React.FC<DiagramSidebarProps> = ({
  activeRubric,
  activeItem,
  onRubricClick,
  isSticky = true,
}) => {
  return (
    <aside
      className={`diagram-sidebar bg-white border-l border-gray-200 p-4 ${
        isSticky ? "sticky top-4" : ""
      }`}
      style={{
        width: "320px",
        maxHeight: "calc(100vh - 2rem)",
        overflowY: "auto",
      }}
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Architecture View
      </h3>

      <ArchitectureDiagram
        activeRubric={activeRubric}
        activeItem={activeItem}
        compact={true}
        onSectionClick={onRubricClick}
      />

      {/* Rubric Details */}
      {activeRubric && rubricInfo[activeRubric] && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800">
            Rubric {activeRubric}: {rubricInfo[activeRubric].name}
          </h4>
          <ul className="mt-2 space-y-1">
            {rubricInfo[activeRubric].items.map((item) => {
              const itemId = item.split(" ")[0];
              const isActive = activeItem === itemId;
              return (
                <li
                  key={item}
                  className={`text-xs ${
                    isActive
                      ? "text-blue-700 font-medium bg-blue-100 rounded px-2 py-1"
                      : "text-blue-600 px-2 py-1"
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Mini Legend */}
      <div className="mt-4 text-xs text-gray-500">
        <p className="font-medium text-gray-600 mb-1">Legend:</p>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded"></span>
          <span>Currently evaluating</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-gray-200 rounded"></span>
          <span>Other components</span>
        </div>
      </div>

      {/* Component Descriptions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Click on diagram sections to navigate to the corresponding rubric.
        </p>
      </div>
    </aside>
  );
};

export default DiagramSidebar;
