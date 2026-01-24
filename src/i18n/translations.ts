export type Language = "ja" | "en";

export interface Translations {
  header: {
    title: string;
    subtitle: string;
    reset: string;
  };
  scoreSummary: {
    title: string;
    totalScore: string;
  };
  readinessLevel: {
    scoreRange: string;
  };
  improvementTips: {
    title: string;
    reliabilityLow: string;
    reliabilityTip: string;
    safetyLow: string;
    safetyTip: string;
    observabilityLow: string;
    observabilityTip: string;
    advancedSecurityLow: string;
    advancedSecurityTip: string;
    memoryLow: string;
    memoryTip: string;
  };
  floatingSummary: {
    progress: string;
    totalScore: string;
  };
  levels: {
    experimental: {
      name: string;
      action: string;
    };
    beta: {
      name: string;
      action: string;
    };
    productionReady: {
      name: string;
      action: string;
    };
    autonomousGrade: {
      name: string;
      action: string;
    };
  };
  rubrics: {
    items: string;
  };
  export: {
    title: string;
    description: string;
    downloadMarkdown: string;
  };
}

export const translations: Record<Language, Translations> = {
  ja: {
    header: {
      title: "AI Agent Production Readiness Check",
      subtitle:
        "2025-2026 Ultimate Edition - 6 Rubrics / 19 Check Items / Max 95 Points",
      reset: "リセット",
    },
    scoreSummary: {
      title: "スコアサマリー",
      totalScore: "合計スコア",
    },
    readinessLevel: {
      scoreRange: "スコア範囲",
    },
    improvementTips: {
      title: "改善のヒント",
      reliabilityLow: "Reliabilityが低い場合:",
      reliabilityTip:
        "pass@kテストをCIに導入し、プロンプトの堅牢性を高めるか、ReActからReflexion（自己反省）アーキテクチャへの移行を検討してください。",
      safetyLow: "Safetyが低い場合:",
      safetyTip:
        "OpenAgentSafetyのベンチマーク済みモデル（Claude 3.5 SonnetやGPT-4oなど）を採用し、システムレベルのサンドボックス（Dockerコンテナ等）を強制してください。",
      observabilityLow: "Observabilityが低い場合:",
      observabilityTip:
        "OpenTelemetryを導入し、LangSmithやArize Phoenixでトレースを可視化してください。",
      advancedSecurityLow: "Advanced Securityが低い場合:",
      advancedSecurityTip:
        "MCPサーバーの認証・認可を強化し、gVisorやFirecrackerによるセキュアサンドボックスを導入してください。データベースアクセスにはRead-Only接続とクエリガードレールを必須としてください。",
      memoryLow: "Memoryが低い場合:",
      memoryTip:
        "MemoryAgentBenchのベンチマークを参考に、RAGの精度向上とコンテキスト管理の堅牢性を高めてください。自己修正ループと選択的忘却メカニズムの導入を検討してください。",
    },
    floatingSummary: {
      progress: "進捗",
      totalScore: "合計スコア",
    },
    levels: {
      experimental: {
        name: "Experimental",
        action:
          "【投入不可】PoC（概念実証）段階です。アーキテクチャの根本的な見直しが必要です。特にSafetyとReliabilityのスコアが低い場合は危険です。",
      },
      beta: {
        name: "Beta / Pilot",
        action:
          "【条件付き可】社内利用や限定ユーザーへの公開は可能です。ただし、Human-in-the-loop（常時監視）を必須とし、影響範囲を限定してください。",
      },
      productionReady: {
        name: "Production Ready",
        action:
          "【投入推奨】一般的な商用利用に耐えうる水準です。Rubric 4〜6を強化し、スモールスタートで公開してください。",
      },
      autonomousGrade: {
        name: "Autonomous Grade",
        action:
          "【最高水準】金融・医療などのミッションクリティカルな領域でも通用するSOTAレベルのエージェントです。長期記憶と自律的改善サイクルを回してください。",
      },
    },
    rubrics: {
      items: "項目",
    },
    export: {
      title: "レポートをエクスポート",
      description: "評価結果をMarkdown形式でダウンロードできます。",
      downloadMarkdown: "Markdownをダウンロード",
    },
  },
  en: {
    header: {
      title: "AI Agent Production Readiness Check",
      subtitle:
        "2025-2026 Ultimate Edition - 6 Rubrics / 19 Check Items / Max 95 Points",
      reset: "Reset",
    },
    scoreSummary: {
      title: "Score Summary",
      totalScore: "Total Score",
    },
    readinessLevel: {
      scoreRange: "Score Range",
    },
    improvementTips: {
      title: "Improvement Tips",
      reliabilityLow: "If Reliability is low:",
      reliabilityTip:
        "Introduce pass@k testing in CI, improve prompt robustness, or consider migrating from ReAct to Reflexion (self-reflection) architecture.",
      safetyLow: "If Safety is low:",
      safetyTip:
        "Adopt benchmark-tested models (Claude 3.5 Sonnet, GPT-4o, etc.) from OpenAgentSafety and enforce system-level sandboxing (Docker containers, etc.).",
      observabilityLow: "If Observability is low:",
      observabilityTip:
        "Introduce OpenTelemetry and visualize traces with LangSmith or Arize Phoenix.",
      advancedSecurityLow: "If Advanced Security is low:",
      advancedSecurityTip:
        "Strengthen MCP server authentication and authorization, and introduce secure sandboxes using gVisor or Firecracker. Enforce Read-Only connections and query guardrails for database access.",
      memoryLow: "If Memory is low:",
      memoryTip:
        "Refer to MemoryAgentBench benchmarks to improve RAG accuracy and context management robustness. Consider implementing self-correction loops and selective forgetting mechanisms.",
    },
    floatingSummary: {
      progress: "Progress",
      totalScore: "Total Score",
    },
    levels: {
      experimental: {
        name: "Experimental",
        action:
          "[Not Deployable] This is at the PoC (Proof of Concept) stage. A fundamental architectural review is required. Particularly dangerous if Safety and Reliability scores are low.",
      },
      beta: {
        name: "Beta / Pilot",
        action:
          "[Conditionally Allowed] Internal use or limited user release is possible. However, Human-in-the-loop (constant monitoring) is mandatory, and the scope of impact should be limited.",
      },
      productionReady: {
        name: "Production Ready",
        action:
          "[Deployment Recommended] Meets the standard for general commercial use. Strengthen Rubrics 4-6 and start with a small-scale release.",
      },
      autonomousGrade: {
        name: "Autonomous Grade",
        action:
          "[Highest Standard] A SOTA-level agent suitable for mission-critical domains such as finance and healthcare. Implement long-term memory and autonomous improvement cycles.",
      },
    },
    rubrics: {
      items: "items",
    },
    export: {
      title: "Export Report",
      description: "Download your evaluation results in Markdown format.",
      downloadMarkdown: "Download Markdown",
    },
  },
};
