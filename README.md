# AI Agent Production Readiness Check

> **Language / 言語:** [English](./README.md) | [日本語](./README_JA.md)

**Is your AI agent ready for the real world?** This simple, interactive tool helps you find out.

Building an AI agent is exciting. But before you deploy it to production, you need to know: *Is it reliable? Is it safe? Can you trust it with real users?*

Answer 12 straightforward questions, and you'll get a clear readiness score along with practical recommendations.

## How It Works

### 1. Answer 12 Questions

Go through four categories, rating your agent from 1-5 on each item:

| Category | What You'll Evaluate |
|----------|---------------------|
| **Reliability & Robustness** | Does your agent give consistent results? How does it handle unexpected inputs? |
| **Efficacy & Logic** | Does it actually achieve its goals? Is it cost-effective? |
| **Safety & Governance** | Are there proper guardrails? Can it resist attacks? |
| **Observability & Ops** | Can you see what it's doing? Can humans step in when needed? |

### 2. Get Your Score

Your total score (out of 60) determines your readiness level:

| Score | Level | What It Means |
|-------|-------|---------------|
| 0-25 | **Experimental** | Still in PoC stage. Keep iterating before any deployment. |
| 26-40 | **Beta / Pilot** | Good for internal testing with close monitoring. |
| 41-52 | **Production Ready** | Ready for real users in standard business applications. |
| 53-60 | **Enterprise Grade** | Suitable for mission-critical use (finance, healthcare, etc.). |

### 3. Take Action

Based on your scores, you'll receive specific recommendations on what to improve. Export your results as a PDF to share with your team.

## Quick Start

```bash
# Get the code
git clone https://github.com/shibuiwilliam/ai-agent-readiness-check
cd ai-agent-readiness-check

# Install and run
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Why This Tool?

This checklist is built on real research from 2025's leading AI agent evaluation frameworks:

- **ReliabilityBench** - Testing agents under production stress
- **CLEAR Framework** - Enterprise-grade AI evaluation
- **Agent GPA** - Goal-Plan-Action alignment
- **OpenAgentSafety** - Real-world safety evaluation
- **SafePro** - Professional-level safety standards
- **AgentSight** - Agent observability best practices

We've distilled these academic frameworks into practical questions you can answer today.

## For Developers

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |
| `npm run typecheck` | Verify TypeScript types |

### Tech Stack

React 18 + TypeScript + Vite + Tailwind CSS

### Documentation

- [Full Checklist (English)](./AIAgentReadinessCheck_EN.md)
- [Full Checklist (日本語)](./AIAgentReadinessCheck_JA.md)
- [Architecture Diagram (English)](./architecture-diagram_EN.md)
- [Architecture Diagram (日本語)](./architecture-diagram_JA.md)

## License

MIT - Use it however you like.

---

**A note on scores:** This tool helps you identify gaps and have better conversations with your team. A low score isn't failure—it's a roadmap for improvement. A high score isn't a guarantee—it's a starting point for confidence.
