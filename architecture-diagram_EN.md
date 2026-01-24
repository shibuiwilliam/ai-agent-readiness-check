# AI Agent Production Architecture & Readiness Criteria Map

This document provides a comprehensive view of where each evaluation criterion from the AI Agent Production Readiness Check applies in a real-world production architecture.

---

## System Architecture Overview

```
                                      PRODUCTION AI AGENT SYSTEM
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                                         │
 │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐   │
 │  │                                    USER INTERFACE LAYER                                          │   │
 │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                         │   │
 │  │  │   Web App    │  │  Mobile App  │  │   CLI/API    │  │   Slack/     │     [2-3] Latency/UX   │   │
 │  │  │              │  │              │  │   Client     │  │   Teams Bot  │     ← Streaming UI     │   │
 │  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                         │   │
 │  └─────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────────────────────┘   │
 │            │                 │                 │                 │                                      │
 │            └─────────────────┴────────┬────────┴─────────────────┘                                      │
 │                                       ▼                                                                 │
 │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐   │
 │  │                              API GATEWAY / LOAD BALANCER                                         │   │
 │  │                                                                                                  │   │
 │  │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐                             │   │
 │  │   │  Rate Limiting  │    │  Auth (OAuth/   │    │  Input Saniti-  │    [1-2] Input Robustness  │   │
 │  │   │  & Throttling   │    │  JWT/API Key)   │    │  zation Layer   │    ← Noise tolerance       │   │
 │  │   └─────────────────┘    └─────────────────┘    └────────┬────────┘                             │   │
 │  │                                                          │                                       │   │
 │  │   [3-2] Adversarial Resistance ← Input filters, encoding detection                              │   │
 │  └──────────────────────────────────────────────────────────┼──────────────────────────────────────┘   │
 │                                                             ▼                                           │
 │  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐  │
 │  │                                    GUARDRAIL LAYER                                                │  │
 │  │  ┌────────────────────────┐              ┌────────────────────────┐                               │  │
 │  │  │    INPUT GUARDRAIL     │              │   OUTPUT GUARDRAIL     │                               │  │
 │  │  │  ┌──────────────────┐  │              │  ┌──────────────────┐  │                               │  │
 │  │  │  │ Jailbreak Detect │  │              │  │ PII Filter/Mask  │  │   [3-1] Risk Boundary Check  │  │
 │  │  │  │ PII Detection    │  │              │  │ Toxicity Filter  │  │   ← 8 risk categories        │  │
 │  │  │  │ Injection Filter │  │              │  │ Fact Checker     │  │                               │  │
 │  │  │  └──────────────────┘  │              │  └──────────────────┘  │   [3-2] Adversarial Resist.  │  │
 │  │  └────────────────────────┘              └────────────────────────┘   ← Dual guardrail AIs       │  │
 │  └──────────────────────────────────────────────────────────────────────────────────────────────────┘  │
 │                                                             │                                           │
 │                                                             ▼                                           │
 │  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐  │
 │  │                                  AGENT ORCHESTRATOR                                               │  │
 │  │                                                                                                   │  │
 │  │   ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │  │
 │  │   │                              PLANNING & REASONING MODULE                                 │    │  │
 │  │   │                                                                                          │    │  │
 │  │   │  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐              │    │  │
 │  │   │  │    Goal      │   │    Plan      │   │   Action     │   │    Self-     │              │    │  │
 │  │   │  │  Decomposer  │──▶│  Generator   │──▶│   Selector   │──▶│  Reflection  │              │    │  │
 │  │   │  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘              │    │  │
 │  │   │                                                                                          │    │  │
 │  │   │  [2-1] Goal-Plan-Action Alignment ← Logical process, not lucky guesses                  │    │  │
 │  │   │  [6-3] Self-Correction & Resilience ← Re-planning on failure                            │    │  │
 │  │   └─────────────────────────────────────────────────────────────────────────────────────────┘    │  │
 │  │                                                                                                   │  │
 │  │   ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │  │
 │  │   │                                 EXECUTION ENGINE                                         │    │  │
 │  │   │                                                                                          │    │  │
 │  │   │  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐              │    │  │
 │  │   │  │   ReAct /    │   │   Parallel   │   │    Error     │   │   Timeout    │              │    │  │
 │  │   │  │   Reflexion  │   │  Execution   │   │   Handler    │   │   Manager    │              │    │  │
 │  │   │  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘              │    │  │
 │  │   │                                                                                          │    │  │
 │  │   │  [1-1] Execution Consistency (pass@k) ← Same input → Same result                        │    │  │
 │  │   │  [1-3] Fault Tolerance (λ-test) ← Backoff, retry, alternative paths                     │    │  │
 │  │   └─────────────────────────────────────────────────────────────────────────────────────────┘    │  │
 │  │                                                                                                   │  │
 │  │   ┌─────────────────────────────────────────────────────────────────────────────────────────┐    │  │
 │  │   │                              MODEL ROUTER & COST OPTIMIZER                               │    │  │
 │  │   │                                                                                          │    │  │
 │  │   │  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐              │    │  │
 │  │   │  │  Complexity  │   │    Model     │   │   Token      │   │   Response   │              │    │  │
 │  │   │  │  Estimator   │──▶│   Selector   │──▶│   Budget     │──▶│   Cache      │              │    │  │
 │  │   │  └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘              │    │  │
 │  │   │                                                                                          │    │  │
 │  │   │  [2-2] Cost Efficiency ← CNA optimization, model routing                                │    │  │
 │  │   └─────────────────────────────────────────────────────────────────────────────────────────┘    │  │
 │  └───────────────────────────────────────────────────────────────────────────────────────────────────┘  │
 │                          │                           │                           │                      │
 │            ┌─────────────┴──────────┐  ┌─────────────┴──────────┐  ┌─────────────┴──────────┐           │
 │            ▼                        ▼  ▼                        ▼  ▼                        ▼           │
 │  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐    │
 │  │    LLM PROVIDERS    │  │   MEMORY SYSTEM     │  │   TOOL EXECUTION    │  │  HUMAN-IN-THE-LOOP  │    │
 │  │                     │  │                     │  │                     │  │                     │    │
 │  │ ┌─────────────────┐ │  │ ┌─────────────────┐ │  │ ┌─────────────────┐ │  │ ┌─────────────────┐ │    │
 │  │ │  Claude/GPT/    │ │  │ │  Short-term     │ │  │ │   Tool Router   │ │  │ │  Approval Queue │ │    │
 │  │ │  Gemini/Local   │ │  │ │  (Context)      │ │  │ │                 │ │  │ │                 │ │    │
 │  │ └─────────────────┘ │  │ └─────────────────┘ │  │ └────────┬────────┘ │  │ └─────────────────┘ │    │
 │  │ ┌─────────────────┐ │  │ ┌─────────────────┐ │  │          │          │  │ ┌─────────────────┐ │    │
 │  │ │  Embeddings     │ │  │ │  Long-term      │ │  │          ▼          │  │ │  Interrupt/     │ │    │
 │  │ │  Models         │ │  │ │  (Vector DB)    │ │  │ ┌─────────────────┐ │  │ │  Override Ctrl  │ │    │
 │  │ └─────────────────┘ │  │ └─────────────────┘ │  │ │  Tool Registry  │ │  │ └─────────────────┘ │    │
 │  │ ┌─────────────────┐ │  │ ┌─────────────────┐ │  │ │  (Scoped APIs)  │ │  │ ┌─────────────────┐ │    │
 │  │ │  Distilled /    │ │  │ │  Episodic       │ │  │ └─────────────────┘ │  │ │  Escalation     │ │    │
 │  │ │  Cached Models  │ │  │ │  (Sessions)     │ │  │                     │  │ │  Engine         │ │    │
 │  │ └─────────────────┘ │  │ └─────────────────┘ │  │                     │  │ └─────────────────┘ │    │
 │  │                     │  │                     │  │                     │  │                     │    │
 │  │ [1-1] Consistency   │  │ [6-1] Memory Qual. │  │ [3-3] Permission    │  │ [4-2] Human         │    │
 │  │ ← Deterministic     │  │ ← Factuality       │  │      Scoping        │  │      Controllability│    │
 │  │   temperature       │  │                     │  │ ← Least privilege  │  │ ← HITL mechanisms   │    │
 │  │                     │  │ [6-2] Haystack     │  │                     │  │                     │    │
 │  │                     │  │      Robustness    │  │                     │  │                     │    │
 │  │                     │  │ ← Noise filtering  │  │                     │  │                     │    │
 │  │                     │  │                     │  │                     │  │                     │    │
 │  │                     │  │ [6-4] Selective    │  │                     │  │                     │    │
 │  │                     │  │      Forgetting    │  │                     │  │                     │    │
 │  │                     │  │ ← GDPR compliance  │  │                     │  │                     │    │
 │  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘    │
 │                                                                │                                        │
 │                                    ┌───────────────────────────┴───────────────────────────┐            │
 │                                    ▼                           ▼                           ▼            │
 │  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐  │
 │  │                                    EXTERNAL INTEGRATIONS                                          │  │
 │  │                                                                                                   │  │
 │  │  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐  │  │
 │  │  │   MCP SERVERS      │  │   CODE SANDBOX     │  │    DATABASE        │  │   EXTERNAL APIs    │  │  │
 │  │  │                    │  │                    │  │                    │  │                    │  │  │
 │  │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │  │
 │  │  │ │ OAuth 2.1 +    │ │  │ │  Firecracker   │ │  │ │  Read-Only     │ │  │ │  Web Search    │ │  │  │
 │  │  │ │ PKCE Auth      │ │  │ │  MicroVM       │ │  │ │  User + RLS    │ │  │ │  (Bing/Google) │ │  │  │
 │  │  │ └────────────────┘ │  │ └────────────────┘ │  │ └────────────────┘ │  │ └────────────────┘ │  │  │
 │  │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │  │
 │  │  │ │ Resource       │ │  │ │  gVisor /      │ │  │ │  Query Cost    │ │  │ │  Email/Slack   │ │  │  │
 │  │  │ │ Indicators     │ │  │ │  Seccomp       │ │  │ │  Estimator     │ │  │ │  Integrations  │ │  │  │
 │  │  │ └────────────────┘ │  │ └────────────────┘ │  │ └────────────────┘ │  │ └────────────────┘ │  │  │
 │  │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │ ┌────────────────┐ │  │  │
 │  │  │ │ Heartbeat /    │ │  │ │  Network       │ │  │ │  Schema        │ │  │ │  File Storage  │ │  │  │
 │  │  │ │ Session Mgmt   │ │  │ │  Isolation     │ │  │ │  Whitelist     │ │  │ │  (S3/GCS)      │ │  │  │
 │  │  │ └────────────────┘ │  │ └────────────────┘ │  │ └────────────────┘ │  │ └────────────────┘ │  │  │
 │  │  │                    │  │                    │  │                    │  │                    │  │  │
 │  │  │ [5-1] MCP         │  │ [5-2] Secure       │  │ [5-3] Database     │  │ [1-3] Fault        │  │  │
 │  │  │      Hardening    │  │      Sandbox       │  │      Guardrails    │  │      Tolerance     │  │  │
 │  │  │ ← Zero Trust      │  │ ← Hardware isol.   │  │ ← Deterministic    │  │ ← Retry/Backoff    │  │  │
 │  │  │                    │  │   Egress deny      │  │   defense          │  │                    │  │  │
 │  │  └────────────────────┘  └────────────────────┘  └────────────────────┘  └────────────────────┘  │  │
 │  └───────────────────────────────────────────────────────────────────────────────────────────────────┘  │
 │                                                                                                         │
 │  ┌───────────────────────────────────────────────────────────────────────────────────────────────────┐  │
 │  │                                    OBSERVABILITY STACK                                             │  │
 │  │                                                                                                    │  │
 │  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │  │
 │  │  │    METRICS      │  │     EVENTS      │  │      LOGS       │  │     TRACES      │               │  │
 │  │  │                 │  │                 │  │                 │  │                 │               │  │
 │  │  │ • Latency p50/  │  │ • Tool calls    │  │ • Structured    │  │ • Distributed   │               │  │
 │  │  │   p95/p99       │  │ • User actions  │  │   JSON logs     │  │   tracing       │               │  │
 │  │  │ • Token usage   │  │ • Errors        │  │ • Chain of      │  │ • Request ID    │               │  │
 │  │  │ • Success rate  │  │ • Guardrail     │  │   Thought       │  │   correlation   │               │  │
 │  │  │ • Cost per task │  │   triggers      │  │ • Tool I/O      │  │ • eBPF syscall  │               │  │
 │  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘               │  │
 │  │                                                                                                    │  │
 │  │  [4-1] Traceability (MELT) ← Full observability, AgentSight compliance                            │  │
 │  │                                                                                                    │  │
 │  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐  │  │
 │  │  │                           CONTINUOUS EVALUATION PIPELINE                                     │  │  │
 │  │  │                                                                                              │  │  │
 │  │  │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │  │  │
 │  │  │   │  CI/CD       │    │  Golden      │    │   Drift      │    │  Alerting    │              │  │  │
 │  │  │   │  Regression  │───▶│  Dataset     │───▶│  Detection   │───▶│  Dashboard   │              │  │  │
 │  │  │   │  Tests       │    │  Eval        │    │  Monitor     │    │              │              │  │  │
 │  │  │   └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘              │  │  │
 │  │  │                                                                                              │  │  │
 │  │  │   [4-3] Continuous Evaluation ← Regression testing, drift detection                         │  │  │
 │  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘  │  │
 │  └────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
 │                                                                                                          │
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Criteria Location Summary

### Rubric 1: Reliability & Robustness

| Criterion | Location in Architecture | Key Components |
|-----------|-------------------------|----------------|
| **1-1. Execution Consistency** | Agent Orchestrator → Execution Engine | ReAct/Reflexion, deterministic settings, temperature=0 |
| **1-2. Input Robustness** | API Gateway → Input Sanitization | Noise tolerance, synonym handling, typo resilience |
| **1-3. Fault Tolerance** | External APIs, Tool Execution | Retry logic, exponential backoff, circuit breakers |

### Rubric 2: Efficacy & Logic

| Criterion | Location in Architecture | Key Components |
|-----------|-------------------------|----------------|
| **2-1. Goal-Plan-Action Alignment** | Agent Orchestrator → Planning Module | Goal decomposer, plan generator, self-reflection |
| **2-2. Cost Efficiency** | Model Router & Cost Optimizer | Complexity estimator, model selector, token budget, cache |
| **2-3. Latency/UX** | All layers (especially UI) | Streaming responses, speculative execution, parallel processing |

### Rubric 3: Safety & Governance

| Criterion | Location in Architecture | Key Components |
|-----------|-------------------------|----------------|
| **3-1. Risk Boundary Check** | Guardrail Layer | Input/output guardrails, PII filter, toxicity filter |
| **3-2. Adversarial Resistance** | API Gateway + Guardrail Layer | Jailbreak detection, injection filters, dual guardrail AIs |
| **3-3. Permission Scoping** | Tool Execution → Tool Registry | Scoped APIs, least privilege, RBAC, token-level access |

### Rubric 4: Observability & Ops

| Criterion | Location in Architecture | Key Components |
|-----------|-------------------------|----------------|
| **4-1. Traceability (MELT)** | Observability Stack | Metrics, Events, Logs, Traces, eBPF monitoring |
| **4-2. Human Controllability** | Human-in-the-Loop Module | Approval queue, interrupt controls, escalation engine |
| **4-3. Continuous Evaluation** | Observability → CI/CD Pipeline | Regression tests, golden datasets, drift detection |

### Rubric 5: Advanced Security Architecture

| Criterion | Location in Architecture | Key Components |
|-----------|-------------------------|----------------|
| **5-1. MCP Hardening** | External Integrations → MCP Servers | OAuth 2.1, PKCE, Resource Indicators, heartbeat |
| **5-2. Secure Sandbox** | External Integrations → Code Sandbox | Firecracker MicroVM, gVisor, network isolation |
| **5-3. Database Guardrails** | External Integrations → Database | Read-only user, query cost estimator, schema whitelist |

### Rubric 6: Cognitive Architecture & Memory

| Criterion | Location in Architecture | Key Components |
|-----------|-------------------------|----------------|
| **6-1. Memory Quality** | Memory System → Long-term Memory | Vector DB, episodic memory, J Score validation |
| **6-2. Haystack Robustness** | Memory System + Context Processing | Semantic distractor filtering, RAG quality |
| **6-3. Self-Correction** | Agent Orchestrator → Planning Module | Re-planning, strategy switching, state recovery |
| **6-4. Selective Forgetting** | Memory System | Physical deletion, unlearning, S-EL compliance |

---

## Data Flow with Criteria Checkpoints

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                              REQUEST → RESPONSE FLOW                                         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

  USER REQUEST
       │
       ▼
  ┌─────────────┐
  │  [1-2] ε    │  Input Robustness Check
  │  tolerance  │  • Handle noisy/ambiguous input
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  [3-2]      │  Adversarial Resistance
  │  Injection  │  • Block jailbreak attempts
  │  Filter     │  • Detect encoded attacks
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  [6-1][6-2] │  Memory & Context
  │  Retrieve   │  • Fetch relevant memories
  │  Context    │  • Filter noise/distractors
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  [2-1]      │  Planning
  │  Goal→Plan  │  • Decompose goals
  │  →Action    │  • Generate logical plan
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  [2-2]      │  Model Selection
  │  Cost       │  • Choose optimal model
  │  Router     │  • Set token budget
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  [1-1]      │  LLM Execution
  │  pass@k     │  • Consistent outputs
  │  Execution  │  • Deterministic behavior
  └──────┬──────┘
         │
         ├───────────────┬───────────────┬───────────────┐
         ▼               ▼               ▼               ▼
  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
  │  [5-2]      │ │  [5-3]      │ │  [5-1]      │ │  [1-3]      │
  │  Code       │ │  Database   │ │  MCP        │ │  External   │
  │  Sandbox    │ │  Query      │ │  Call       │ │  API Call   │
  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
         │               │               │               │
         └───────────────┴───────┬───────┴───────────────┘
                                 │
                                 ▼
                          ┌─────────────┐
                          │  [6-3]      │  Error Handling
                          │  Self-      │  • Re-plan on failure
                          │  Correction │  • Strategy switching
                          └──────┬──────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
  │  [4-2]      │         │  [3-3]      │         │  [4-1]      │
  │  Human      │         │  Permission │         │  Trace      │
  │  Approval?  │         │  Check      │         │  Log        │
  └──────┬──────┘         └──────┬──────┘         └─────────────┘
         │                       │
         ▼                       ▼
  ┌─────────────┐         ┌─────────────┐
  │  [3-1]      │         │  [6-4]      │  Memory Update
  │  Output     │         │  Store/     │  • Persist memories
  │  Guardrail  │         │  Forget     │  • Handle deletion requests
  └──────┬──────┘         └─────────────┘
         │
         ▼
  ┌─────────────┐
  │  [2-3]      │  Response Delivery
  │  Streaming  │  • Fast first token
  │  Response   │  • Progressive display
  └──────┬──────┘
         │
         ▼
   USER RESPONSE
         │
         ▼
  ┌─────────────┐
  │  [4-3]      │  Post-Response Evaluation
  │  Continuous │  • Log for regression testing
  │  Eval       │  • Drift detection
  └─────────────┘
```

