# SPEC — 技術仕様

技術仕様：コンテンツモデル、CMS、データ形式、GA4。参照: 2（アーキテクチャ）, 3（手順）, a（Publications 要件）。

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
| slug | — | string | 詳細ページ URL 用（未設定時は title+year から自動生成） |
| abstract | — | string | 要約 |
| pdf_url | — | string | PDF への外部リンク |
| preprint_url | — | string | プレプリントへの外部リンク |
| citation_count | — | number | 引用数（手動入力。自動取得は別フェーズ） |
| citation_source | — | string | 引用元（例: Google Scholar, Scopus） |
| contribution_summary | — | string | 1〜2行の貢献要約（a 5-2）。フェーズ2a Tier 1 で表示実装 |
| category | — | string | カテゴリ（Refereed / Books / Policy / Japanese）。フェーズ2a Tier 2 で追加 |
| lead_article | — | boolean | Lead article 等の強調表示 |
| selected | — | boolean | トップページ「主要業績」に表示するか |
| top_journal | — | boolean | Top Journal アイコン表示（a 6-3）。フェーズ2a Tier 1 で追加 |

### 1-2. By topic 用拡張

- `topicIds`: トピック ID の配列（A〜G）。複数可。
- `subtopic`: サブトピック名（任意）。

### 1-3. 著者名太字ロジック（フェーズ2a）

- 著者文字列中の `Okubo` を `<strong>` で囲む。
- 正規表現: `/\bOkubo\b/g` にマッチする部分を太字化。
- 表示コンポーネント: PublicationsSection, ByTopicPage, PublicationDetailPage で共通ユーティリティを使用。

### 1-4. Top Journal 判定（フェーズ2a）

- `top_journal: true` の論文にアイコン（例: Star or Award）を表示。
- 判定基準: JIE, JEG, JRS, JEEM, JMCB, JEH 等の国際主要誌。データに手動フラグ。

---

## 2. 新規ページ データモデル（フェーズ2a）

### 2-1. Research Agenda（`src/data/researchAgenda.ts`）

```typescript
interface ResearchAgendaSection {
  id: string;           // "motivation" | "theory" | "empirical" | "policy"
  titleEn: string;
  titleJa: string;
  bodyEn: string;       // Markdown or plain text
  bodyJa: string;
}
```

### 2-2. News（`src/data/news.ts`）

```typescript
interface NewsItem {
  id: string;
  date: string;         // ISO 8601
  titleEn: string;
  titleJa: string;
  bodyEn: string;
  bodyJa: string;
  tags?: string[];
}
```

### 2-3. Grants（`src/data/grants.ts`）

```typescript
interface Grant {
  id: string;
  titleEn: string;
  titleJa: string;
  funder: string;       // "JSPS", "MEXT" etc.
  role: string;         // "PI", "Co-PI" etc.
  period: string;       // "2020-2024"
  amount?: string;
}
```

### 2-4. Teaching（`src/data/teaching.ts`）

```typescript
interface Course {
  id: string;
  nameEn: string;
  nameJa: string;
  level: string;        // "Undergraduate" | "Graduate"
  semester?: string;
  description?: string;
}
```

### 2-5. Policy & Advisory

既存の `src/data/cvContent.ts` の `governmentCommittees` データを活用。必要に応じて以下のフィールドを拡張:

```typescript
interface PolicyRole {
  organization: string;
  roleEn: string;
  roleJa: string;
  period: string;
  category: string;     // "Government" | "Academic" | "Research Institute"
}
```

---

## 3. リンク形式

### 3-1. DOI

- 表示用: `https://doi.org/{id}` にリンク。
- データ保持: `10.xxxx/xxxx` 形式の ID のみでも可。表示時に `https://doi.org/` を前置する。

### 3-2. Google Scholar

- 論文ごとの Scholar ページ URL を `scholar_url` に保持することを推奨。
- Fallback: `scholarSearchUrl()` (`src/utils/scholar.ts`) でタイトル+著者から検索 URL を生成。

---

## 4. Decap CMS（フェーズ2b）

### 4-1. Collections 概要

| Collection | 種別 | 説明 | 主なフィールド |
|------------|------|------|----------------|
| pages | file | 固定ページ（Research Agenda, Policy 等） | title, slug, body, sections |
| news | folder | お知らせ | title, date, body, tags |
| publications | folder | 業績 | year, authors, title, journal, detail, doi, scholar_url, category, topicIds, selected, top_journal |

### 4-2. config.yml 設計案

