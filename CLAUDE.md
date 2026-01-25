# AI Agent Production Readiness Check - 開発ガイドライン

## プロジェクト概要

2025-2026年の主要AIエージェント評価フレームワーク（CLEAR, ReliabilityBench, Agent GPA, OpenAgentSafety, MemoryAgentBench, RADAR, SDQM, CodeMem）を統合した、エージェントの本番運用適合性を判定するインタラクティブなチェックリストWebアプリケーション。

**Integrated Edition**: 6 Rubrics / 21 Check Items / Max 105 Points

## 技術スタック

- **言語**: TypeScript (strict mode)
- **フレームワーク**: React 18+
- **スタイリング**: Tailwind CSS
- **ビルドツール**: Vite
- **状態管理**: React hooks (useState, useReducer, useContext)
- **多言語対応**: 日本語/英語 (LanguageProvider)

## 機能要件

### コア機能

1. **6つのRubric（大項目）の評価UI**
    - Rubric 1: Reliability & Robustness（信頼性と堅牢性）- 4項目
    - Rubric 2: Efficacy & Performance（有効性と性能）- 3項目
    - Rubric 3: Safety & Governance（安全性とガバナンス）- 3項目
    - Rubric 4: Security Architecture（セキュリティアーキテクチャ）- 3項目
    - Rubric 5: Observability & Operations（可観測性と運用）- 4項目
    - Rubric 6: Memory & Knowledge（記憶と知識）- 4項目

2. **21のチェック項目（小項目）のスコアリング**
    - 各項目: 1〜5点のスコア入力
    - 各スコアレベルの説明表示
    - 未評価/評価済みの状態管理
    - 詳細情報（評価目的、重要性、チェック方法、推奨ツール）の折りたたみ表示

3. **スコア集計と判定**
    - Rubricごとの小計（動的計算）
    - 総合スコア（最大105点）
    - Readiness Levelの自動判定（Level 1〜4）

4. **結果表示**
    - 視覚的なスコアゲージ/プログレスバー
    - 判定結果とアクションガイドの表示
    - 改善のためのヒント表示（6カテゴリ）
    - アーキテクチャダイアグラムによる可視化

5. **エクスポート機能**
    - Markdownレポートのダウンロード
    - 参考論文・ツールへのリンク付き

## データモデル

```typescript
// スコアレベルの定義
type ScoreLevel = 1 | 2 | 3 | 4 | 5 | null;

// レベル情報
interface LevelInfo {
  score: 1 | 2 | 3 | 4 | 5;
  label: { ja: string; en: string };
  description: { ja: string; en: string };
}

// チェック項目
interface CheckItem {
  id: string;
  name: { ja: string; en: string };
  description: { ja: string; en: string };
  purpose: { ja: string; en: string };
  importance: { ja: string; en: string };
  howToCheck: { ja: string[]; en: string[] };
  tools: string[];
  levels: LevelInfo[];
}

// Rubric（大項目）
interface Rubric {
  id: string;
  name: { ja: string; en: string };
  description: { ja: string; en: string };
  references: string[]; // 根拠論文 (arXiv形式でリンク可能)
  items: CheckItem[];
}

// 評価状態
interface EvaluationState {
  scores: Record<string, ScoreLevel>; // itemId -> score
  completedAt?: Date;
}

// 判定結果
type ReadinessLevel =
  | { level: 1; name: 'Experimental'; range: '0-45' }
  | { level: 2; name: 'Beta / Pilot'; range: '46-70' }
  | { level: 3; name: 'Production Ready'; range: '71-90' }
  | { level: 4; name: 'Autonomous Grade'; range: '91-105' };
```

## コンポーネント構成

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # アプリヘッダー（言語切替、リセット）
│   │   └── Container.tsx       # レイアウトコンテナ
│   ├── rubric/
│   │   ├── RubricCard.tsx      # Rubric表示カード（参考論文リンク付き）
│   │   └── RubricList.tsx      # Rubric一覧
│   ├── check-item/
│   │   ├── CheckItemCard.tsx   # チェック項目カード（詳細折りたたみ、ツールリンク）
│   │   ├── ScoreSelector.tsx   # スコア選択UI（1-5）
│   │   └── LevelDescription.tsx # レベル説明表示
│   ├── result/
│   │   ├── ScoreSummary.tsx    # スコアサマリー（動的最大値）
│   │   ├── ReadinessLevel.tsx  # 判定結果表示
│   │   ├── FloatingSummary.tsx # フローティングサマリー
│   │   └── ExportButtons.tsx   # エクスポートボタン（Markdown）
│   ├── diagram/
│   │   ├── ArchitectureDiagram.tsx    # アーキテクチャ図
│   │   ├── MiniArchitectureIndicator.tsx # ミニインジケーター
│   │   └── index.ts
│   └── common/
│       └── ProgressBar.tsx     # プログレスバー
├── data/
│   └── rubrics.ts              # Rubric/CheckItem定義データ（6 Rubrics, 21 Items）
├── hooks/
│   ├── useEvaluation.ts        # 評価状態管理（LocalStorage永続化）
│   ├── useReadinessLevel.ts    # 判定ロジック
│   └── useActiveRubric.ts      # アクティブRubric検出（スクロール連動）
├── utils/
│   ├── scoring.ts              # スコア計算ユーティリティ
│   ├── export.ts               # Markdownエクスポート
│   └── links.ts                # 参考論文・ツールのURL生成
├── i18n/
│   ├── index.ts                # 言語プロバイダー
│   └── translations.ts         # 翻訳データ
├── types/
│   └── index.ts                # 型定義
├── App.tsx
└── main.tsx
```

## UI/UXガイドライン

### レイアウト

- **シングルページ構成**: スクロールで全項目を表示
- **セクション分け**: 各Rubricを視覚的に区切る（ID付き: `rubric-1`, `rubric-2`, ...）
- **フローティングサマリー**: 画面下部に常時スコア表示
- **ミニアーキテクチャ**: 右下にアクティブRubricを示すミニ図

### スコア選択UI

```
推奨: ラジオボタン or ボタングループ形式