---

## Critical Integration Points

### High-Risk Areas (Score 1-2 is dangerous)

```
                    ┌──────────────────────────────────────┐
                    │         CRITICAL CHECKPOINTS         │
                    └──────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │  SECURITY PERIMETER (Rubric 3 + 5)                              │
  │                                                                  │
  │  If ANY of these score ≤2, DO NOT DEPLOY:                       │
  │                                                                  │
  │  • [3-1] Risk Boundary    → Uncontrolled code/file execution   │
  │  • [3-2] Adversarial      → Jailbreak vulnerable               │
  │  • [3-3] Permissions      → Over-privileged access             │
  │  • [5-1] MCP Hardening    → Impersonation attacks possible     │
  │  • [5-2] Sandbox          → Container escape risk              │
  │  • [5-3] DB Guardrails    → Data destruction possible          │
  │                                                                  │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │  RELIABILITY CORE (Rubric 1 + 6)                                │
  │                                                                  │
  │  If ANY of these score ≤2, limit to PILOT only:                │
  │                                                                  │
  │  • [1-1] Consistency      → Unpredictable outputs              │
  │  • [1-3] Fault Tolerance  → Crashes on API failures            │
  │  • [6-1] Memory Quality   → Forgets/hallucinates facts         │
  │  • [6-3] Self-Correction  → Infinite loops on errors           │
  │                                                                  │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │  OPERATIONAL READINESS (Rubric 4)                               │
  │                                                                  │
  │  Required for Production (score ≥3):                            │
  │                                                                  │
  │  • [4-1] Traceability     → "Why did it fail?" answerable      │
  │  • [4-2] Human Control    → Emergency stop possible            │
  │  • [4-3] Continuous Eval  → Drift detection active             │
  │                                                                  │
  └─────────────────────────────────────────────────────────────────┘
```

