import React from "react";
import { DiagramSidebar } from "../diagram/DiagramSidebar";
import { useActiveRubric } from "../../hooks/useActiveRubric";

interface ChecklistWithDiagramProps {
  children: React.ReactNode;
}

/**
 * Layout component that wraps the checklist with an interactive architecture diagram sidebar.
 *
 * Usage:
 * ```tsx
 * <ChecklistWithDiagram>
 *   <div id="rubric-1">...</div>
 *   <div id="rubric-2">...</div>
 *   ...
 * </ChecklistWithDiagram>
 * ```
 *
 * Each rubric section should have an id like "rubric-1", "rubric-2", etc.
 * Each item section should have an id like "item-1-1", "item-1-2", etc.
 */
export const ChecklistWithDiagram: React.FC<ChecklistWithDiagramProps> = ({
  children,
}) => {
  const { activeRubric, activeItem, scrollToRubric } = useActiveRubric({
    offset: 80, // Account for fixed header if any
  });

  return (
    <div className="checklist-with-diagram flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">{children}</main>

      {/* Diagram Sidebar - Hidden on mobile, visible on lg+ screens */}
      <div className="hidden lg:block">
        <DiagramSidebar
          activeRubric={activeRubric}
          activeItem={activeItem}
          onRubricClick={scrollToRubric}
          isSticky={true}
        />
      </div>
    </div>
  );
};

export default ChecklistWithDiagram;