```yaml
backend:
  name: github
  repo: rossoandoy/professor-s-keio-portal
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: pages
    label: "Pages"
    files:
      - name: research-agenda
        label: "Research Agenda"
        file: "content/pages/research-agenda.md"
        fields:
          - { name: title, label: Title, widget: string }
          - name: sections
            label: Sections
            widget: list
            fields:
              - { name: id, label: ID, widget: string }
              - { name: titleEn, label: "Title (EN)", widget: string }
              - { name: titleJa, label: "Title (JA)", widget: string }
              - { name: bodyEn, label: "Body (EN)", widget: markdown }
              - { name: bodyJa, label: "Body (JA)", widget: markdown }
      - name: policy
        label: "Policy & Advisory"
        file: "content/pages/policy.md"
        fields:
          - { name: title, label: Title, widget: string }
          - { name: body, label: Body, widget: markdown }
      - name: grants
        label: "Grants & Projects"
        file: "content/pages/grants.md"
        fields:
          - { name: title, label: Title, widget: string }
          - name: items
            label: Grants
            widget: list
            fields:
              - { name: titleEn, label: "Title (EN)", widget: string }
              - { name: titleJa, label: "Title (JA)", widget: string }
              - { name: funder, label: Funder, widget: string }
              - { name: role, label: Role, widget: string }
              - { name: period, label: Period, widget: string }
      - name: teaching
        label: "Teaching"
        file: "content/pages/teaching.md"
        fields:
          - { name: title, label: Title, widget: string }
          - name: courses
            label: Courses
            widget: list
            fields:
              - { name: nameEn, label: "Name (EN)", widget: string }
              - { name: nameJa, label: "Name (JA)", widget: string }
              - { name: level, label: Level, widget: select, options: [Undergraduate, Graduate] }
              - { name: semester, label: Semester, widget: string, required: false }
      - name: join
        label: "Join the Lab"
        file: "content/pages/join.md"
        fields:
          - { name: title, label: Title, widget: string }
          - { name: bodyEn, label: "Body (EN)", widget: markdown }
          - { name: bodyJa, label: "Body (JA)", widget: markdown }

  - name: news
    label: "News"
    folder: "content/news"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: date, label: Date, widget: datetime }
      - { name: body, label: Body, widget: markdown }
      - { name: tags, label: Tags, widget: list, required: false }

  - name: publications
    label: "Publications"
    folder: "content/publications"
    create: true
    slug: "{{year}}-{{fields.slug}}"
    fields:
      - { name: year, label: Year, widget: number }
      - { name: authors, label: Authors, widget: string }
      - { name: title, label: Title, widget: string }
      - { name: journal, label: Journal, widget: string }
      - { name: detail, label: Detail, widget: string }
      - { name: slug, label: Slug, widget: string }
      - { name: doi, label: DOI, widget: string, required: false }
      - { name: scholar_url, label: "Scholar URL", widget: string, required: false }
      - { name: category, label: Category, widget: select, options: [Refereed, Books, Policy, Japanese] }
      - { name: topicIds, label: "Topic IDs", widget: list, required: false }
      - { name: selected, label: Selected, widget: boolean, default: false }
      - { name: top_journal, label: "Top Journal", widget: boolean, default: false }
      - { name: lead_article, label: "Lead Article", widget: boolean, default: false }
      - { name: abstract, label: Abstract, widget: text, required: false }
      - { name: contribution_summary, label: "Contribution Summary", widget: text, required: false }
      - { name: pdf_url, label: "PDF URL", widget: string, required: false }
      - { name: preprint_url, label: "Preprint URL", widget: string, required: false }
      - { name: citation_count, label: "Citation Count", widget: number, required: false }
```

### 4-3. 認証

- GitHub OAuth App。Homepage URL / Authorization callback URL は GitHub Pages の /admin に合わせる。
- OAuth プロキシ: Decap CMS は外部プロキシが必要。Cloudflare Workers または自前サーバーで構築。

---

## 5. GA4 イベント名（フェーズ3）

| イベント名 | 説明 | 参照 | Priority |
|------------|------|------|----------|
| scholar_click | Google Scholar リンククリック | a, 2-8-1 | 1 |
| doi_click | DOI リンククリック | a, 2-8-1 | 1 |
| contact_click | 連絡先クリック | a, 2-8-1 | 1 |
| publications_page_view | 業績ページ閲覧（滞在時間含む） | a | 2 |
| selected_publications_click | 代表作クリック | a | 2 |
| pdf_click | PDF クリック（許諾OKのみ） | 2-8-1, 3-8-1 | 2 |
| joinus_page_view | 募集ページ閲覧 | a | 3 |
| research_theme_scroll_depth | 研究テーマのスクロール深度 | a | 3 |
| researchmap_click | ResearchMap リンククリック | 2-8-1 | 3 |
| cv_download | CV ダウンロード | a | 3（CV 廃止により優先度低下） |

---

## 6. ビルド・コンテンツ取得（フェーズ2b 方針）

- **静的サイト**: Vite ビルドで HTML/CSS/JS を生成。
- **コンテンツ**: フェーズ2b では `content/` 配下の Markdown/JSON をビルド時に読み込み、静的データとしてバンドルする方針（ランタイム API は使わない）。
- **読込方式**: `import.meta.glob('../../content/**/*.md', { eager: true })` で Markdown ファイルを取得し、frontmatter をパースして TS 型に変換する loader を作成。
- 詳細はフェーズ2b 着手時に確定する。

---

## 7. 慶應サーバー SPA 対応（フェーズ2c）

- **課題**: React Router の `/by-topic`, `/publications/:slug` 等に直接アクセスすると 404。
- **GitHub Pages 対応**: `404.html` に `index.html` をコピー（`deploy-pages.yml` L41）。
- **慶應サーバー対応案**:
  1. `.htaccess`（Apache の場合）: `FallbackResource /staff/ユーザー名/index.html`
  2. ビルド後スクリプト: 各ルートのディレクトリに `index.html` をコピー
- 慶應サーバーの httpd 種別確認が必要。

---

## 更新履歴

| 日付 | 変更内容 |
|------|----------|
| （初版） | Publications モデル、DOI/Scholar 形式、Decap 概要、GA4 イベント名を定義。 |
| 2026-03-26 | 全面改訂。新ページデータモデル (Research Agenda, News, Grants, Teaching, Policy) 追加。著者名太字/Top Journal ロジック追加。CMS config.yml 具体化。GA4 に Priority 追加。慶應 SPA 対応追加。content/ 読込方式具体化。 |
