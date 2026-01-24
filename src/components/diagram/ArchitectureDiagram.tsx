import React from "react";

type RubricId = "1" | "2" | "3" | "4" | "5" | "6" | null;

interface ArchitectureDiagramProps {
  activeRubric: RubricId;
  activeItem?: string | null;
  compact?: boolean;
  onSectionClick?: (rubricId: RubricId) => void;
}

interface SectionStyle {
  fill: string;
  stroke: string;
  opacity: number;
}

const getActiveStyle = (
  isActive: boolean,
  isRelated: boolean,
): SectionStyle => {
  if (isActive) {
    return { fill: "#3b82f6", stroke: "#1d4ed8", opacity: 1 };
  }
  if (isRelated) {
    return { fill: "#93c5fd", stroke: "#3b82f6", opacity: 0.8 };
  }
  return { fill: "#e5e7eb", stroke: "#9ca3af", opacity: 0.6 };
};

const rubricLabels: Record<string, string> = {
  "1": "Reliability",
  "2": "Efficacy",
  "3": "Safety",
  "4": "Observability",
  "5": "Security",
  "6": "Memory",
};

const itemToSection: Record<string, string[]> = {
  // Rubric 1
  "1-1": ["orchestrator", "llm"],
  "1-2": ["gateway", "input"],
  "1-3": ["external-apis", "tools"],
  // Rubric 2
  "2-1": ["orchestrator", "planning"],
  "2-2": ["llm", "router"],
  "2-3": ["ui", "streaming"],
  // Rubric 3
  "3-1": ["guardrails", "input", "output"],
  "3-2": ["guardrails", "gateway"],
  "3-3": ["tools", "permissions"],
  // Rubric 4
  "4-1": ["observability", "traces"],
  "4-2": ["hitl", "controls"],
  "4-3": ["observability", "cicd"],
  // Rubric 5
  "5-1": ["mcp"],
  "5-2": ["sandbox"],
  "5-3": ["database"],
  // Rubric 6
  "6-1": ["memory", "vectordb"],
  "6-2": ["memory", "context"],
  "6-3": ["orchestrator", "recovery"],
  "6-4": ["memory", "forgetting"],
};

