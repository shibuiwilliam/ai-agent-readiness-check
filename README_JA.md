# AI Agent Production Readiness Check

> **Language / 言語:** [English](./README.md) | [日本語](./README_JA.md)

**あなたのAIエージェント、本番環境に出せますか？** このツールで簡単にチェックできます。

AIエージェントを作るのはワクワクしますよね。でも本番環境にデプロイする前に確認しておきたいことがあります。*本当に安定して動く？安全？ユーザーに任せて大丈夫？*

12の質問に答えるだけで、明確なスコアと具体的な改善ポイントがわかります。

## 今すぐ試す

**[Readiness Checkを開く](https://ai-agent-readiness-check.vercel.app/)**

## 使い方

### 1. 12の質問に答える

4つのカテゴリについて、1〜5点で評価していきます：

| カテゴリ | 評価する内容 |
|----------|-------------|
| **Reliability & Robustness（信頼性と堅牢性）** | エージェントは一貫した結果を返す？予期しない入力にも対応できる？ |
| **Efficacy & Logic（有効性と論理性）** | 目標を達成できている？コストは適切？ |
| **Safety & Governance（安全性とガバナンス）** | ガードレールは整備されている？攻撃への耐性は？ |
| **Observability & Ops（可観測性と運用）** | 何をしているか把握できる？必要なときに人間が介入できる？ |

### 2. スコアを確認する

合計スコア（60点満点）でReadiness Levelが決まります：

| スコア | レベル | 意味 |
|--------|--------|------|
| 0-25 | **Experimental** | まだPoC段階。デプロイ前にもう少し改善を。 |
| 26-40 | **Beta / Pilot** | しっかり監視しながら社内テストならOK。 |
| 41-52 | **Production Ready** | 一般的なビジネス用途で本番利用可能。 |
| 53-60 | **Enterprise Grade** | ミッションクリティカルな用途（金融・医療等）にも対応。 |

### 3. 改善アクションを実行する

スコアに基づいて、具体的な改善ポイントが表示されます。結果はPDFでエクスポートしてチームで共有できます。

## クイックスタート

```bash
# コードを取得
git clone https://github.com/shibuiwilliam/ai-agent-readiness-check
cd ai-agent-readiness-check

# インストールして起動
npm install
npm run dev
```

[http://localhost:5173](http://localhost:5173) を開いてください。

## なぜこのツール？

このチェックリストは、2025年の主要なAIエージェント評価フレームワークの研究成果に基づいています：

- **ReliabilityBench** - 本番環境ストレス下でのエージェント信頼性評価
- **CLEAR Framework** - エンタープライズ向けAI評価
- **Agent GPA** - Goal-Plan-Action整合性評価
- **OpenAgentSafety** - 実世界での安全性評価
- **SafePro** - プロフェッショナルレベルの安全性基準
- **AgentSight** - エージェント可観測性のベストプラクティス

これらの学術的なフレームワークを、今日から使える実践的な質問に落とし込みました。

## 開発者向け

### コマンド

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルド |
| `npm run lint` | コード品質チェック |
| `npm run typecheck` | TypeScript型チェック |

### 技術スタック

React 18 + TypeScript + Vite + Tailwind CSS

### ドキュメント

- [チェックリスト詳細（日本語）](./AIAgentReadinessCheck_JA.md)
- [Full Checklist (English)](./AIAgentReadinessCheck_EN.md)
- [アーキテクチャ図（日本語）](./architecture-diagram_JA.md)
- [Architecture Diagram (English)](./architecture-diagram_EN.md)

## ライセンス

MIT - 自由にお使いください。

---

**スコアについて:** このツールはギャップを見つけ、チームでより良い議論をするためのものです。低いスコアは失敗ではなく、改善へのロードマップ。高いスコアは保証ではなく、自信を持つための出発点です。