[1] [2] [3] [4] [5]  ← クリックで選択
 ↓
選択時に該当レベルの説明をハイライト表示
```

### カラースキーム（Tailwind）

```typescript
const scoreColors = {
  1: 'bg-red-500',      // 危険
  2: 'bg-orange-500',   // 警告
  3: 'bg-yellow-500',   // 注意
  4: 'bg-blue-500',     // 良好
  5: 'bg-green-500',    // 最高
};

const levelColors = {
  1: 'bg-red-100 border-red-500 text-red-800',
  2: 'bg-orange-100 border-orange-500 text-orange-800',
  3: 'bg-blue-100 border-blue-500 text-blue-800',
  4: 'bg-green-100 border-green-500 text-green-800',
};
```

### レスポンシブ対応

- モバイル: 1カラム、アコーディオン形式
- タブレット: 2カラム
- デスクトップ: サイドバー + メインコンテンツ

## 判定ロジック

```typescript
function calculateReadinessLevel(totalScore: number): ReadinessLevel {
  if (totalScore <= 45) {
    return { level: 1, name: 'Experimental', range: '0-45' };
  } else if (totalScore <= 70) {
    return { level: 2, name: 'Beta / Pilot', range: '46-70' };
  } else if (totalScore <= 90) {
    return { level: 3, name: 'Production Ready', range: '71-90' };
  } else {
    return { level: 4, name: 'Autonomous Grade', range: '91-105' };
  }
}
```

## リンク生成

```typescript
// arXiv参照からURLを生成
// "ReliabilityBench (arXiv:2601.06112)" → "https://arxiv.org/abs/2601.06112"
function parseArxivReference(reference: string): { text: string; url: string | null };

// ツール名からURLを取得（50+のツールに対応）
function getToolUrl(tool: string): string | null;
```

## コーディング規約

### TypeScript

- `strict: true` を使用
- `any` 型の使用禁止
- 型定義は `types/` ディレクトリに集約

### React

- 関数コンポーネント + Hooks のみ使用
- コンポーネントは単一責任の原則に従う
- Props には明示的な型定義を付与

### Tailwind

- インラインクラスを基本とする
- 再利用パターンは `@apply` でコンポーネント化
- カスタムカラーは `tailwind.config.js` で定義

## コマンド

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run typecheck  # TypeScript型チェック
npm run lint       # ESLintチェック
npm run preview    # ビルド結果のプレビュー
```

## 参考情報

### 根拠論文

- [ReliabilityBench (arXiv:2601.06112)](https://arxiv.org/abs/2601.06112)
- [CLEAR Framework (arXiv:2511.14136)](https://arxiv.org/abs/2511.14136)
- [Agent GPA (arXiv:2510.08847)](https://arxiv.org/abs/2510.08847)
- [Holistic Agent Leaderboard (arXiv:2510.11977)](https://arxiv.org/abs/2510.11977)
- [OpenAgentSafety (arXiv:2507.06134)](https://arxiv.org/abs/2507.06134)
- [SafePro (arXiv:2601.06663)](https://arxiv.org/abs/2601.06663)
- [AgentSight (arXiv:2508.02736)](https://arxiv.org/abs/2508.02736)
- [MemoryAgentBench (arXiv:2507.05257)](https://arxiv.org/abs/2507.05257)
- [RADAR (arXiv:2510.08931)](https://arxiv.org/abs/2510.08931)
- [SDQM (arXiv:2510.06596)](https://arxiv.org/abs/2510.06596)
- [CodeMem (arXiv:2512.15813)](https://arxiv.org/abs/2512.15813)

### Rubric詳細

| Rubric | 項目数 | 最大点 | 評価観点 |
|--------|--------|--------|----------|
| 1. Reliability & Robustness | 4 | 20 | 一貫性、ノイズ耐性、回復力、決定論性 |
| 2. Efficacy & Performance | 3 | 15 | 計画整合性、コスト効率、レイテンシ |
| 3. Safety & Governance | 3 | 15 | リスク防御、攻撃耐性、権限管理 |
| 4. Security Architecture | 3 | 15 | MCP、サンドボックス、DB防御 |
| 5. Observability & Operations | 4 | 20 | 技術的追跡、ユーザー透明性、HITL、継続評価 |
| 6. Memory & Knowledge | 4 | 20 | 長期記憶、忘却、汚染検出、合成データ |
| **合計** | **21** | **105** | |

### Readiness Level 判定基準

| Level | 名前 | スコア範囲 | アクション |
|-------|------|-----------|-----------|
| L1 | Experimental | 0-45 | 投入不可 - PoC段階 |
| L2 | Beta / Pilot | 46-70 | 条件付き可 - HITL必須 |
| L3 | Production Ready | 71-90 | 投入推奨 - スモールスタート |
| L4 | Autonomous Grade | 91-105 | 最高水準 - 自律運用可 |