const rubricToSections: Record<string, string[]> = {
  "1": ["orchestrator", "llm", "gateway", "input", "external-apis", "tools"],
  "2": ["orchestrator", "planning", "llm", "router", "ui", "streaming"],
  "3": ["guardrails", "input", "output", "gateway", "tools", "permissions"],
  "4": ["observability", "traces", "hitl", "controls", "cicd"],
  "5": ["mcp", "sandbox", "database"],
  "6": ["memory", "vectordb", "context", "recovery", "forgetting"],
};

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  activeRubric,
  activeItem,
  compact = false,
  onSectionClick,
}) => {
  const getStyle = (sectionId: string): SectionStyle => {
    if (activeItem && itemToSection[activeItem]) {
      const isActive = itemToSection[activeItem].includes(sectionId);
      return getActiveStyle(isActive, false);
    }
    if (activeRubric && rubricToSections[activeRubric]) {
      const isActive = rubricToSections[activeRubric].includes(sectionId);
      return getActiveStyle(isActive, false);
    }
    return getActiveStyle(false, false);
  };

  const width = compact ? 280 : 400;
  const height = compact ? 320 : 450;

  return (
    <div className="architecture-diagram">
      <svg
        viewBox={`0 0 ${400} ${450}`}
        width={width}
        height={height}
        className="mx-auto"
      >
        {/* Background */}
        <rect
          x="10"
          y="10"
          width="380"
          height="430"
          rx="8"
          fill="#f9fafb"
          stroke="#d1d5db"
        />

        {/* Title */}
        <text
          x="200"
          y="35"
          textAnchor="middle"
          className="text-sm font-semibold"
          fill="#374151"
        >
          AI Agent Architecture
        </text>

        {/* User Interface Layer */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("2")}
        >
          <rect
            x="30"
            y="50"
            width="340"
            height="40"
            rx="4"
            {...getStyle("ui")}
          />
          <text x="200" y="75" textAnchor="middle" fontSize="12" fill="#374151">
            User Interface
          </text>
          {activeRubric === "2" && (
            <text x="360" y="65" fontSize="10" fill="#1d4ed8">
              2-3
            </text>
          )}
        </g>

        {/* API Gateway */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("1")}
        >
          <rect
            x="30"
            y="100"
            width="340"
            height="35"
            rx="4"
            {...getStyle("gateway")}
          />
          <text
            x="200"
            y="122"
            textAnchor="middle"
            fontSize="11"
            fill="#374151"
          >
            API Gateway / Input Processing
          </text>
          {activeRubric === "1" && (
            <text x="360" y="112" fontSize="10" fill="#1d4ed8">
              1-2
            </text>
          )}
        </g>

        {/* Guardrails Layer */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("3")}
        >
          <rect
            x="30"
            y="145"
            width="165"
            height="45"
            rx="4"
            {...getStyle("guardrails")}
          />
          <text
            x="112"
            y="165"
            textAnchor="middle"
            fontSize="10"
            fill="#374151"
          >
            Input Guardrails
          </text>
          <text x="112" y="180" textAnchor="middle" fontSize="9" fill="#6b7280">
            Jailbreak / PII Filter
          </text>

          <rect
            x="205"
            y="145"
            width="165"
            height="45"
            rx="4"
            {...getStyle("output")}
          />
          <text
            x="287"
            y="165"
            textAnchor="middle"
            fontSize="10"
            fill="#374151"
          >
            Output Guardrails
          </text>
          <text x="287" y="180" textAnchor="middle" fontSize="9" fill="#6b7280">
            Safety / Fact Check
          </text>
          {activeRubric === "3" && (
            <text x="360" y="155" fontSize="10" fill="#1d4ed8">
              3-1,3-2
            </text>
          )}
        </g>

        {/* Agent Orchestrator */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("2")}
        >
          <rect
            x="30"
            y="200"
            width="340"
            height="70"
            rx="4"
            {...getStyle("orchestrator")}
          />
          <text
            x="200"
            y="220"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#374151"
          >
            Agent Orchestrator
          </text>

          {/* Planning sub-component */}
          <rect
            x="40"
            y="230"
            width="100"
            height="30"
            rx="3"
            {...getStyle("planning")}
          />
          <text x="90" y="250" textAnchor="middle" fontSize="9" fill="#374151">
            Planning
          </text>

          {/* Execution sub-component */}
          <rect
            x="150"
            y="230"
            width="100"
            height="30"
            rx="3"
            {...getStyle("llm")}
          />
          <text x="200" y="250" textAnchor="middle" fontSize="9" fill="#374151">
            LLM Execution
          </text>

          {/* Router sub-component */}
          <rect
            x="260"
            y="230"
            width="100"
            height="30"
            rx="3"
            {...getStyle("router")}
          />
          <text x="310" y="250" textAnchor="middle" fontSize="9" fill="#374151">
            Cost Router
          </text>

          {(activeRubric === "1" || activeRubric === "2") && (
            <text x="360" y="210" fontSize="10" fill="#1d4ed8">
              {activeRubric === "1" ? "1-1" : "2-1,2-2"}
            </text>
          )}
        </g>

        {/* Bottom Row - External Integrations */}
        <g>
          {/* Memory System */}
          <g
            style={{ cursor: onSectionClick ? "pointer" : "default" }}
            onClick={() => onSectionClick?.("6")}
          >
            <rect
              x="30"
              y="280"
              width="80"
              height="60"
              rx="4"
              {...getStyle("memory")}
            />
            <text
              x="70"
              y="300"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              Memory
            </text>
            <text
              x="70"
              y="315"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              Vector DB
            </text>
            <text
              x="70"
              y="328"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              Context
            </text>
            {activeRubric === "6" && (
              <text x="100" y="285" fontSize="9" fill="#1d4ed8">
                R6
              </text>
            )}
          </g>

          {/* MCP Servers */}
          <g
            style={{ cursor: onSectionClick ? "pointer" : "default" }}
            onClick={() => onSectionClick?.("5")}
          >
            <rect
              x="120"
              y="280"
              width="80"
              height="60"
              rx="4"
              {...getStyle("mcp")}
            />
            <text
              x="160"
              y="300"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              MCP
            </text>
            <text
              x="160"
              y="315"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              OAuth 2.1
            </text>
            <text
              x="160"
              y="328"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              PKCE
            </text>
            {activeRubric === "5" && (
              <text x="190" y="285" fontSize="9" fill="#1d4ed8">
                5-1
              </text>
            )}
          </g>

          {/* Sandbox */}
          <g
            style={{ cursor: onSectionClick ? "pointer" : "default" }}
            onClick={() => onSectionClick?.("5")}
          >
            <rect
              x="210"
              y="280"
              width="80"
              height="60"
              rx="4"
              {...getStyle("sandbox")}
            />
            <text
              x="250"
              y="300"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              Sandbox
            </text>
            <text
              x="250"
              y="315"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              MicroVM
            </text>
            <text
              x="250"
              y="328"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              Isolated
            </text>
            {activeRubric === "5" && (
              <text x="280" y="285" fontSize="9" fill="#1d4ed8">
                5-2
              </text>
            )}
          </g>

          {/* Database */}
          <g
            style={{ cursor: onSectionClick ? "pointer" : "default" }}
            onClick={() => onSectionClick?.("5")}
          >
            <rect
              x="300"
              y="280"
              width="70"
              height="60"
              rx="4"
              {...getStyle("database")}
            />
            <text
              x="335"
              y="300"
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              Database
            </text>
            <text
              x="335"
              y="315"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              Read-Only
            </text>
            <text
              x="335"
              y="328"
              textAnchor="middle"
              fontSize="8"
              fill="#6b7280"
            >
              Guardrails
            </text>
            {activeRubric === "5" && (
              <text x="360" y="285" fontSize="9" fill="#1d4ed8">
                5-3
              </text>
            )}
          </g>
        </g>

        {/* External APIs */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("1")}
        >
          <rect
            x="30"
            y="350"
            width="165"
            height="35"
            rx="4"
            {...getStyle("external-apis")}
          />
          <text
            x="112"
            y="372"
            textAnchor="middle"
            fontSize="10"
            fill="#374151"
          >
            External APIs (Retry/Backoff)
          </text>
          {activeRubric === "1" && (
            <text x="185" y="355" fontSize="9" fill="#1d4ed8">
              1-3
            </text>
          )}
        </g>

        {/* Human in the Loop */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("4")}
        >
          <rect
            x="205"
            y="350"
            width="165"
            height="35"
            rx="4"
            {...getStyle("hitl")}
          />
          <text
            x="287"
            y="372"
            textAnchor="middle"
            fontSize="10"
            fill="#374151"
          >
            Human-in-the-Loop
          </text>
          {activeRubric === "4" && (
            <text x="360" y="355" fontSize="9" fill="#1d4ed8">
              4-2
            </text>
          )}
        </g>

        {/* Observability Stack */}
        <g
          style={{ cursor: onSectionClick ? "pointer" : "default" }}
          onClick={() => onSectionClick?.("4")}
        >
          <rect
            x="30"
            y="395"
            width="340"
            height="35"
            rx="4"
            {...getStyle("observability")}
          />
          <text
            x="200"
            y="417"
            textAnchor="middle"
            fontSize="11"
            fill="#374151"
          >
            Observability (MELT) + Continuous Evaluation
          </text>
          {activeRubric === "4" && (
            <text x="360" y="400" fontSize="9" fill="#1d4ed8">
              4-1,4-3
            </text>
          )}
        </g>

        {/* Legend */}
        {!compact && (
          <g transform="translate(30, 440)">
            <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
            <text x="18" y="10" fontSize="9" fill="#374151">
              Active
            </text>
            <rect x="70" y="0" width="12" height="12" fill="#e5e7eb" rx="2" />
            <text x="88" y="10" fontSize="9" fill="#374151">
              Inactive
            </text>
          </g>
        )}
      </svg>

      {/* Active Rubric Label */}
      {activeRubric && (
        <div className="text-center mt-2 text-sm font-medium text-blue-600">
          Currently viewing: Rubric {activeRubric} -{" "}
          {rubricLabels[activeRubric]}
        </div>
      )}
    </div>
  );
};

export default ArchitectureDiagram;
