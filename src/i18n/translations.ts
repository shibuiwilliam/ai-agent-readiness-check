export type Language = "ja" | "en" | "zh";

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
  termsOfUse: {
    title: string;
    lastUpdated: string;
    close: string;
    sections: {
      introduction: {
        title: string;
        content: string[];
      };
      purposeAndScope: {
        title: string;
        content: string[];
      };
      disclaimer: {
        title: string;
        content: string[];
      };
      noWarranty: {
        title: string;
        content: string[];
      };
      limitationOfLiability: {
        title: string;
        content: string[];
      };
      userResponsibility: {
        title: string;
        content: string[];
      };
      dataAndPrivacy: {
        title: string;
        content: string[];
      };
      intellectualProperty: {
        title: string;
        content: string[];
      };
      modificationsAndUpdates: {
        title: string;
        content: string[];
      };
      governingLaw: {
        title: string;
        content: string[];
      };
    };
  };
  footer: {
    termsOfUse: string;
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
    termsOfUse: {
      title: "利用規約",
      lastUpdated: "最終更新日: 2026年1月24日",
      close: "閉じる",
      sections: {
        introduction: {
          title: "1. はじめに",
          content: [
            "AI Agent Production Readiness Check（以下「本ツール」）をご利用いただきありがとうございます。",
            "本利用規約（以下「本規約」）は、本ツールの使用条件を定めるものです。本ツールを使用することにより、お客様は本規約に同意したものとみなされます。",
          ],
        },
        purposeAndScope: {
          title: "2. 目的と適用範囲",
          content: [
            "本ツールは、AIエージェントの本番環境への導入準備状況を評価するための参考情報を提供するものです。",
            "本ツールは、学術研究（ReliabilityBench、CLEAR Framework、Agent GPA、OpenAgentSafety、MemoryAgentBenchなど）に基づいていますが、これらは参考資料であり、本ツールの評価結果を保証するものではありません。",
          ],
        },
        disclaimer: {
          title: "3. 免責事項",
          content: [
            "本ツールは「現状有姿」で提供され、いかなる種類の保証も行いません。",
            "本ツールの評価結果は、あくまで参考情報であり、AIエージェントの本番環境への導入可否を決定するものではありません。",
            "本ツールの使用により生じたいかなる損害についても、開発者および関係者は一切の責任を負いません。",
            "本ツールの評価結果に基づいてAIエージェントを本番環境に導入した場合に発生する問題、損害、セキュリティインシデント、データ損失、その他いかなる結果についても、開発者および関係者は一切の責任を負いません。",
          ],
        },
        noWarranty: {
          title: "4. 保証の否認",
          content: [
            "本ツールは、明示的または黙示的を問わず、商品性、特定目的への適合性、非侵害性を含むいかなる保証も行いません。",
            "本ツールが中断されないこと、エラーがないこと、または本ツールの欠陥が修正されることを保証しません。",
            "本ツールから取得した情報やアドバイスが、本規約に明示的に記載されていない保証を生じさせることはありません。",
          ],
        },
        limitationOfLiability: {
          title: "5. 責任の制限",
          content: [
            "いかなる場合においても、開発者および関係者は、本ツールの使用または使用不能から生じる直接的、間接的、偶発的、特別、懲罰的、または結果的な損害（利益の損失、データの損失、業務の中断を含むがこれに限らない）について、責任を負いません。",
            "これは、たとえ開発者がそのような損害の可能性について知らされていた場合でも適用されます。",
            "一部の管轄区域では、黙示的保証の除外や結果的損害または偶発的損害に対する責任の制限が認められていない場合があります。そのような管轄区域では、上記の制限が適用されない場合があります。",
          ],
        },
        userResponsibility: {
          title: "6. ユーザーの責任",
          content: [
            "本ツールの評価結果は参考情報として使用し、AIエージェントの本番環境への導入に関する最終的な判断は、お客様ご自身の責任で行ってください。",
            "本ツールの評価結果に加えて、独自のセキュリティ評価、リスク分析、テストを実施してください。",
            "AIエージェントを本番環境に導入する前に、適切な専門家（セキュリティ専門家、法務専門家など）に相談することを強く推奨します。",
            "本ツールが推奨するツールやフレームワークについて、それらの利用規約およびライセンスを確認し、遵守する責任はお客様にあります。",
          ],
        },
        dataAndPrivacy: {
          title: "7. データとプライバシー",
          content: [
            "本ツールは、お客様の評価データをブラウザのローカルストレージに保存します。",
            "本ツールは、お客様のデータを外部サーバーに送信しません。",
            "お客様のプライバシーを保護するため、機密情報や個人情報を本ツールに入力しないでください。",
          ],
        },
        intellectualProperty: {
          title: "8. 知的財産権",
          content: [
            "本ツールはMITライセンスの下で提供されています。",
            "本ツールのソースコードは自由に使用、変更、配布することができますが、MITライセンスの条件に従う必要があります。",
            "本ツールで参照されている論文、フレームワーク、ツールは、それぞれの著作者および組織に帰属します。",
          ],
        },
        modificationsAndUpdates: {
          title: "9. 変更と更新",
          content: [
            "開発者は、事前の通知なく本規約を変更する権利を留保します。",
            "本規約の変更は、本ページに掲載された時点で有効となります。",
            "本規約の変更後も本ツールを継続して使用する場合、変更された規約に同意したものとみなされます。",
          ],
        },
        governingLaw: {
          title: "10. 準拠法",
          content: [
            "本規約は、日本国の法律に準拠し、これに従って解釈されます。",
          ],
        },
      },
    },
    footer: {
      termsOfUse: "利用規約",
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
    termsOfUse: {
      title: "Terms of Use",
      lastUpdated: "Last Updated: January 24, 2026",
      close: "Close",
      sections: {
        introduction: {
          title: "1. Introduction",
          content: [
            'Thank you for using the AI Agent Production Readiness Check (the "Tool").',
            'These Terms of Use (the "Terms") govern your use of the Tool. By using the Tool, you agree to be bound by these Terms.',
          ],
        },
        purposeAndScope: {
          title: "2. Purpose and Scope",
          content: [
            "The Tool provides reference information to assess the readiness of AI agents for deployment to production environments.",
            "While the Tool is based on academic research (including ReliabilityBench, CLEAR Framework, Agent GPA, OpenAgentSafety, and MemoryAgentBench), these are reference materials only and do not guarantee the accuracy of the Tool's evaluation results.",
          ],
        },
        disclaimer: {
          title: "3. Disclaimer",
          content: [
            'The Tool is provided "as is" without any warranties of any kind.',
            "The evaluation results provided by the Tool are for reference purposes only and do not determine whether an AI agent should be deployed to a production environment.",
            "The developers and contributors assume no responsibility for any damages arising from the use of the Tool.",
            "The developers and contributors assume no responsibility for any problems, damages, security incidents, data loss, or other consequences arising from deploying an AI agent to a production environment based on the Tool's evaluation results.",
          ],
        },
        noWarranty: {
          title: "4. No Warranty",
          content: [
            "The Tool is provided without warranty of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.",
            "We do not warrant that the Tool will be uninterrupted, error-free, or that defects in the Tool will be corrected.",
            "No information or advice obtained from the Tool shall create any warranty not expressly stated in these Terms.",
          ],
        },
        limitationOfLiability: {
          title: "5. Limitation of Liability",
          content: [
            "In no event shall the developers or contributors be liable for any direct, indirect, incidental, special, punitive, or consequential damages (including but not limited to loss of profits, data loss, or business interruption) arising out of or in connection with the use or inability to use the Tool.",
            "This applies even if the developers have been advised of the possibility of such damages.",
            "Some jurisdictions do not allow the exclusion of implied warranties or the limitation of liability for incidental or consequential damages. In such jurisdictions, the above limitations may not apply.",
          ],
        },
        userResponsibility: {
          title: "6. User Responsibility",
          content: [
            "Use the Tool's evaluation results as reference information only, and make final decisions regarding AI agent deployment to production environments at your own risk and responsibility.",
            "Conduct your own security assessments, risk analyses, and testing in addition to the Tool's evaluation results.",
            "We strongly recommend consulting with appropriate experts (security professionals, legal advisors, etc.) before deploying an AI agent to a production environment.",
            "You are responsible for reviewing and complying with the terms of use and licenses of any tools or frameworks recommended by the Tool.",
          ],
        },
        dataAndPrivacy: {
          title: "7. Data and Privacy",
          content: [
            "The Tool stores your evaluation data in your browser's local storage.",
            "The Tool does not transmit your data to external servers.",
            "To protect your privacy, please do not enter confidential or personal information into the Tool.",
          ],
        },
        intellectualProperty: {
          title: "8. Intellectual Property",
          content: [
            "The Tool is provided under the MIT License.",
            "You are free to use, modify, and distribute the Tool's source code, subject to the conditions of the MIT License.",
            "Papers, frameworks, and tools referenced by the Tool are the property of their respective authors and organizations.",
          ],
        },
        modificationsAndUpdates: {
          title: "9. Modifications and Updates",
          content: [
            "The developers reserve the right to modify these Terms at any time without prior notice.",
            "Changes to these Terms will be effective when posted on this page.",
            "Your continued use of the Tool after changes to these Terms constitutes your acceptance of the modified Terms.",
          ],
        },
        governingLaw: {
          title: "10. Governing Law",
          content: [
            "These Terms shall be governed by and construed in accordance with the laws of Japan.",
          ],
        },
      },
    },
    footer: {
      termsOfUse: "Terms of Use",
    },
  },
  zh: {
    header: {
      title: "AI Agent 生产就绪性检查",
      subtitle:
        "2025-2026 终极版 - 6个评测维度 / 19个检查项 / 最高95分",
      reset: "重置",
    },
    scoreSummary: {
      title: "分数摘要",
      totalScore: "总分",
    },
    readinessLevel: {
      scoreRange: "分数范围",
    },
    improvementTips: {
      title: "改善建议",
      reliabilityLow: "可靠性得分偏低时：",
      reliabilityTip:
        "在CI中引入pass@k测试，提高提示词的鲁棒性，或考虑从ReAct架构迁移到Reflexion（自我反思）架构。",
      safetyLow: "安全性得分偏低时：",
      safetyTip:
        "采用OpenAgentSafety中经过基准测试的模型（如Claude 3.5 Sonnet、GPT-4o等），并强制执行系统级沙箱隔离（如Docker容器）。",
      observabilityLow: "可观测性得分偏低时：",
      observabilityTip:
        "引入OpenTelemetry，并使用LangSmith或Arize Phoenix可视化追踪链路。",
      advancedSecurityLow: "高级安全性得分偏低时：",
      advancedSecurityTip:
        "加强MCP服务器的认证与授权，引入基于gVisor或Firecracker的安全沙箱。数据库访问必须强制使用只读连接和查询护栏。",
      memoryLow: "记忆能力得分偏低时：",
      memoryTip:
        "参考MemoryAgentBench基准测试，提升RAG精度和上下文管理的鲁棒性。考虑引入自我修正循环和选择性遗忘机制。",
    },
    floatingSummary: {
      progress: "进度",
      totalScore: "总分",
    },
    levels: {
      experimental: {
        name: "实验阶段",
        action:
          "【不可部署】处于PoC（概念验证）阶段，需要对架构进行根本性审查。若安全性和可靠性得分较低，则存在较高风险。",
      },
      beta: {
        name: "Beta / 试点",
        action:
          "【有条件允许】可用于内部使用或有限用户发布，但必须强制要求人工监督（Human-in-the-loop），并限制影响范围。",
      },
      productionReady: {
        name: "生产就绪",
        action:
          "【推荐部署】达到了面向普通商业用途的标准。建议强化第4至第6个评测维度，并以小规模方式上线。",
      },
      autonomousGrade: {
        name: "自主级",
        action:
          "【最高标准】达到SOTA水平，适用于金融、医疗等任务关键型领域。请持续运行长期记忆与自主改进循环。",
      },
    },
    rubrics: {
      items: "项",
    },
    export: {
      title: "导出报告",
      description: "可将评估结果以Markdown格式下载。",
      downloadMarkdown: "下载Markdown",
    },
    termsOfUse: {
      title: "使用条款",
      lastUpdated: "最后更新：2026年1月24日",
      close: "关闭",
      sections: {
        introduction: {
          title: "1. 简介",
          content: [
            "感谢您使用 AI Agent 生产就绪性检查（以下简称\"本工具\"）。",
            "本使用条款（以下简称\"本条款\"）规定了您使用本工具的条件。使用本工具即表示您同意受本条款约束。",
          ],
        },
        purposeAndScope: {
          title: "2. 目的与适用范围",
          content: [
            "本工具提供参考信息，用于评估AI代理是否具备部署到生产环境的准备度。",
            "本工具基于学术研究成果（包括ReliabilityBench、CLEAR Framework、Agent GPA、OpenAgentSafety和MemoryAgentBench等），这些仅为参考资料，不保证本工具评估结果的准确性。",
          ],
        },
        disclaimer: {
          title: "3. 免责声明",
          content: [
            "本工具以\"现状\"提供，不附带任何形式的保证。",
            "本工具提供的评估结果仅供参考，不决定AI代理是否应部署到生产环境。",
            "开发者及贡献者对因使用本工具而产生的任何损害不承担责任。",
            "对于基于本工具评估结果将AI代理部署到生产环境所引发的问题、损害、安全事故、数据丢失或其他后果，开发者及贡献者不承担任何责任。",
          ],
        },
        noWarranty: {
          title: "4. 无保证声明",
          content: [
            "本工具不提供任何明示或默示的保证，包括但不限于适销性、特定用途适用性及不侵权的保证。",
            "我们不保证本工具不会中断、无错误运行或其缺陷将被修复。",
            "从本工具获取的任何信息或建议均不构成本条款未明确规定的保证。",
          ],
        },
        limitationOfLiability: {
          title: "5. 责任限制",
          content: [
            "在任何情况下，开发者或贡献者均不对因使用或无法使用本工具而导致的任何直接、间接、附带、特殊、惩罚性或后果性损害（包括但不限于利润损失、数据丢失或业务中断）承担责任。",
            "即使开发者已被告知此类损害的可能性，上述条款仍适用。",
            "某些司法管辖区不允许排除默示保证或限制附带或后果性损害的责任，在这些地区上述限制可能不适用。",
          ],
        },
        userResponsibility: {
          title: "6. 用户责任",
          content: [
            "请将本工具的评估结果仅作为参考信息，并自行承担关于将AI代理部署到生产环境的最终决策责任。",
            "除本工具的评估结果外，请进行独立的安全评估、风险分析和测试。",
            "强烈建议在将AI代理部署到生产环境之前咨询专业人士（安全专家、法律顾问等）。",
            "您有责任查阅并遵守本工具推荐的任何工具或框架的使用条款和许可证。",
          ],
        },
        dataAndPrivacy: {
          title: "7. 数据与隐私",
          content: [
            "本工具将您的评估数据存储在浏览器的本地存储中。",
            "本工具不会将您的数据传输到外部服务器。",
            "为保护您的隐私，请勿在本工具中输入机密或个人信息。",
          ],
        },
        intellectualProperty: {
          title: "8. 知识产权",
          content: [
            "本工具依据MIT许可证提供。",
            "您可以自由使用、修改和分发本工具的源代码，但须遵守MIT许可证的条款。",
            "本工具引用的论文、框架和工具归其各自作者和组织所有。",
          ],
        },
        modificationsAndUpdates: {
          title: "9. 修改与更新",
          content: [
            "开发者保留随时修改本条款的权利，无需事先通知。",
            "本条款的变更在发布到本页面时即生效。",
            "在本条款变更后继续使用本工具，即表示您接受修改后的条款。",
          ],
        },
        governingLaw: {
          title: "10. 适用法律",
          content: [
            "本条款受日本法律管辖并依据其解释。",
          ],
        },
      },
    },
    footer: {
      termsOfUse: "使用条款",
    },
  },
};
