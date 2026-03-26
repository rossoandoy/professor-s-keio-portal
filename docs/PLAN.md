# PLAN — 実装ロードマップ

実装の段階・マイルストーン・優先順位。参照: 1（成果物リスト）, 3（手順）, a（KGI/KPI）。

---

## 現在のフェーズ

**フェーズ1 完了。次はフェーズ2a（コンテンツページ拡充）に着手。**

---

## フェーズ1: 内容リッチ化 [完了]

- 論文に **DOI / Google Scholar リンク** を追加（完了）
- **論文詳細ページ** `/publications/:slug`（要約・引用・DOI/Scholar/PDF/Preprint・引用数表示）（完了）
- **PDF / プレプリント** リンクをデータと一覧・詳細に表示（完了）
- **引用数** は手動フィールドで詳細ページに表示（自動取得は別フェーズ）
- **研究テーマ別特集** `/research/:topicSlug`（A〜G のテーマ別論文一覧）（完了）
- ナビを **Research / Publications(Selected, By topic) / Career / Contact** に統一（完了）
- データは単一ソース `publicationsByTopic`（slug, selected, abstract, pdf_url, preprint_url, citation_count 等）
- **サイトマップページ** `/sitemap` 追加（完了）

**変更事項**: CV ページ `/cv` はフェーズ1で実装後に廃止。経歴・学歴・委員等はトップの **Career セクション** (`/#career`) に集約。ナビから CV を削除し Career に変更。

**繰越し**: contribution_summary の表示、著者名太字、Top Journal アイコン → フェーズ2a Tier 1 へ。

**完了条件**: Selected / By topic から詳細ページへ遷移できる。✅ 達成済み

---

## フェーズ2a: コンテンツページ拡充 [次に着手]

CMS 導入前にコードで実装し、データモデルと UI を確定させる。

### Tier 1（最優先 - ブランディング核心）

| タスク | 根拠 | 完了条件 |
|--------|------|----------|
| Research Agenda ページ `/research-agenda` | a 5-1 | Motivation / Theory / Empirical / Policy の4セクション表示 |
| Hero に Research Statement 追加 | a 4-2 | Hero に2-3行の研究の核心的問いが表示される |
| Selected に contribution_summary 表示 | a 5-2, SPEC 1-1 | 各代表作に1-2行の貢献要約が表示される |
| 著者名太字 + Top Journal アイコン | a 6-3 | 論文一覧・詳細で Okubo が太字、Top Journal にアイコン表示 |

### Tier 2（高優先 - ペルソナ B,C 対応）

| タスク | 根拠 | 完了条件 |
|--------|------|----------|
| Policy & Advisory Roles `/policy` | a 5-3 | Cabinet Office, Ministry committees, RIETI 等の一覧表示 |
| Publications カテゴリ分類 | a 6-2 | Journal / Books / Policy / Japanese の4分類表示 |

### Tier 3（中優先 - サイト充実）

| タスク | 根拠 | 完了条件 |
|--------|------|----------|
| Grants & Projects `/grants` | a 4-1 | 科研費等の研究プロジェクト一覧 |
| Teaching `/teaching` | a 4-1 | 担当科目・ゼミ情報 |
| Join the Lab `/join` | a 4-1 | 研究室情報・応募方法 |
| News `/news` | a 4-1 | お知らせ一覧（最新5件をトップにも表示） |

### ナビ改訂

```
Research (dropdown): Research Themes | Research Agenda
Publications (dropdown): Selected | By Topic
About (dropdown): Career | Policy & Advisory | Grants | Teaching
Join the Lab
News
Contact
```

**完了条件**: Tier 1 全完了 + Tier 2-3 から少なくとも Policy & News 完了。

---

## フェーズ2b: Decap CMS 統合

コンテンツページ確定後に CMS 化。ページ→CMS の一方向移行で手戻りを防ぐ。

1. `content/` ディレクトリ設計（pages/, news/, publications/）
2. 移行スクリプト作成（publicationsByTopic.ts, cvContent.ts → content/ Markdown/JSON）
3. Vite ビルドで content/ 読込（vite-plugin-glob or 自作 loader）
4. `admin/index.html` + `admin/config.yml` 追加
5. GitHub OAuth App 作成 + OAuth プロキシ（Cloudflare Workers 等）
6. 教授テスト：/admin ログイン → News 追加 → PR 作成

