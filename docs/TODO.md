# TODO — 実行タスク一覧

状態: 未着手 / 進行中 / 完了。実装中に随時更新する。

---

## フェーズ1: 内容リッチ化 [完了]

- [x] 論文データ（Selected / By topic）に `doi` フィールドを追加する
- [x] 論文データに `scholar_url` フィールドを追加する
- [x] PublicationsSection で DOI リンクを表示する（ありの場合のみ）
- [x] PublicationsSection で Google Scholar リンクを表示する（ありの場合のみ）
- [x] By topic ページの論文カードに DOI / Scholar リンクを表示する
- [x] 論文詳細ページ `/publications/:slug`（要約・引用・DOI/Scholar/PDF/Preprint・引用数）
- [x] 論文一覧に PDF / プレプリントリンクを表示する
- [x] 引用数（手動フィールド）を詳細ページに表示する
- [x] 研究テーマ別特集ページ `/research/:topicSlug`（A〜G）
- [x] ナビを Research / Publications / Career / Contact に統一
- [x] データを単一ソース（publicationsByTopic）に統一し slug / selected を付与
- [x] サイトマップページ `/sitemap` 追加
- [x] CV ページ `/cv` → **廃止**。Career セクション (/#career) に集約

---

## フェーズ2a: コンテンツページ拡充

### Tier 1（最優先）

- [ ] Research Agenda ページ `/research-agenda` を新規作成
  - Intellectual Motivation / Theoretical Contributions / Empirical Strategy / Policy Implications の4セクション
  - データファイル: `src/data/researchAgenda.ts`（新規）
- [ ] Hero セクションに Research Statement（研究の核心的問い 2-3行）を追加
  - 変更: `src/components/HeroSection.tsx`
- [ ] Selected Publications に contribution_summary を表示する
  - データ: `publicationsByTopic.ts` の各 selected 論文に `contribution_summary` を追加
  - 変更: `src/components/PublicationsSection.tsx`
- [ ] 論文一覧・詳細で著者名「Okubo」を太字にする
  - 変更: PublicationsSection, ByTopicPage, PublicationDetailPage
- [ ] Top Journal 論文にアイコン表示する
  - データ: `publicationsByTopic.ts` に `top_journal` フラグ追加
  - 変更: 論文表示コンポーネント全体

### Tier 2（高優先）

- [ ] Policy & Advisory Roles ページ `/policy` を新規作成
  - Cabinet Office, Ministry committees, RIETI, ESRI 等
  - データ: `src/data/cvContent.ts` の governmentCommittees 活用 + 拡張
- [ ] Publications にカテゴリ分類を追加する
  - データ: `publicationsByTopic.ts` の各論文に `category` フィールド追加
  - カテゴリ: Refereed Journal / Books & Chapters / Policy Papers / Japanese
  - 変更: ByTopicPage にカテゴリフィルタ追加、または新規カテゴリビュー

### Tier 3（中優先）

- [ ] Grants & Projects ページ `/grants` を新規作成
  - データファイル: `src/data/grants.ts`（新規）
- [ ] Teaching ページ `/teaching` を新規作成
  - データファイル: `src/data/teaching.ts`（新規）
- [ ] Join the Lab ページ `/join` を新規作成
- [ ] News ページ `/news` を新規作成
  - データファイル: `src/data/news.ts`（新規）
  - トップページに最新5件を表示するセクション追加

### ナビ・共通

- [ ] ナビを改訂: Research / Publications / About / Join / News / Contact
  - Research dropdown: Research Themes | Research Agenda
  - Publications dropdown: Selected | By Topic
  - About dropdown: Career | Policy & Advisory | Grants | Teaching
  - 変更: `src/components/Navigation.tsx`
- [ ] 新ページを `App.tsx` にルート追加
- [ ] サイトマップページ `/sitemap` を新ルートに合わせて更新
- [ ] フッターに新ページへのリンク追加

---

## フェーズ2b: Decap CMS 統合

- [ ] `content/` ディレクトリ設計（pages/, news/, publications/）
- [ ] 移行スクリプト作成: `scripts/migrate-publications.ts`
  - publicationsByTopic.ts → content/publications/*.md
- [ ] 移行スクリプト作成: `scripts/migrate-pages.ts`
  - cvContent.ts, researchAgenda.ts 等 → content/pages/*.md
- [ ] Vite ビルドで content/ を読み込む仕組み構築
  - vite-plugin-glob or 自作 loader
  - content/ → TS 配列への変換レイヤー
- [ ] `public/admin/index.html` を追加（Decap CMS CDN 版読込）
- [ ] `public/admin/config.yml` を作成
  - Collections: pages (file-based), news (folder), publications (folder)
- [ ] GitHub OAuth App 作成
  - Homepage URL: GitHub Pages URL
  - Callback URL: /admin/callback
- [ ] OAuth プロキシ構築（Cloudflare Workers 等）
- [ ] 教授テスト: /admin ログイン → News 1件追加 → PR 作成確認
- [ ] 教授テスト: 既存論文を CMS 上で編集 → PR 反映確認

---

## フェーズ2c: CI 品質ゲート・プレビュー・慶應デプロイ対応

- [ ] `pr-check.yml` 作成（ビルド成功チェック）
- [ ] リンクチェック追加: `scripts/check-links.js`
- [ ] 全角ファイル名検出追加: `scripts/check-filenames.js`
- [ ] `build-release.yml` 作成（main マージ → 成果物 ZIP → Artifacts）
- [ ] 慶應サーバー向け SPA fallback
  - `.htaccess` (Apache の場合) or `scripts/generate-fallback.js`（ルート別 index.html コピー）
  - 慶應サーバーの httpd 種別を確認
- [ ] PR プレビュー環境構築
- [ ] Lighthouse CI 追加（Performance >= 85 警告）
- [ ] 画像サイズ上限チェック追加

---

## フェーズ3: 観測・品質・アクセシビリティ

### GA4

- [ ] GA4 プロパティを作成し、測定 ID を取得する
- [ ] サイトに GA4 タグを組み込む（React に gtag.js）
- [ ] KPI イベント Priority 1: doi_click, scholar_click, contact_click
- [ ] KPI イベント Priority 2: publications_page_view, selected_publications_click, pdf_click
- [ ] KPI イベント Priority 3: joinus_page_view, research_theme_scroll_depth, researchmap_click
- [ ] GA4 ダッシュボード作成（PV/UU, CTA イベント数, ページ別遷移）

### Sentry

- [ ] Sentry プロジェクト作成・DSN 取得
- [ ] React ErrorBoundary に Sentry 統合

### アクセシビリティ・パフォーマンス

- [ ] WCAG 2.1 AA 対応（aria-label, キーボード操作, 色コントラスト, フォーカス管理）
- [ ] axe-core でエラー 0 を確認
- [ ] Lighthouse Performance 85+（WebP, バンドルサイズ削減, フォント最適化）

---

## フェーズ4: 高度化・AI 支援 [将来]

- [ ] PR 要約 AI（GitHub Actions）
- [ ] 表記ゆれ検出（CI）
- [ ] 週次サマリ自動生成
- [ ] AI ガードレール（自動改変禁止、PII 検知）
- [ ] 改善バックログ自動化（KPI 変動 → Issue 作成）
- [ ] 引用数自動取得（Semantic Scholar API）
- [ ] 慶應サーバー自動デプロイ（SSH/rsync）

---

## 更新ルール

- 着手したタスクは「進行中」としてコメントまたは別行でメモする。
- 完了したタスクは `- [x]` に変更する。
- フェーズ切り替え時に PLAN のマイルストーンを更新し、必要なら SPEC を追記する。
