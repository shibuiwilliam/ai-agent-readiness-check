// Utility functions for generating links to references and tools

// Special arXiv PDF URL mappings (for papers where we want to link to PDF instead of abstract)
const arxivPdfUrls: Record<string, string> = {
  "2601.06112": "https://arxiv.org/pdf/2601.06112v1", // ReliabilityBench
};

// Parse arXiv reference and return URL
export function parseArxivReference(reference: string): {
  text: string;
  url: string | null;
} {
  // Match patterns like "arXiv:2601.06112" or "(arXiv:2601.06112)"
  const arxivMatch = reference.match(/\(?arXiv:(\d{4}\.\d{4,5})\)?/i);
  if (arxivMatch) {
    const arxivId = arxivMatch[1];
    // Check if there's a special PDF URL for this paper
    if (arxivPdfUrls[arxivId]) {
      return {
        text: reference,
        url: arxivPdfUrls[arxivId],
      };
    }
    return {
      text: reference,
      url: `https://arxiv.org/abs/${arxivId}`,
    };
  }
  return { text: reference, url: null };
}

// Tool URL mappings
const toolUrls: Record<string, string> = {
  // Observability & Tracing
  OpenTelemetry: "https://opentelemetry.io/",
  "OpenTelemetry traces": "https://opentelemetry.io/",
  LangSmith: "https://smith.langchain.com/",
  "LangSmith Cost Monitor": "https://smith.langchain.com/",
  "Arize Phoenix": "https://phoenix.arize.com/",
  Langfuse: "https://langfuse.com/",
  Prometheus: "https://prometheus.io/",
  Grafana: "https://grafana.com/",
  Datadog: "https://www.datadoghq.com/",
  "Datadog APM": "https://www.datadoghq.com/product/apm/",
  "Datadog LLM Observability":
    "https://www.datadoghq.com/product/llm-observability/",
  "Evidently AI": "https://www.evidentlyai.com/",

  // Security & Sandboxing
  gVisor: "https://gvisor.dev/",
  Firecracker: "https://firecracker-microvm.github.io/",
  Docker: "https://www.docker.com/",
  "Docker (Sandbox)": "https://www.docker.com/",
  "Docker with seccomp": "https://docs.docker.com/engine/security/seccomp/",
  "E2B Sandbox": "https://e2b.dev/",
  Kubernetes: "https://kubernetes.io/",

  // Testing & Benchmarks
  "ReliabilityBench harness": "https://arxiv.org/pdf/2601.06112v1",
  "ReliabilityBench Chaos Framework": "https://arxiv.org/pdf/2601.06112v1",
  "SWE-bench": "https://www.swebench.com/",
  "Agent GPA": "https://github.com/AI-Research-Agent/Agent-GPA",
  HumanEval: "https://github.com/openai/human-eval",
  "OpenAgentSafety Benchmark": "https://github.com/agiresearch/OpenAgentSafety",
  "LOCOMO Benchmark": "https://github.com/snap-stanford/locomo-benchmark",
  "Recovery-Bench (Letta AI)": "https://github.com/letta-ai/recovery-bench",
  "Machine Unlearning Benchmark":
    "https://github.com/cleverhans-lab/machine-unlearning",
  "HaystackCraft Benchmark": "https://github.com/Graph-COM/HaystackCraft",
  "NIAH Test Suite": "https://arxiv.org/abs/2407.16695",

  // AI/ML Tools & Frameworks
  LangChain: "https://www.langchain.com/",
  "LangGraph (interrupt_before)": "https://langchain-ai.github.io/langgraph/",
  LlamaIndex: "https://www.llamaindex.ai/",
  "Claude MCP": "https://www.anthropic.com/news/model-context-protocol",
  MCP: "https://modelcontextprotocol.io/",
  "MCP Inspector": "https://modelcontextprotocol.io/docs/tools/inspector",
  "MCP Security Scanner": "https://modelcontextprotocol.io/",
  "LLM-as-a-Judge Framework": "https://github.com/explodinggradients/ragas",
  promptfoo: "https://www.promptfoo.dev/",

  // Security Testing Tools
  Garak: "https://github.com/leondz/garak",
  "Garak (LLM vulnerability scanner)": "https://github.com/leondz/garak",
  "PyRIT (Python Risk Identification Tool)": "https://github.com/Azure/PyRIT",
  "PII Extraction Test Suite": "https://github.com/microsoft/presidio",
  "Secret Scanner": "https://github.com/trufflesecurity/trufflehog",
  Mitmproxy: "https://mitmproxy.org/",
  "OAuth 2.1 Test Suite": "https://oauth.net/2.1/",

  // Databases & Storage
  pgAudit: "https://www.pgaudit.org/",
  Prisma: "https://www.prisma.io/",
  Supabase: "https://supabase.com/",

  // Security Tools
  OWASP: "https://owasp.org/",
  "OWASP ZAP": "https://www.zaproxy.org/",
  Snyk: "https://snyk.io/",
  Dependabot: "https://github.com/dependabot",
  "Cloud IAM Analyzer": "https://cloud.google.com/iam",

  // CI/CD
  "GitHub Actions": "https://github.com/features/actions",
  "GitLab CI": "https://docs.gitlab.com/ee/ci/",
  Jenkins: "https://www.jenkins.io/",

  // RAG & Vector DBs
  Pinecone: "https://www.pinecone.io/",
  Weaviate: "https://weaviate.io/",
  Chroma: "https://www.trychroma.com/",
  Qdrant: "https://qdrant.tech/",
  Milvus: "https://milvus.io/",

  // Evaluation & Analysis
  "RAGAS framework": "https://docs.ragas.io/",
  RAGAS: "https://docs.ragas.io/",
  DeepEval: "https://docs.confident-ai.com/",
  TruLens: "https://www.trulens.org/",
  "nlpaug (Python library)": "https://github.com/makcedward/nlpaug",

  // Cost & Usage Monitoring
  "OpenAI Usage Dashboard": "https://platform.openai.com/usage",
};

// Get URL for a tool, returns null if not found
export function getToolUrl(tool: string): string | null {
  // Direct match
  if (toolUrls[tool]) {
    return toolUrls[tool];
  }

  // Try case-insensitive match
  const lowerTool = tool.toLowerCase();
  for (const [key, url] of Object.entries(toolUrls)) {
    if (key.toLowerCase() === lowerTool) {
      return url;
    }
  }

  // Try partial match (e.g., "Python script" won't match but "LangSmith dashboard" could match LangSmith)
  for (const [key, url] of Object.entries(toolUrls)) {
    if (tool.toLowerCase().includes(key.toLowerCase())) {
      return url;
    }
  }

  return null;
}