---

## Deployment Readiness Matrix

```
┌────────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│    Rubric      │ Experimental│ Beta/Pilot  │ Production  │ Autonomous  │
│                │   (0-40)    │  (41-65)    │  (66-80)    │  (81-95)    │
├────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ R1: Reliability│   ≤6 pts    │   7-10 pts  │  11-13 pts  │  14-15 pts  │
│ R2: Efficacy   │   ≤6 pts    │   7-10 pts  │  11-13 pts  │  14-15 pts  │
│ R3: Safety     │   ≤6 pts    │   7-10 pts  │  11-13 pts  │  14-15 pts  │
│ R4: Observ.    │   ≤6 pts    │   7-10 pts  │  11-13 pts  │  14-15 pts  │
│ R5: Security   │   ≤6 pts    │   7-10 pts  │  11-13 pts  │  14-15 pts  │
│ R6: Memory     │   ≤8 pts    │   9-13 pts  │  14-17 pts  │  18-20 pts  │
├────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ DEPLOYMENT     │     NO      │  Limited +  │    YES      │   YES +     │
│ ALLOWED?       │             │    HITL     │             │  Autonomous │
└────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## Quick Reference: Where to Improve

| If Low Score In... | Focus On These Components |
|--------------------|--------------------------|
| **Rubric 1** | Execution Engine, External API clients, Error handlers |
| **Rubric 2** | Planning Module, Model Router, Response streaming |
| **Rubric 3** | Guardrail Layer, Tool Registry permissions, API key scopes |
| **Rubric 4** | Observability Stack, HITL module, CI/CD pipeline |
| **Rubric 5** | MCP auth config, Sandbox infrastructure, DB user permissions |
| **Rubric 6** | Memory System, Vector DB, Self-reflection loops |
