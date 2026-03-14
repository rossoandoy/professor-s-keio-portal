# SPEC — 技術仕様

技術仕様：コンテンツモデル、CMS、データ形式、GA4。参照: 2（アーキテクチャ）, 3（コンテンツモデル）, a（Publications 要件）。

---

## 1. Publications データモデル

### 1-1. 現行（コード内 TS）＋リッチ化後

| フィールド | 必須 | 型 | 説明 |
|------------|------|-----|------|
| year | ✓ | number | 発表年 |
| authors | ✓ | string | 著者名（APA 形式） |
| title | ✓ | string | 論文タイトル |
| journal | ✓ | string | 誌名（venue） |
| detail | ✓ | string | 巻号・ページ等 |
| doi | — | string | DOI（ID または `https://doi.org/xxxx`） |
| scholar_url | — | string | Google Scholar の当該論文 URL |
| contribution_summary | — | string | 1〜2行の貢献要約（a 5-2） |
| category | — | string | カテゴリ（Refereed / Books / Policy / Japanese 等） |
| lead_article | — | boolean | Lead article 等の強調表示 |

### 1-2. By topic 用拡張

- `topicIds`: トピック ID の配列（A〜G）。複数可。
- `subtopic`: サブトピック名（任意）。

---

## 2. リンク形式

### 2-1. DOI

- 表示用: `https://doi.org/{id}` にリンク。
- データ保持: `10.xxxx/xxxx` 形式の ID のみでも可。表示時に `https://doi.org/` を前置する。

### 2-2. Google Scholar

- 論文ごとの Scholar ページ URL を `scholar_url` に保持することを推奨。
- または、教授の Scholar プロファイル URL ＋ クエリで検索する形式（一意に決まらない場合は論文ごと URL を推奨）。

---

## 3. Decap CMS（フェーズ2）

### 3-1. Collections 概要

| Collection | 説明 | 主なフィールド |
|------------|------|----------------|
| pages | 固定ページ | title, slug, body |
| news | お知らせ | title, date, body, tags（任意） |
| publications | 業績 | year, authors, title, venue, detail, doi, scholar_url, category |

### 3-2. Publications の widget（想定）

- year（number）, authors, title, venue（journal）, detail
- doi, scholar_url（string, 任意）
- category（select または string）
- lead_article（boolean, 任意）
- By topic 用: topicIds（list または tags）, subtopic（string）

### 3-3. 認証

- GitHub OAuth。Homepage URL / Authorization callback URL はプレビュー環境または本番の /admin に合わせる（3-6-3）。

---

## 4. GA4 イベント名（フェーズ3）

| イベント名 | 説明 | 参照 |
|------------|------|------|
| scholar_click | Google Scholar リンククリック | a, 2-8-1 |
| doi_click | DOI リンククリック | a, 2-8-1 |
| contact_click | 連絡先クリック | a, 2-8-1 |
| publications_page_view | 業績ページ閲覧（滞在時間含む） | a |
| selected_publications_click | 代表作クリック | a |
| joinus_view | 募集ページ閲覧 | a |
| cv_download | CV ダウンロード | a |
| research_theme_scroll_depth | 研究テーマのスクロール深度 | a |
| researchmap_click | ResearchMap リンククリック | 2-8-1 |
| pdf_click | PDF クリック（許諾OKのみ） | 2-8-1, 3-8-1 |

注: 上記の実装優先度はフェーズ3で判断する。

---

## 5. ビルド・コンテンツ取得（フェーズ2 方針）

- **静的サイト**: Vite ビルドで HTML/CSS/JS を生成。
- **コンテンツ**: フェーズ2 では `content/` 配下の Markdown または JSON をビルド時に読み込み、静的データとしてバンドルする方針（ランタイム API は使わない）。
- 詳細はフェーズ2 着手時に TODO / 本 SPEC を更新する。

---

## 更新履歴

| 日付 | 変更内容 |
|------|----------|
| （初版） | Publications モデル、DOI/Scholar 形式、Decap 概要、GA4 イベント名を定義。 |
