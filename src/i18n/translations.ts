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
      contact: {
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
            "本規約は、法の抵触に関する規定を除き、お客様が居住する管轄区域の法律に準拠し、これに従って解釈されます。",
          ],
        },
        contact: {
          title: "11. お問い合わせ",
          content: [
            "本規約に関するご質問がある場合は、GitHubリポジトリのIssueを通じてお問い合わせください：",
            "https://github.com/shibuiwilliam/ai-agent-readiness-check/issues",
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
            "Thank you for using the AI Agent Production Readiness Check (the \"Tool\").",
            "These Terms of Use (the \"Terms\") govern your use of the Tool. By using the Tool, you agree to be bound by these Terms.",
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
            "The Tool is provided \"as is\" without any warranties of any kind.",
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
            "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which you reside, without regard to its conflict of law provisions.",
          ],
        },
        contact: {
          title: "11. Contact",
          content: [
            "If you have any questions about these Terms, please contact us through the GitHub repository Issues:",
            "https://github.com/shibuiwilliam/ai-agent-readiness-check/issues",
          ],
        },
      },
    },
    footer: {
      termsOfUse: "Terms of Use",
    },
  },
};