**CMS Collections**: pages (file-based), news (folder), publications (folder)

**完了条件**: 教授が /admin から News/Pages/Publications を更新し、PR が作成される。既存 TS データが全て content/ に移行済み。

---

## フェーズ2c: CI 品質ゲート・プレビュー・慶應デプロイ対応

1. `pr-check.yml`（ビルド + リンクチェック + 全角ファイル名検出）
2. `build-release.yml`（main マージ → 成果物 ZIP → Artifacts）
3. 慶應サーバー向け SPA fallback（`.htaccess` or ルート別 index.html コピースクリプト）
4. PR プレビュー環境（GitHub Pages preview or Cloudflare Pages）
5. Lighthouse CI（Performance >= 85 警告）
6. 画像サイズ上限チェック

**背景**: 慶應サーバーは SFTP で `public_html` に静的ファイル配置。サーバー側ルーティングなし。React Router の SPA ルーティングは直接 URL アクセスで 404 になるため、`.htaccess` fallback またはルート別 `index.html` コピーが必要。

**完了条件**: PR で自動品質チェック + プレビュー URL。main マージで ZIP 生成。慶應サーバーでも全ルートがアクセス可能。

---

## フェーズ3: 観測・品質・アクセシビリティ

1. **GA4 導入**
   - プロパティ作成・測定 ID 取得
   - サイトに GA4 タグ組込
   - KPI イベント実装
     - Priority 1: doi_click, scholar_click, contact_click
     - Priority 2: publications_page_view, selected_publications_click, pdf_click
     - Priority 3: joinus_page_view, research_theme_scroll_depth, researchmap_click
2. **Sentry 導入**（DSN → React ErrorBoundary 統合）
3. **WCAG 2.1 AA 対応**（aria-label, キーボード操作, 色コントラスト, フォーカス管理）
4. **Lighthouse Performance 85+**（WebP, バンドルサイズ削減, フォント最適化）

**完了条件**: GA4 で KPI 計測、Sentry エラー監視、Lighthouse 85+、WCAG AA 準拠。

---

## フェーズ4: 高度化・AI 支援 [将来]

- PR 要約 AI、表記ゆれ検出、週次サマリ（1 H-31〜33）
- 引用数自動取得（Semantic Scholar API）
- 慶應サーバー自動デプロイ（SSH/rsync）
- 改善バックログ自動化（KPI 変動 → Issue 作成）

---

## 依存関係

```
フェーズ1（リッチ化）[完了]
  ↓
フェーズ2a（コンテンツページ）
  ↓
フェーズ2b（Decap CMS）──→ フェーズ2c（CI・品質ゲート・慶應デプロイ）
                                ↓
                           フェーズ3（観測・品質・WCAG）
                                ↓
                           フェーズ4（AI支援）[将来]
```

- 2a でデータモデル確定 → 2b で CMS Collections 設計
- 2b で content/ 移行完了 → 2c で CI 品質チェック対象が確定
- 2c で慶應デプロイ対応 → 3 で GA4 タグが本番でも動作確認可能
- 2a/2b は並行不可（データモデル依存）。2c は 2b と一部並行可。

---

## 技術スタック

- React 18 + Vite 5 + TypeScript 5 + Tailwind 3 + shadcn/ui (Radix)
- Framer Motion, React Router DOM 6, Lucide React
- i18n: 自作 LanguageContext (EN/JA)
- テスト: Vitest + Testing Library
- CI: GitHub Actions (deploy-pages.yml)
- CMS: Decap CMS（フェーズ2b で導入）
- デプロイ: GitHub Pages（開発）+ 慶應 public_html（本番、SFTP）

---

## 更新履歴

| 日付 | 変更内容 |
|------|----------|
| （初版） | フェーズ1〜3を定義。フェーズ1を次に実施と明示。 |
| 2026-03-26 | 全面改訂。フェーズ1完了（CV廃止→Career集約を反映）。フェーズ2を2a/2b/2cに分割。フェーズ3具体化。フェーズ4追加。慶應デプロイ要件・SPA fallback を2cに追加。技術スタック明記。 |
