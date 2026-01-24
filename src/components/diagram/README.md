# Architecture Diagram Components

Interactive SVG diagrams that help users visualize which part of an AI agent system they are evaluating.

## Components

### 1. `ArchitectureDiagram`

Full-size interactive SVG diagram of the AI agent architecture.

```tsx
import { ArchitectureDiagram } from './components/diagram';

<ArchitectureDiagram
  activeRubric="3"      // '1' | '2' | '3' | '4' | '5' | '6' | null
  activeItem="3-1"      // Optional: specific item like '3-1', '3-2'
  compact={false}       // true for smaller sidebar version
  onSectionClick={(rubricId) => scrollToRubric(rubricId)}
/>
```

### 2. `DiagramSidebar`

Sidebar component with diagram + rubric details. Best for desktop layouts.

```tsx
import { DiagramSidebar } from './components/diagram';

<DiagramSidebar
  activeRubric={activeRubric}
  activeItem={activeItem}
  onRubricClick={scrollToRubric}
  isSticky={true}       // Sticks to viewport while scrolling
/>
```

### 3. `MiniArchitectureIndicator`

Floating indicator for mobile/compact layouts. Expands on hover.

```tsx
import { MiniArchitectureIndicator } from './components/diagram';

<MiniArchitectureIndicator
  activeRubric={activeRubric}
  onRubricClick={scrollToRubric}
/>
```

### 4. `useActiveRubric` Hook

Automatically tracks which rubric/item is currently in the viewport.

```tsx
import { useActiveRubric } from './components/diagram';

const { activeRubric, activeItem, scrollToRubric, scrollToItem } = useActiveRubric({
  offset: 80,           // Offset from top of viewport
  selectorPrefix: 'rubric-',  // ID prefix for rubric elements
  debounceMs: 50,       // Scroll debounce
});
```

## Integration Example

### Full Layout with Sidebar

```tsx
import { ChecklistWithDiagram } from './components/layout/ChecklistWithDiagram';

function App() {
  return (
    <ChecklistWithDiagram>
      {/* Each rubric section needs an ID */}
      <section id="rubric-1">
        <h2>Rubric 1: Reliability & Robustness</h2>
        <div id="item-1-1">...</div>
        <div id="item-1-2">...</div>
        <div id="item-1-3">...</div>
      </section>

      <section id="rubric-2">
        <h2>Rubric 2: Efficacy & Logic</h2>
        <div id="item-2-1">...</div>
        <div id="item-2-2">...</div>
        <div id="item-2-3">...</div>
      </section>

      {/* ... more rubrics */}
    </ChecklistWithDiagram>
  );
}
```

### Mobile-Friendly with Floating Indicator

```tsx
import { MiniArchitectureIndicator, useActiveRubric } from './components/diagram';

function App() {
  const { activeRubric, scrollToRubric } = useActiveRubric();

  return (
    <>
      <main>
        {/* Your checklist content */}
      </main>

      {/* Floating indicator in bottom-right corner */}
      <MiniArchitectureIndicator
        activeRubric={activeRubric}
        onRubricClick={scrollToRubric}
      />
    </>
  );
}
```

## Architecture Sections Mapped to Rubrics

| Section in Diagram | Rubric |
|-------------------|--------|
| UI / Streaming | R2 (Latency/UX) |
| API Gateway / Input Processing | R1 (Input Robustness) |
| Guardrails (Input/Output) | R3 (Safety) |
| Orchestrator / Planning | R2 (Goal-Plan-Action) |
| LLM Execution | R1 (Consistency) |
| Cost Router | R2 (Cost Efficiency) |
| Memory / Vector DB | R6 (Memory Quality) |
| MCP Servers | R5 (MCP Hardening) |
| Sandbox | R5 (Secure Sandbox) |
| Database | R5 (DB Guardrails) |
| External APIs | R1 (Fault Tolerance) |
| Human-in-the-Loop | R4 (Human Control) |
| Observability Stack | R4 (Traceability, Continuous Eval) |

## Styling

The components use Tailwind CSS classes. Key customization points:

- Active section: `bg-blue-500` / `#3b82f6`
- Inactive section: `bg-gray-200` / `#e5e7eb`
- Active border: `border-blue-700` / `#1d4ed8`

To customize colors, modify the `getActiveStyle` function in `ArchitectureDiagram.tsx`.
